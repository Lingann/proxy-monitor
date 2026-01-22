import { contextBridge, ipcRenderer } from 'electron';
import type { NetworkAnalysisData, AnalysisConfig } from '../shared/common-types.js';

contextBridge.exposeInMainWorld('electronAPI', {
  analyzeConnections: (): Promise<NetworkAnalysisData> =>
    ipcRenderer.invoke('analyze-connections'),
  setFilters: (filters: string[]): Promise<void> =>
    ipcRenderer.invoke('set-filters', filters),
  getConfig: (): Promise<AnalysisConfig> =>
    ipcRenderer.invoke('get-config'),
  saveSettings: (settings: any): Promise<boolean> => 
    ipcRenderer.invoke('save-settings', settings),
  getSettings: (): Promise<any> =>
    ipcRenderer.invoke('get-settings'),
  getRecentTraffic: (): Promise<any[]> =>
    ipcRenderer.invoke('get-recent-traffic')
});
