import type { NetworkAnalysisData } from '../shared/types';

let currentData: NetworkAnalysisData | null = null;

const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
const generateReportBtn = document.getElementById('generateReportBtn') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

const processCountEl = document.getElementById('processCount') as HTMLDivElement;
const connectionCountEl = document.getElementById('connectionCount') as HTMLDivElement;
const serverCountEl = document.getElementById('serverCount') as HTMLDivElement;
const memoryUsageEl = document.getElementById('memoryUsage') as HTMLDivElement;

const processTableBody = document.querySelector('#processTable tbody') as HTMLTableSectionElement;
const serverTableBody = document.querySelector('#serverTable tbody') as HTMLTableSectionElement;
const connectionListEl = document.getElementById('connectionList') as HTMLDivElement;

function showStatus(message: string, type: 'info' | 'success' | 'error'): void {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
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

function updateServerTable(data: NetworkAnalysisData): void {
  if (data.remoteIPGroups.length === 0) {
    serverTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No connections found</td></tr>';
    return;
  }

  serverTableBody.innerHTML = data.remoteIPGroups
    .map(
      (group) => `
        <tr>
            <td>${group.ip}</td>
            <td>${group.ports.join(', ')}</td>
            <td>${group.count}</td>
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

async function analyzeConnections(): Promise<void> {
  try {
    showStatus('Analyzing network connections...', 'info');
    analyzeBtn.disabled = true;

    const data = await window.electronAPI.analyzeConnections();
    currentData = data;

    updateStats(data);
    updateProcessTable(data);
    updateServerTable(data);
    updateConnectionList(data);

    showStatus(`Analysis complete! Found ${data.connections.length} active connections.`, 'success');
    generateReportBtn.disabled = false;
  } catch (error) {
    console.error('Analysis error:', error);
    showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
  } finally {
    analyzeBtn.disabled = false;
  }
}

async function generateReport(): Promise<void> {
  if (!currentData) {
    showStatus('No data to generate report. Please analyze first.', 'error');
    return;
  }

  try {
    showStatus('Generating HTML report...', 'info');
    generateReportBtn.disabled = true;

    const filePath = await window.electronAPI.generateReport(currentData);
    showStatus(`Report saved to: ${filePath}`, 'success');
  } catch (error) {
    console.error('Report generation error:', error);
    showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
  } finally {
    generateReportBtn.disabled = false;
  }
}

analyzeBtn.addEventListener('click', analyzeConnections);
generateReportBtn.addEventListener('click', generateReport);