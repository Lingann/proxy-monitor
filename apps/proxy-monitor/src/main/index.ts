import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { NetworkMonitor, NetworkMonitorModule } from '../modules/network-monitor/index.js';
import { SettingsModule } from '../modules/settings/index.js';
import { ComponentLibraryModule } from '../modules/component-library/index.js';
import { SystemProxyModule, SystemProxyService } from '../modules/system-proxy/index.js';
import { ConfigManager } from '../core/config-manager.js';
import { I18nService } from '../core/i18n-service.js';
import { ModuleManager } from '../core/module-manager.js';
import { DatabaseService } from '../core/database-service.js';
import { ensureElevation } from './elevation.js';

// Ensure admin privileges on Windows
if (process.platform === 'win32') {
  ensureElevation();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

/* 初始化核心服务 */
const configManager = ConfigManager.getInstance();
const i18nService = I18nService.getInstance();
i18nService.setLocale(configManager.getConfig().locale);

// Initialize Database Service
const databaseService = DatabaseService.getInstance();

const moduleManager = ModuleManager.getInstance();
moduleManager.register(NetworkMonitorModule);
moduleManager.register(SettingsModule);
moduleManager.register(ComponentLibraryModule);
moduleManager.register(SystemProxyModule);

/* 初始化业务逻辑 */
const networkMonitor = new NetworkMonitor(configManager.getConfig().processFilters);

const systemProxyService = SystemProxyService.getInstance();

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
            preload: path.join(__dirname, '../preload/index.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    title: i18nService.t('app.title'),
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    databaseService.close();
    app.quit();
  }
});

/* IPC 处理程序 */
ipcMain.handle('analyze-connections', async (): Promise<any> => {
  return await networkMonitor.analyze();
});

ipcMain.handle('get-recent-traffic', async (): Promise<any> => {
  return await networkMonitor.getRecentTrafficHistory();
});

ipcMain.handle('set-filters', async (_event, filters: string[]): Promise<void> => {
  networkMonitor.setFilters(filters);
});

ipcMain.handle('get-config', async (): Promise<any> => {
  return {
    processFilters: configManager.getConfig().processFilters,
    autoRefresh: false,
    refreshInterval: 5000,
  };
});

ipcMain.handle('save-settings', async (_event, settings: any) => {
    configManager.setConfig({
        locale: settings.locale,
    });
    i18nService.setLocale(settings.locale);
    
    if (mainWindow) {
        mainWindow.reload();
    }
    return true;
});

ipcMain.handle('get-settings', async () => {
    return configManager.getConfig();
});

/* IPC 处理程序 - 系统代理 */
ipcMain.handle('get-proxy-config', async (): Promise<any> => {
  return await systemProxyService.getProxyConfig();
});

ipcMain.handle('get-extended-proxy-config', async (): Promise<any> => {
  return await systemProxyService.getExtendedProxyConfig();
});

ipcMain.handle('set-proxy-config', async (_event, config: any): Promise<void> => {
  await systemProxyService.setProxyConfig(config);
});

ipcMain.handle('set-extended-proxy-config', async (_event, config: any): Promise<void> => {
  await systemProxyService.setExtendedProxyConfig(config);
});

ipcMain.handle('enable-proxy', async (): Promise<void> => {
  await systemProxyService.enableProxy();
});

ipcMain.handle('disable-proxy', async (): Promise<void> => {
  await systemProxyService.disableProxy();
});

ipcMain.handle('add-bypass-rule', async (_event, address: string, description?: string): Promise<void> => {
  await systemProxyService.addBypassRule(address, description);
});

ipcMain.handle('remove-bypass-rule', async (_event, ruleId: string): Promise<void> => {
  await systemProxyService.removeBypassRule(ruleId);
});

ipcMain.handle('update-bypass-rule', async (_event, ruleId: string, updates: any): Promise<void> => {
  await systemProxyService.updateBypassRule(ruleId, updates);
});

ipcMain.handle('add-addresses-to-bypass', async (_event, addresses: string[], description?: string): Promise<void> => {
  await systemProxyService.addAddressesToBypass(addresses, description);
});

ipcMain.handle('get-process-addresses', async (_event, pid: number): Promise<string[]> => {
  const data = await networkMonitor.analyze();
  const connections = data.connections.filter((conn: any) => conn.processId === pid);
  const addresses = [...new Set(connections.map((conn: any) => conn.remoteAddress))];
  return addresses;
});
