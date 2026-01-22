import type { NetworkAnalysisData } from '../shared/types';

let currentData: NetworkAnalysisData | null = null;

const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
const refreshBtn = document.getElementById('refreshBtn') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

const processCountEl = document.getElementById('processCount') as HTMLDivElement;
const connectionCountEl = document.getElementById('connectionCount') as HTMLDivElement;
const serverCountEl = document.getElementById('serverCount') as HTMLDivElement;
const memoryUsageEl = document.getElementById('memoryUsage') as HTMLDivElement;

const processTableBody = document.querySelector('#processTable tbody') as HTMLTableSectionElement;
const serverTableBody = document.querySelector('#serverTable tbody') as HTMLTableSectionElement;
const connectionListEl = document.getElementById('connectionList') as HTMLDivElement;
const analysisContentEl = document.getElementById('analysisContent') as HTMLDivElement;

function showStatus(message: string, type: 'info' | 'success' | 'error'): void {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

function hideStatus(): void {
  statusEl.className = 'status';
  statusEl.textContent = '';
}

function updateStats(data: NetworkAnalysisData): void {
  const totalMemory = data.processes.reduce((sum, p) => sum + p.memory, 0);

  processCountEl.textContent = data.processes.length.toString();
  connectionCountEl.textContent = data.connections.length.toString();
  serverCountEl.textContent = data.remoteIPGroups.length.toString();
  memoryUsageEl.textContent = `${totalMemory.toFixed(2)} MB`;
}

function updateProcessTable(data: NetworkAnalysisData): void {
  if (data.processes.length === 0) {
    processTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No processes found</td></tr>';
    return;
  }

  processTableBody.innerHTML = data.processes
    .map(
      (proc) => `
        <tr>
            <td>${proc.pid}</td>
            <td>${proc.name}</td>
            <td>${proc.memory.toFixed(2)} MB</td>
            <td>${proc.establishedConnections}</td>
        </tr>
    `
    )
    .join('');
}

function getPurpose(ports: number[]): string {
  if (ports.includes(443)) return 'HTTPS encrypted connection';
  if (ports.some((p) => p >= 2400 && p <= 2500)) return 'Custom protocol connection';
  if (ports.includes(80)) return 'HTTP connection';
  if (ports.includes(21)) return 'FTP connection';
  if (ports.includes(22)) return 'SSH connection';
  return 'Unknown purpose';
}

function updateServerTable(data: NetworkAnalysisData): void {
  if (data.remoteIPGroups.length === 0) {
    serverTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No connections found</td></tr>';
    return;
  }

  serverTableBody.innerHTML = data.remoteIPGroups
    .map(
      (group) => `
        <tr>
            <td>${group.ip}</td>
            <td>${group.ports.join(', ')}</td>
            <td>${group.count}</td>
            <td>${getPurpose(group.ports)}</td>
        </tr>
    `
    )
    .join('');
}

function updateConnectionList(data: NetworkAnalysisData): void {
  if (data.connections.length === 0) {
    connectionListEl.innerHTML = '<div class="no-data">No connections found</div>';
    return;
  }

  connectionListEl.innerHTML = data.connections
    .map(
      (conn) => `
        <div class="connection-item">
            <div class="connection-ip">${conn.remoteAddress}:${conn.remotePort}</div>
            <div class="connection-details">
                Process: ${conn.processName} (PID: ${conn.processId})<br>
                Local: ${conn.localAddress}:${conn.localPort}<br>
                State: ${conn.state}
            </div>
        </div>
    `
    )
    .join('');
}

function updateAnalysisContent(data: NetworkAnalysisData): void {
  const totalMemory = data.processes.reduce((sum, p) => sum + p.memory, 0);
  const hasCustomPorts = data.connections.some((conn) => conn.remotePort >= 2400 && conn.remotePort <= 2500);
  const hasMultipleConnections = data.remoteIPGroups.some((group) => group.count > 1);

  analysisContentEl.innerHTML = `
    <div class="analysis-warning">
        <h3>Reasons for Traffic Consumption</h3>
        <ul>
            <li><strong>Multiple concurrent connections:</strong> The system detected ${data.connections.length} active connections, including multiple parallel connections to the same server.</li>
            <li><strong>Continuous data transfer:</strong> There are many connections on custom ports, which may be used for real-time data stream transfer.</li>
            <li><strong>High memory usage:</strong> Total memory usage is ${totalMemory.toFixed(2)} MB, indicating extensive data caching and processing operations.</li>
        </ul>
    </div>

    <div class="analysis-details">
        <h3>Technical Analysis</h3>
        <ul>
            <li><strong>Port 443:</strong> Standard HTTPS port for encrypted communication</li>
            <li><strong>Custom Ports (2400-2500):</strong> Custom ports for streaming or data transfer channels</li>
            <li><strong>Connection pattern:</strong> Multiple connections using load balancing or data sharding</li>
            <li><strong>Remote servers:</strong> ${data.remoteIPGroups.length} unique remote servers connected</li>
        </ul>
    </div>

    <div class="analysis-summary">
        <h3>Summary</h3>
        <p>
            The application is actively communicating with ${data.remoteIPGroups.length} remote servers
            through ${data.connections.length} network connections.
            ${hasMultipleConnections ? 'Multiple connections to the same server suggest load balancing or parallel data transfer.' : ''}
            ${hasCustomPorts ? 'Custom port usage indicates application-specific protocols for data streaming.' : ''}
            Total memory usage of ${totalMemory.toFixed(2)} MB reflects active data processing and caching.
        </p>
    </div>
  `;
}

async function analyzeConnections(): Promise<void> {
  try {
    showStatus('Analyzing network connections...', 'info');
    analyzeBtn.disabled = true;
    refreshBtn.disabled = true;

    const data = await window.electronAPI.analyzeConnections();
    currentData = data;

    updateStats(data);
    updateProcessTable(data);
    updateServerTable(data);
    updateConnectionList(data);
    updateAnalysisContent(data);

    showStatus(`Analysis complete! Found ${data.connections.length} active connections.`, 'success');
    refreshBtn.disabled = false;

    setTimeout(() => {
      hideStatus();
    }, 3000);
  } catch (error) {
    console.error('Analysis error:', error);
    showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
  } finally {
    analyzeBtn.disabled = false;
  }
}

async function refreshConnections(): Promise<void> {
  try {
    showStatus('Refreshing network connections...', 'info');
    refreshBtn.disabled = true;
    analyzeBtn.disabled = true;

    const data = await window.electronAPI.analyzeConnections();
    currentData = data;

    updateStats(data);
    updateProcessTable(data);
    updateServerTable(data);
    updateConnectionList(data);
    updateAnalysisContent(data);

    showStatus(`Refresh complete! Found ${data.connections.length} active connections.`, 'success');

    setTimeout(() => {
      hideStatus();
    }, 3000);
  } catch (error) {
    console.error('Refresh error:', error);
    showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
  } finally {
    refreshBtn.disabled = false;
    analyzeBtn.disabled = false;
  }
}

analyzeBtn.addEventListener('click', analyzeConnections);
refreshBtn.addEventListener('click', refreshConnections);