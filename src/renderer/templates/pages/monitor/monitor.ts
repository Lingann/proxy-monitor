import { t } from '../../../utils/index.js';

// DOM Elements
let analyzeBtn: HTMLButtonElement;
let refreshBtn: HTMLButtonElement;
let statusEl: HTMLDivElement;

let processCountEl: HTMLDivElement;
let connectionCountEl: HTMLDivElement;
let serverCountEl: HTMLDivElement;
let memoryUsageEl: HTMLDivElement;

let processTableBody: HTMLTableSectionElement;
let connectionListEl: HTMLDivElement;
let analysisContentEl: HTMLDivElement;

let monitorListView: HTMLElement | null;
let monitorDetailsView: HTMLElement | null;
let backToMonitorBtn: HTMLElement | null;
let actionDropdown: HTMLElement | null;

let currentData: any = null;

function showStatus(message: string, type: 'info' | 'success' | 'error'): void {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.style.display = 'block';
}

function hideStatus(): void {
    if (!statusEl) return;
    statusEl.style.display = 'none';
    statusEl.textContent = '';
}

function updateStats(data: any): void {
    const totalMemory = data.processes.reduce((sum: number, p: any) => sum + p.memory, 0);

    if (processCountEl) processCountEl.textContent = data.processes.length.toString();
    if (connectionCountEl) connectionCountEl.textContent = data.connections.length.toString();
    if (serverCountEl) serverCountEl.textContent = data.remoteIPGroups.length.toString();
    if (memoryUsageEl) memoryUsageEl.textContent = `${totalMemory.toFixed(2)} MB`;
}

function formatSpeed(bytesPerSec: number): string {
    if (!bytesPerSec) return '0 B/s';
    if (bytesPerSec < 1024) return Math.round(bytesPerSec) + ' B/s';
    if (bytesPerSec < 1024 * 1024) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
    return (bytesPerSec / 1024 / 1024).toFixed(1) + ' MB/s';
}

function updateProcessTable(data: any): void {
    if (!processTableBody) return;
    if (data.processes.length === 0) {
        processTableBody.innerHTML = `<tr><td colspan="7" class="no-data">${t('table.no_processes')}</td></tr>`;
        return;
    }

    processTableBody.innerHTML = data.processes
        .map((proc: any) => `
            <tr>
                <td>${proc.pid}</td>
                <td>${proc.name}</td>
                <td>${proc.category || t('category.third_party')}</td>
                <td>${formatSpeed(proc.downloadSpeed)}</td>
                <td>${formatSpeed(proc.uploadSpeed)}</td>
                <td>${proc.establishedConnections} / ${proc.totalConnections}</td>
                <td>
                    <div class="action-cell">
                        <button class="btn-icon" onclick="window.showDetails(${proc.pid})" title="${t('actions.view_details')}">
                            <i data-feather="info" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.limitSpeed(${proc.pid})" title="${t('actions.limit_speed')}">
                            <i data-feather="download" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.toggleDropdown(event, ${proc.pid})" title="${t('actions.more_actions')}">
                            <i data-feather="more-horizontal" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    
    // Re-initialize icons for new elements
    if ((window as any).feather) (window as any).feather.replace();
}

function getPurpose(ports: number[]): string {
    if (ports.includes(443)) return t('purpose.https');
    if (ports.some((p) => p >= 2400 && p <= 2500)) return t('purpose.custom');
    if (ports.includes(80)) return t('purpose.http');
    return t('purpose.unknown');
}

async function analyzeConnections(): Promise<void> {
    try {
        showStatus(t('monitor.status_analyzing'), 'info');
        if (analyzeBtn) analyzeBtn.disabled = true;

        const data = await (window as any).electronAPI.analyzeConnections();
        currentData = data; // Store for details view

        updateStats(data);
        updateProcessTable(data);

        showStatus(t('monitor.status_complete_count', { count: data.connections.length }), 'success');
        setTimeout(hideStatus, 3000);
    } catch (error) {
        showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
        if (analyzeBtn) analyzeBtn.disabled = false;
    }
}

export function initMonitor() {
    // Initialize elements
    analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;
    refreshBtn = document.getElementById('refreshBtn') as HTMLButtonElement;
    statusEl = document.getElementById('status') as HTMLDivElement;
    processCountEl = document.getElementById('processCount') as HTMLDivElement;
    connectionCountEl = document.getElementById('connectionCount') as HTMLDivElement;
    serverCountEl = document.getElementById('serverCount') as HTMLDivElement;
    memoryUsageEl = document.getElementById('memoryUsage') as HTMLDivElement;
    processTableBody = document.querySelector('#processTable tbody') as HTMLTableSectionElement;
    connectionListEl = document.getElementById('connectionList') as HTMLDivElement;
    analysisContentEl = document.getElementById('analysisContent') as HTMLDivElement;
    monitorListView = document.getElementById('monitor-list-view');
    monitorDetailsView = document.getElementById('monitor-details-view');
    backToMonitorBtn = document.getElementById('backToMonitorBtn');
    actionDropdown = document.getElementById('actionDropdown');

    // Event Listeners
    if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeConnections);
    if (refreshBtn) refreshBtn.addEventListener('click', analyzeConnections);

    // Expose functions to window
    (window as any).showDetails = (pid: number) => {
        if (!currentData) return;
        const proc = currentData.processes.find((p: any) => p.pid === pid);
        if (!proc) return;

        // Fill details
        const nameEl = document.getElementById('detailProcessName');
        const pidEl = document.getElementById('detailPid');
        const catEl = document.getElementById('detailCategory');
        const memEl = document.getElementById('detailMemory');
        const cpuEl = document.getElementById('detailCpu');

        if (nameEl) nameEl.textContent = proc.name;
        if (pidEl) pidEl.textContent = proc.pid.toString();
        if (catEl) catEl.textContent = proc.category || t('category.third_party');
        if (memEl) memEl.textContent = proc.memory + ' MB';
        if (cpuEl) cpuEl.textContent = proc.cpu ? proc.cpu.toFixed(1) : '0';

        // Fill servers table
        const serverTableBody = document.querySelector('#detailServerTable tbody');
        if (serverTableBody) {
            const conns = currentData.connections.filter((c: any) => c.processId === pid);
            if (conns.length === 0) {
                serverTableBody.innerHTML = `<tr><td colspan="4" class="no-data">${t('table.no_active_connections')}</td></tr>`;
            } else {
                const groups: Record<string, any> = {};
                conns.forEach((c: any) => {
                    if (!groups[c.remoteAddress]) {
                        groups[c.remoteAddress] = {
                            ip: c.remoteAddress,
                            ports: new Set(),
                            count: 0
                        };
                    }
                    groups[c.remoteAddress].ports.add(c.remotePort);
                    groups[c.remoteAddress].count++;
                });

                const sortedGroups = Object.values(groups).sort((a: any, b: any) => b.count - a.count);

                serverTableBody.innerHTML = sortedGroups.map((group: any) => `
                    <tr>
                        <td>${group.ip}</td>
                        <td>${Array.from(group.ports).join(', ')}</td>
                        <td>${group.count}</td>
                        <td>${getPurpose(Array.from(group.ports) as number[])}</td>
                    </tr>
                `).join('');
            }
        }

        // Fill connections table
        const connTableBody = document.querySelector('#detailConnectionTable tbody');
        if (connTableBody) {
            const conns = currentData.connections.filter((c: any) => c.processId === pid);
            if (conns.length === 0) {
                connTableBody.innerHTML = `<tr><td colspan="3" class="no-data">${t('table.no_active_connections')}</td></tr>`;
            } else {
                connTableBody.innerHTML = conns.map((c: any) => `
                    <tr>
                        <td>${c.localAddress}:${c.localPort}</td>
                        <td>${c.remoteAddress}:${c.remotePort}</td>
                        <td>${c.state}</td>
                    </tr>
                `).join('');
            }
        }

        // Switch view
        if (monitorListView) monitorListView!.style.display = 'none';
        if (monitorDetailsView) monitorDetailsView!.style.display = 'block';
    };

    (window as any).limitSpeed = (pid: number) => {
        alert(t('messages.limit_speed_unavailable', { pid }));
    };

    (window as any).toggleDropdown = (event: MouseEvent, pid: number) => {
        event.stopPropagation();
        if (!actionDropdown) return;
        
        const btn = (event.currentTarget as HTMLElement);
        const rect = btn.getBoundingClientRect();
        
        actionDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        actionDropdown.style.left = `${rect.left + window.scrollX - 120}px`; 
        actionDropdown.style.display = 'block';
        
        actionDropdown.setAttribute('data-pid', pid.toString());
    };

    // Back Button
    if (backToMonitorBtn) {
        backToMonitorBtn.addEventListener('click', () => {
            if (monitorListView) monitorListView!.style.display = 'block';
            if (monitorDetailsView) monitorDetailsView!.style.display = 'none';
        });
    }

    // Close dropdown
    document.addEventListener('click', () => {
        if (actionDropdown) actionDropdown.style.display = 'none';
    });

    // Dropdown Actions
    if (actionDropdown) {
        actionDropdown.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const action = target.getAttribute('data-action');
            const pid = parseInt(actionDropdown!.getAttribute('data-pid') || '0');
            
            if (!action || !pid) return;

            if (action === 'details') {
                (window as any).showDetails(pid);
            } else if (action === 'limit') {
                (window as any).limitSpeed(pid);
            } else if (action === 'end') {
                if (confirm(t('messages.confirm_end_process', { pid }))) {
                    alert(t('actions.end_process') + ` ${pid}`);
                }
            } else if (action === 'locate') {
                alert(t('messages.locating_file', { pid }));
            } else if (action === 'properties') {
                alert(t('messages.properties_for', { pid }));
            }
        });
    }
}
