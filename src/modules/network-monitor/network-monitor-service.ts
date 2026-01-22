import * as si from 'systeminformation';
import { execa } from 'execa';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ProcessInfo, ConnectionInfo, RemoteIPGroup, NetworkAnalysisData } from '../../shared/common-types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NetworkMonitor {
  private processFilters: string[];

  constructor(filters: string[] = []) {
    // Default to empty to show all processes as requested
    this.processFilters = filters;
  }

  setFilters(filters: string[]): void {
    this.processFilters = filters;
  }

  async analyze(): Promise<NetworkAnalysisData> {
    // Get connections first to know which processes are using network
    const [connectionsData, allProcesses, networkStats, trafficStats] = await Promise.all([
      si.networkConnections(),
      si.processes(),
      si.networkStats(),
      this.getWindowsTrafficStats()
    ]);
    
    // Filter connections to only established (or others if needed, user said "using network")
    // Usually ESTABLISHED, LISTEN, TIME_WAIT etc. User probably cares about active usage.
    // Let's keep all for now or filter ESTABLISHED if list is too huge.
    // Previous code filtered ESTABLISHED. Let's keep it broad but maybe mark state.
    
    const activePids = new Set(connectionsData.map(c => c.pid));
    
    // Filter processes that are in the connection list OR match our filters (if any)
    const targetProcesses = allProcesses.list.filter(p => {
      if (activePids.has(p.pid)) return true;
      if (this.processFilters.length > 0) {
        return this.processFilters.some(f => p.name.toLowerCase().includes(f.toLowerCase()));
      }
      return false;
    });

    const processes: ProcessInfo[] = targetProcesses.map(p => {
      const isSystem = this.isSystemProcess(p);
      return {
        pid: p.pid,
        name: p.name,
        category: isSystem ? 'System' : 'Third-party',
        cpu: p.cpu,
        memory: p.mem, // si returns mem in % usually? No, si.processes() returns mem usage. 
        // Wait, si.processes() returns: mem (percentage), memRss, memVsz.
        // Let's use memRss (Resident Set Size) in MB.
        // p.mem is cpu %? No p.mem is memory % usage.
        // p.memRss is bytes.
        // Previous code used string parsing "10,000 K".
        // Let's convert p.memRss to MB.
        downloadSpeed: 0, // Not supported per-process on Windows
        uploadSpeed: 0,   // Not supported per-process on Windows
        totalConnections: 0,
        establishedConnections: 0
      };
    });

    const connections: ConnectionInfo[] = [];

    for (const conn of connectionsData) {
      const proc = processes.find(p => p.pid === conn.pid);
      if (!proc) continue;

      // Update process stats
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

    // Convert memory to MB and format
    processes.forEach(p => {
        // Re-find the process in raw list to get accurate memory if needed
        const raw = allProcesses.list.find(raw => raw.pid === p.pid);
        if (raw) {
             // raw.memRss is in bytes (usually, need to verify docs or type)
             // si docs: memRss: number (bytes)
             p.memory = Math.round((raw.memRss / 1024 / 1024) * 100) / 100;
        }

        // Apply traffic stats (approximate from IO) if process has connections
        if (p.totalConnections > 0 && trafficStats.length > 0) {
             const traffic = trafficStats.find((t: any) => t.IDProcess === p.pid);
             if (traffic) {
                 p.downloadSpeed = traffic.IOReadBytesPerSec || 0;
                 p.uploadSpeed = traffic.IOWriteBytesPerSec || 0;
             }
        }
    });

    const remoteIPGroups = this.groupConnectionsByIP(connections);

    // Calculate global stats
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
      processes: processes.filter(p => p.totalConnections > 0), // Only show processes with connections? User said "using network"
      connections,
      remoteIPGroups,
      globalStats: {
        uploadSpeed: totalUpload,
        downloadSpeed: totalDownload,
        interfaces: interfaceStats
      }
    };
  }

  private isSystemProcess(p: any): boolean {
    // Simple heuristic
    const systemUsers = ['SYSTEM', 'LOCAL SERVICE', 'NETWORK SERVICE', 'root', 'daemon'];
    if (systemUsers.includes(p.user)) return true;
    
    // Check path if available
    if (p.path) {
        const path = p.path.toLowerCase();
        if (path.includes('windows\\system32') || path.includes('/bin/') || path.includes('/sbin/')) {
            return true;
        }
    }
    
    // Common system process names
    const systemNames = ['svchost', 'system', 'registry', 'smss', 'csrss', 'wininit', 'services', 'lsass', 'winlogon'];
    if (systemNames.some(n => p.name.toLowerCase().includes(n))) return true;

    return false;
  }

  private groupConnectionsByIP(connections: ConnectionInfo[]): RemoteIPGroup[] {
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

  private async getWindowsTrafficStats(): Promise<any[]> {
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
        // Convert script to UTF-16LE buffer for PowerShell EncodedCommand
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
        console.error('Failed to get Windows traffic stats:', err);
        return [];
    }
  }
}
