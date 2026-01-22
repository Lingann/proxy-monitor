// Navigation logic
const navItems = document.querySelectorAll('.nav-item');
const viewSections = document.querySelectorAll('.view-section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        
        // Update Sidebar
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Update View
        viewSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `view-${target}`) {
                section.classList.add('active');
            }
        });
    });
});

// Network Monitor logic
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

// New Monitor Elements
const monitorListView = document.getElementById('monitor-list-view');
const monitorDetailsView = document.getElementById('monitor-details-view');
const backToMonitorBtn = document.getElementById('backToMonitorBtn');
const actionDropdown = document.getElementById('actionDropdown');

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
        processTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No processes found</td></tr>';
        return;
    }

    processTableBody.innerHTML = data.processes
        .map((proc: any) => `
            <tr>
                <td>${proc.pid}</td>
                <td>${proc.name}</td>
                <td>${proc.category || 'Third-party'}</td>
                <td>${formatSpeed(proc.downloadSpeed)}</td>
                <td>${formatSpeed(proc.uploadSpeed)}</td>
                <td>${proc.establishedConnections} / ${proc.totalConnections}</td>
                <td>
                    <div class="action-cell">
                        <button class="btn-icon" onclick="window.showDetails(${proc.pid})" title="View Details">
                            <i data-feather="info" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.limitSpeed(${proc.pid})" title="Limit Speed">
                            <i data-feather="download" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn-icon" onclick="window.toggleDropdown(event, ${proc.pid})" title="More Actions">
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
    if (ports.includes(443)) return 'HTTPS encrypted connection';
    if (ports.some((p) => p >= 2400 && p <= 2500)) return 'Custom protocol connection';
    if (ports.includes(80)) return 'HTTP connection';
    return 'Unknown purpose';
}

function updateServerTable(data: any): void {
    if (!serverTableBody) return;
    if (data.remoteIPGroups.length === 0) {
        serverTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No connections found</td></tr>';
        return;
    }

    serverTableBody.innerHTML = data.remoteIPGroups
        .map((group: any) => `
            <tr>
                <td>${group.ip}</td>
                <td>${group.ports.join(', ')}</td>
                <td>${group.count}</td>
                <td>${getPurpose(group.ports)}</td>
            </tr>
        `).join('');
}

async function analyzeConnections(): Promise<void> {
    try {
        showStatus('Analyzing network connections...', 'info');
        if (analyzeBtn) analyzeBtn.disabled = true;

        const data = await (window as any).electronAPI.analyzeConnections();
        currentData = data; // Store for details view

        updateStats(data);
        updateProcessTable(data);
        updateServerTable(data);

        showStatus(`Analysis complete! Found ${data.connections.length} active connections.`, 'success');
        setTimeout(hideStatus, 3000);
    } catch (error) {
        showStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
        if (analyzeBtn) analyzeBtn.disabled = false;
    }
}

if (analyzeBtn) analyzeBtn.addEventListener('click', analyzeConnections);
if (refreshBtn) refreshBtn.addEventListener('click', analyzeConnections);

// --- New Monitor Features Logic ---

// Expose functions to window for onclick handlers
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
    if (catEl) catEl.textContent = proc.category || 'Third-party';
    if (memEl) memEl.textContent = proc.memory + ' MB';
    if (cpuEl) cpuEl.textContent = proc.cpu ? proc.cpu.toFixed(1) : '0';

    // Fill connections table
    const connTableBody = document.querySelector('#detailConnectionTable tbody');
    if (connTableBody) {
        const conns = currentData.connections.filter((c: any) => c.processId === pid);
        if (conns.length === 0) {
            connTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No active connections</td></tr>';
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
    if (monitorListView) monitorListView.style.display = 'none';
    if (monitorDetailsView) monitorDetailsView.style.display = 'block';
};

(window as any).limitSpeed = (pid: number) => {
    // Placeholder for now
    alert(`Limit Speed feature is not available for process ${pid} (requires system driver).`);
};

(window as any).toggleDropdown = (event: MouseEvent, pid: number) => {
    event.stopPropagation();
    if (!actionDropdown) return;
    
    // Position dropdown near the button
    const btn = (event.currentTarget as HTMLElement);
    const rect = btn.getBoundingClientRect();
    
    // Calculate position relative to viewport/document
    actionDropdown.style.top = `${rect.bottom + window.scrollY}px`;
    // Align right edge of dropdown with right edge of button if possible, or left
    actionDropdown.style.left = `${rect.left + window.scrollX - 120}px`; 
    actionDropdown.style.display = 'block';
    
    // Store current PID
    actionDropdown.setAttribute('data-pid', pid.toString());
};

// Back Button Logic
if (backToMonitorBtn) {
    backToMonitorBtn.addEventListener('click', () => {
        if (monitorListView) monitorListView.style.display = 'block';
        if (monitorDetailsView) monitorDetailsView.style.display = 'none';
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    if (actionDropdown) actionDropdown.style.display = 'none';
});

// Dropdown Action Handlers
if (actionDropdown) {
    actionDropdown.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const action = target.getAttribute('data-action');
        const pid = parseInt(actionDropdown.getAttribute('data-pid') || '0');
        
        if (!action || !pid) return;

        if (action === 'details') {
            (window as any).showDetails(pid);
        } else if (action === 'limit') {
            (window as any).limitSpeed(pid);
        } else if (action === 'end') {
            if (confirm(`Are you sure you want to end process ${pid}?`)) {
                // Implement IPC call if available, or just alert for now
                alert(`End process ${pid} requested.`);
            }
        } else if (action === 'locate') {
            alert(`Locating file for process ${pid}...`);
        } else if (action === 'properties') {
            alert(`Properties for process ${pid}...`);
        }
    });
}


// Settings logic
const saveSettingsBtn = document.getElementById('saveSettingsBtn') as HTMLButtonElement;
const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
const settingsStatus = document.getElementById('settingsStatus') as HTMLDivElement;

async function loadSettings() {
    if (!(window as any).electronAPI) return;
    const settings = await (window as any).electronAPI.getSettings();
    if (languageSelect) languageSelect.value = settings.locale;
}

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', async () => {
        const settings = {
            locale: languageSelect.value
        };
        const success = await (window as any).electronAPI.saveSettings(settings);
        if (success) {
            if (settingsStatus) {
                settingsStatus.textContent = 'Settings saved! Reloading...';
                settingsStatus.className = 'status success';
                settingsStatus.style.display = 'block';
            }
        }
    });
}

loadSettings();
