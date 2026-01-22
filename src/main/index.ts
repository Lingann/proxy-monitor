import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { NetworkAnalyzer } from './network-analyzer';
import { ReportGenerator } from './report-generator';
import type { NetworkAnalysisData, AnalysisConfig } from '../shared/types';

let mainWindow: BrowserWindow | null = null;
const networkAnalyzer = new NetworkAnalyzer();
const reportGenerator = new ReportGenerator();

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'Proxy Monitor',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

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
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('analyze-connections', async (): Promise<NetworkAnalysisData> => {
  return await networkAnalyzer.analyze();
});

ipcMain.handle('set-filters', async (_event, filters: string[]): Promise<void> => {
  networkAnalyzer.setFilters(filters);
});

ipcMain.handle('generate-report', async (_event, data: NetworkAnalysisData): Promise<string> => {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow!, {
    defaultPath: path.join(app.getPath('downloads'), 'ProxyMonitorReport.html'),
    filters: [{ name: 'HTML Files', extensions: ['html'] }],
  });

  if (canceled || !filePath) {
    throw new Error('Save dialog was cancelled');
  }

  reportGenerator.saveReport(data, filePath);
  return filePath;
});

ipcMain.handle('get-config', async (): Promise<AnalysisConfig> => {
  return {
    processFilters: networkAnalyzer['processFilters'],
    autoRefresh: false,
    refreshInterval: 5000,
  };
});