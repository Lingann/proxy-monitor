import * as si from 'systeminformation';
import { execa } from 'execa';
import type { ProcessInfo, ConnectionInfo, RemoteIPGroup, NetworkAnalysisData } from '../../shared/common-types.js';

// State
let processFilters: string[] = [];
let monitoringInterval: NodeJS.Timeout | null = null;
const INTERVAL_MS = 1000;

// Types
type WorkerMessage = 
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'SET_FILTERS', filters: string[] };

// IPC Handler
process.on('message', async (message: WorkerMessage) => {
  switch (message.type) {
    case 'START':
      startMonitoring();
      break;
    case 'STOP':
      stopMonitoring();
      break;
    case 'SET_FILTERS':
      processFilters = message.filters;
      break;
  }
});

function startMonitoring() {
  if (monitoringInterval) return;
  
  // Run immediately then interval
  analyzeAndSend();
  monitoringInterval = setInterval(analyzeAndSend, INTERVAL_MS);
}

function stopMonitoring() {
  if (monitoringInterval) {
    clearInterval(monitoringInterval);
    monitoringInterval = null;
  }
}

async function analyzeAndSend() {
  try {
    const data = await analyze();
    if (process.send) {
      process.send({ type: 'TRAFFIC_UPDATE', data });
    }
  } catch (error) {
    console.error('Worker analysis failed:', error);
  }
}

// --- Logic extracted from NetworkMonitor ---

async function analyze(): Promise<NetworkAnalysisData> {
  const [connectionsData, allProcesses, networkStats, trafficStats] = await Promise.all([
    si.networkConnections(),
    si.processes(),
    si.networkStats(),
    getWindowsTrafficStats()
  ]);
  
  const activePids = new Set(connectionsData.map(c => c.pid));
  
  const targetProcesses = allProcesses.list.filter(p => {
    if (activePids.has(p.pid)) return true;
    if (processFilters.length > 0) {
      return processFilters.some(f => p.name.toLowerCase().includes(f.toLowerCase()));
    }
    return false;
  });

  const processes: ProcessInfo[] = targetProcesses.map(p => {
    const isSystem = isSystemProcess(p);
    return {
      pid: p.pid,
      name: p.name,
      category: isSystem ? 'System' : 'Third-party',
      cpu: p.cpu,
      memory: 0, // Will be set later
      downloadSpeed: 0,
      uploadSpeed: 0,
      totalConnections: 0,
      establishedConnections: 0
    };
  });

  const connections: ConnectionInfo[] = [];

  for (const conn of connectionsData) {
    const proc = processes.find(p => p.pid === conn.pid);
    if (!proc) continue;

    proc.totalConnections++;
    if (conn.state === 'ESTABLISHED') {
      proc.establishedConnections++;
    }

    connections.push({
      processId: conn.pid,
      processName: proc.name,
      localAddress: conn.localAddress,
      localPort: conn.localPort ? parseInt(conn.localPort, 10) : 0,
      remoteAddress: conn.peerAddress || '',
      remotePort: conn.peerPort ? parseInt(conn.peerPort, 10) : 0,
      state: conn.state
    });
  }

  processes.forEach(p => {
      const raw = allProcesses.list.find(raw => raw.pid === p.pid);
      if (raw) {
           p.memory = Math.round((raw.memRss / 1024 / 1024) * 100) / 100;
      }

      if (p.totalConnections > 0 && trafficStats.length > 0) {
           const traffic = trafficStats.find((t: any) => t.IDProcess === p.pid);
           if (traffic) {
               p.downloadSpeed = traffic.IOReadBytesPerSec || 0;
               p.uploadSpeed = traffic.IOWriteBytesPerSec || 0;
           }
      }
  });

  const remoteIPGroups = groupConnectionsByIP(connections);

  let totalDownload = 0;
  let totalUpload = 0;
  const interfaceStats = networkStats.map(iface => {
       totalDownload += iface.rx_sec;
       totalUpload += iface.tx_sec;
      return {
          iface: iface.iface,
          rx_sec: iface.rx_sec,
          tx_sec: iface.tx_sec
      };
  });

  return {
    analysisTime: new Date().toISOString(),
    processes: processes.filter(p => p.totalConnections > 0),
    connections,
    remoteIPGroups,
    globalStats: {
      uploadSpeed: totalUpload,
      downloadSpeed: totalDownload,
      interfaces: interfaceStats
    }
  };
}

function isSystemProcess(p: any): boolean {
  const systemUsers = ['SYSTEM', 'LOCAL SERVICE', 'NETWORK SERVICE', 'root', 'daemon'];
  if (systemUsers.includes(p.user)) return true;
  
  if (p.path) {
      const path = p.path.toLowerCase();
      if (path.includes('windows\\system32') || path.includes('/bin/') || path.includes('/sbin/')) {
          return true;
      }
  }
  
  const systemNames = ['svchost', 'system', 'registry', 'smss', 'csrss', 'wininit', 'services', 'lsass', 'winlogon'];
  if (systemNames.some(n => p.name.toLowerCase().includes(n))) return true;

  return false;
}

function groupConnectionsByIP(connections: ConnectionInfo[]): RemoteIPGroup[] {
  const groups = new Map<string, { count: number; ports: Set<number> }>();

  for (const conn of connections) {
    if (!conn.remoteAddress) continue;
    if (!groups.has(conn.remoteAddress)) {
      groups.set(conn.remoteAddress, { count: 0, ports: new Set() });
    }
    const group = groups.get(conn.remoteAddress)!;
    group.count++;
    if (conn.remotePort) group.ports.add(conn.remotePort);
  }

  return Array.from(groups.entries())
    .map(([ip, data]) => ({
      ip,
      count: data.count,
      ports: Array.from(data.ports).sort((a, b) => a - b),
    }))
    .sort((a, b) => b.count - a.count);
}

async function getWindowsTrafficStats(): Promise<any[]> {
  if (process.platform !== 'win32') {
      return [];
  }
  
  try {
      const scriptContent = `
$ErrorActionPreference = "SilentlyContinue"
$data = @(Get-CimInstance Win32_PerfFormattedData_PerfProc_Process | 
  Select-Object IDProcess, Name, IOReadBytesPerSec, IOWriteBytesPerSec | 
  Where-Object { $_.IOReadBytesPerSec -gt 0 -or $_.IOWriteBytesPerSec -gt 0 })

if ($data.Count -gt 0) {
  $data | ConvertTo-Json -Compress
} else {
  Write-Output "[]"
}
`;
      const scriptBuffer = Buffer.from(scriptContent, 'utf16le');
      const encodedCommand = scriptBuffer.toString('base64');

      const { stdout } = await execa('powershell', [
          '-NoProfile', 
          '-NonInteractive',
          '-ExecutionPolicy', 'Bypass', 
          '-EncodedCommand', encodedCommand
      ]);
      
      if (!stdout || stdout.trim() === '') {
          return [];
      }
      
      return JSON.parse(stdout);
  } catch (err) {
      // console.error('Failed to get Windows traffic stats:', err);
      // Suppress error in worker to avoid spamming main console
      return [];
  }
}
