import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { NetworkMonitor, NetworkMonitorModule } from '../modules/network-monitor';
import { SettingsModule } from '../modules/settings';
import { ConfigManager } from '../core/config-manager';
import { I18nService } from '../core/i18n-service';
import { ModuleManager } from '../core/module-manager';
import { DatabaseService } from '../core/database-service';

const ejs = require('electron-ejs');

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

/* 初始化业务逻辑 */
const networkMonitor = new NetworkMonitor(configManager.getConfig().processFilters);

/* 设置 EJS 模板引擎 */
const ejsInstance = new ejs({
    modules: moduleManager.getModules(),
    t: (key: string) => i18nService.t(key)
}, {
    root: path.join(__dirname, '../renderer/templates')
});

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: i18nService.t('app.title'),
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  const templatePath = path.join(__dirname, '../renderer/templates/index.ejs');
  mainWindow.loadURL(`file://${templatePath}`);

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
