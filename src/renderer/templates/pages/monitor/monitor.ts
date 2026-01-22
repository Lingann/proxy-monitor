import { t } from '../../../utils/index.js';
import { CommonTable } from '../../components/common-table/common-table.js';
import { Column } from '../../components/common-table/common-table-types.js';
import { initChart } from '../../../utils/echarts-theme.js';
// @ts-ignore
const echarts = (window as any).echarts;


interface ProcessData {
    pid: number;
    name: string;
    category: string;
    memory: number;
    cpu: number;
    downloadSpeed: number;
    uploadSpeed: number;
    establishedConnections: number;
    totalConnections: number;
}

interface ServerGroupData {
    ip: string;
    ports: Set<number>;
    count: number;
}

interface ConnectionData {
    localAddress: string;
    localPort: number;
    remoteAddress: string;
    remotePort: number;
    state: string;
    processId: number;
}

// DOM Elements
let analyzeBtn: HTMLButtonElement;
let refreshBtn: HTMLButtonElement;
let statusEl: HTMLDivElement;

let processCountEl: HTMLDivElement;
let connectionCountEl: HTMLDivElement;
let serverCountEl: HTMLDivElement;
let memoryUsageEl: HTMLDivElement;
let totalUploadEl: HTMLDivElement;
let totalDownloadEl: HTMLDivElement;

let processTable: CommonTable<ProcessData>;
let serverTable: CommonTable<ServerGroupData>;
let connectionTable: CommonTable<ConnectionData>;

let connectionListEl: HTMLDivElement;
let analysisContentEl: HTMLDivElement;

let monitorListView: HTMLElement | null;
let monitorDetailsView: HTMLElement | null;
let backToMonitorBtn: HTMLElement | null;
let actionDropdown: HTMLElement | null;

let currentData: any = null;
let trafficChart: any = null;
let pollInterval: any = null;

const trafficHistory: { time: Date; upload: number; download: number }[] = [];
const MAX_HISTORY = 60;

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
    
    // Calculate total speeds
    let totalDownload = 0;
    let totalUpload = 0;

    if (data.globalStats) {
        totalDownload = data.globalStats.downloadSpeed;
        totalUpload = data.globalStats.uploadSpeed;
    } else {
        totalDownload = data.processes.reduce((sum: number, p: any) => sum + (p.downloadSpeed || 0), 0);
        totalUpload = data.processes.reduce((sum: number, p: any) => sum + (p.uploadSpeed || 0), 0);
    }

    if (processCountEl) processCountEl.textContent = data.processes.length.toString();
    if (connectionCountEl) connectionCountEl.textContent = data.connections.length.toString();
    if (serverCountEl) serverCountEl.textContent = data.remoteIPGroups.length.toString();
    if (memoryUsageEl) memoryUsageEl.textContent = `${totalMemory.toFixed(2)} MB`;
    
    if (totalUploadEl) totalUploadEl.textContent = formatSpeed(totalUpload);
    if (totalDownloadEl) totalDownloadEl.textContent = formatSpeed(totalDownload);

    updateChart(totalUpload, totalDownload);
}

function renderChart() {
    if (!trafficChart) return;

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                let res = '';
                if (params[0] && params[0].value && params[0].value[0]) {
                     res = `${params[0].value[0].toLocaleTimeString()}<br/>`;
                }
                params.forEach((item: any) => {
                    // item.value is [date, number]
                    res += `${item.marker} ${item.seriesName}: ${formatSpeed(item.value[1])}<br/>`;
                });
                return res;
            },
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: [t('monitor.total_upload'), t('monitor.total_download')],
            top: 0,
            icon: 'circle'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{HH}:{mm}:{ss}'
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value: number) => {
                    if (value === 0) return '0';
                    if (value < 1024) return `${value} B/s`;
                    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB/s`;
                    return `${(value / 1024 / 1024).toFixed(1)} MB/s`;
                }
            }
        },
        series: [
            {
                name: t('monitor.total_upload'),
                type: 'line',
                showSymbol: false,
                data: trafficHistory.map(item => [item.time, item.upload]),
                itemStyle: { color: '#d96a6a' },
                areaStyle: {
                    color: new (window as any).echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(217, 106, 106, 0.5)' },
                        { offset: 1, color: 'rgba(217, 106, 106, 0.1)' }
                    ])
                }
            },
            {
                name: t('monitor.total_download'),
                type: 'line',
                showSymbol: false,
                data: trafficHistory.map(item => [item.time, item.download]),
                itemStyle: { color: '#5d9bc9' },
                areaStyle: {
                    color: new (window as any).echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(93, 155, 201, 0.5)' },
                        { offset: 1, color: 'rgba(93, 155, 201, 0.1)' }
                    ])
                }
            }
        ]
    };

    trafficChart.setOption(option);
}

function updateChart(upload: number, download: number) {
    if (!trafficChart) return;

    const now = new Date();

    trafficHistory.push({
        time: now,
        upload: upload,
        download: download
    });

    if (trafficHistory.length > MAX_HISTORY) {
        trafficHistory.shift();
    }

    renderChart();
}

async function loadHistory() {
    try {
        const history = await (window as any).electronAPI.getRecentTraffic();
        if (history && Array.isArray(history)) {
             history.forEach((h: any) => {
                 trafficHistory.push({
                     time: new Date(h.timestamp),
                     upload: h.tx,
                     download: h.rx
                 });
             });
             while (trafficHistory.length > MAX_HISTORY) {
                 trafficHistory.shift();
             }
             renderChart();
        }
    } catch (e) {
        console.error('Failed to load history', e);
    }
}

function formatSpeed(bytesPerSec: number): string {
    if (!bytesPerSec) return '0 B/s';
    if (bytesPerSec < 1024) return Math.round(bytesPerSec) + ' B/s';
    if (bytesPerSec < 1024 * 1024) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
    return (bytesPerSec / 1024 / 1024).toFixed(1) + ' MB/s';
}

function updateProcessTable(data: any): void {
    if (!processTable) return;
    // Use keepPage = true to prevent jumping to page 1
    processTable.setData(data.processes, true);
    if ((window as any).feather) (window as any).feather.replace();
}

function getPurpose(ports: number[]): string {
    if (ports.includes(443)) return t('purpose.https');
    if (ports.some((p) => p >= 2400 && p <= 2500)) return t('purpose.custom');
    if (ports.includes(80)) return t('purpose.http');
    return t('purpose.unknown');
}

async function analyzeConnections(silent: boolean = false): Promise<void> {
    try {
        if (!silent) {
            showStatus(t('monitor.status_analyzing'), 'info');
            if (analyzeBtn) analyzeBtn.disabled = true;
        }

        const data = await (window as any).electronAPI.analyzeConnections();
        currentData = data; // Store for details view

        updateStats(data);
        updateProcessTable(data);

        if (!silent) {
            showStatus(t('monitor.status_complete_count', { count: data.connections.length }), 'success');
            setTimeout(hideStatus, 3000);
        }
    } catch (error) {
        if (!silent) {
            showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        } else {
            console.error('Polling error:', error);
        }
    } finally {
        if (!silent && analyzeBtn) analyzeBtn.disabled = false;
    }
}

function startPolling() {
    if (pollInterval) clearInterval(pollInterval);
    // Initial call
    analyzeConnections(true);
    // Poll every 1 second
    pollInterval = setInterval(() => {
        analyzeConnections(true);
    }, 1000);
}

function stopPolling() {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
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
    totalUploadEl = document.getElementById('totalUploadSpeed') as HTMLDivElement;
    totalDownloadEl = document.getElementById('totalDownloadSpeed') as HTMLDivElement;
    
    // Initialize Chart
    const chartContainer = document.getElementById('trafficChart');
    if (chartContainer) {
        trafficChart = initChart(chartContainer);
        window.addEventListener('resize', () => {
            trafficChart?.resize();
        });
    }

    // Initialize Process Table
    processTable = new CommonTable<ProcessData>('processTableContainer', {
        columns: [
            { key: 'pid', title: t('table.pid'), width: '80px', sortable: true },
            { key: 'name', title: t('table.name'), sortable: true, filterable: true },
            { key: 'category', title: t('table.category'), sortable: true, render: (val) => val || t('category.third_party') },
            { key: 'downloadSpeed', title: t('table.download'), sortable: true, render: (val) => formatSpeed(val) },
            { key: 'uploadSpeed', title: t('table.upload'), sortable: true, render: (val) => formatSpeed(val) },
            { key: 'connections', title: t('table.connections'), render: (_, row) => `${row.establishedConnections} / ${row.totalConnections}` },
            { 
                key: 'actions', 
                title: t('table.actions'), 
                width: '120px',
                render: (_, row) => `
                    <div class="action-cell">
                        <button class="btn-icon" onclick="window.showDetails(${row.pid})" title="${t('actions.view_details')}">
                            <i data-feather="info" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.limitSpeed(${row.pid})" title="${t('actions.limit_speed')}">
                            <i data-feather="download" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.toggleDropdown(event, ${row.pid})" title="${t('actions.more_actions')}">
                            <i data-feather="more-horizontal" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                `
            }
        ],
        rowKey: 'pid',
        pagination: { enable: true, pageSize: 10 },
        height: 'calc(100vh - 450px)' // Adjusted height for new header
    });

    // Initialize Server Table
    serverTable = new CommonTable<ServerGroupData>('detailServerTableContainer', {
        columns: [
            { key: 'ip', title: t('table.ip_address'), sortable: true },
            { key: 'ports', title: t('table.ports'), render: (val) => Array.from(val).join(', ') },
            { key: 'count', title: t('table.count'), sortable: true },
            { key: 'purpose', title: t('table.purpose'), render: (_, row) => getPurpose(Array.from(row.ports)) }
        ],
        rowKey: 'ip',
        pagination: { enable: true, pageSize: 5 }
    });

    // Initialize Connection Table
    connectionTable = new CommonTable<ConnectionData>('detailConnectionTableContainer', {
        columns: [
            { key: 'local', title: t('table.local_address'), render: (_, row) => `${row.localAddress}:${row.localPort}` },
            { key: 'remote', title: t('table.remote_address'), render: (_, row) => `${row.remoteAddress}:${row.remotePort}` },
            { key: 'state', title: t('table.state'), sortable: true }
        ],
        rowKey: 'remoteAddress', // Just a placeholder
        pagination: { enable: true, pageSize: 10 }
    });

    connectionListEl = document.getElementById('connectionList') as HTMLDivElement;
    analysisContentEl = document.getElementById('analysisContent') as HTMLDivElement;
    monitorListView = document.getElementById('monitor-list-view');
    monitorDetailsView = document.getElementById('monitor-details-view');
    backToMonitorBtn = document.getElementById('backToMonitorBtn');
    actionDropdown = document.getElementById('actionDropdown');

    // Event Listeners
    if (analyzeBtn) analyzeBtn.addEventListener('click', () => analyzeConnections(false));
    if (refreshBtn) refreshBtn.addEventListener('click', () => analyzeConnections(false));

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
        const conns = currentData.connections.filter((c: any) => c.processId === pid);
        
        // Prepare server groups
        const groups: Record<string, ServerGroupData> = {};
        conns.forEach((c: any) => {
            if (!groups[c.remoteAddress]) {
                groups[c.remoteAddress] = {
                    ip: c.remoteAddress,
                    ports: new Set<number>(),
                    count: 0
                };
            }
            groups[c.remoteAddress].ports.add(c.remotePort);
            groups[c.remoteAddress].count++;
        });

        const sortedGroups = Object.values(groups).sort((a, b) => b.count - a.count);
        if (serverTable) serverTable.setData(sortedGroups);

        // Fill connections table
        if (connectionTable) connectionTable.setData(conns);

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

    // Start polling when initialized
    loadHistory();
    startPolling();
}
