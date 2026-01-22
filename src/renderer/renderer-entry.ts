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

function updateProcessTable(data: any): void {
    if (!processTableBody) return;
    if (data.processes.length === 0) {
        processTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No processes found</td></tr>';
        return;
    }

    processTableBody.innerHTML = data.processes
        .map((proc: any) => `
            <tr>
                <td>${proc.pid}</td>
                <td>${proc.name}</td>
                <td>${proc.memory.toFixed(2)} MB</td>
                <td>${proc.establishedConnections}</td>
            </tr>
        `).join('');
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

        const data = await window.electronAPI.analyzeConnections();

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

// Settings logic
const saveSettingsBtn = document.getElementById('saveSettingsBtn') as HTMLButtonElement;
const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
const settingsStatus = document.getElementById('settingsStatus') as HTMLDivElement;

async function loadSettings() {
    const settings = await window.electronAPI.getSettings();
    if (languageSelect) languageSelect.value = settings.locale;
}

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', async () => {
        const settings = {
            locale: languageSelect.value
        };
        const success = await window.electronAPI.saveSettings(settings);
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
