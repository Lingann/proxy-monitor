import { contextBridge, ipcRenderer } from 'electron';
import type { NetworkAnalysisData, AnalysisConfig } from '../shared/types';

contextBridge.exposeInMainWorld('electronAPI', {
  analyzeConnections: (): Promise<NetworkAnalysisData> =>
    ipcRenderer.invoke('analyze-connections'),
  setFilters: (filters: string[]): Promise<void> =>
    ipcRenderer.invoke('set-filters', filters),
  generateReport: (data: NetworkAnalysisData): Promise<string> =>
    ipcRenderer.invoke('generate-report', data),
  getConfig: (): Promise<AnalysisConfig> =>
    ipcRenderer.invoke('get-config'),
});