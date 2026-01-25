import { contextBridge, ipcRenderer } from 'electron';
import type { NetworkAnalysisData, AnalysisConfig, SystemProxyConfig, ExtendedProxyConfig, ProxyBypassRule } from '../shared/common-types.js';

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
    ipcRenderer.invoke('get-recent-traffic'),
  getProxyConfig: (): Promise<SystemProxyConfig> =>
    ipcRenderer.invoke('get-proxy-config'),
  getExtendedProxyConfig: (): Promise<ExtendedProxyConfig> =>
    ipcRenderer.invoke('get-extended-proxy-config'),
  setProxyConfig: (config: Partial<SystemProxyConfig>): Promise<void> =>
    ipcRenderer.invoke('set-proxy-config', config),
  setExtendedProxyConfig: (config: Partial<ExtendedProxyConfig>): Promise<void> =>
    ipcRenderer.invoke('set-extended-proxy-config', config),
  enableProxy: (): Promise<void> =>
    ipcRenderer.invoke('enable-proxy'),
  disableProxy: (): Promise<void> =>
    ipcRenderer.invoke('disable-proxy'),
  addBypassRule: (address: string, description?: string): Promise<void> =>
    ipcRenderer.invoke('add-bypass-rule', address, description),
  removeBypassRule: (ruleId: string): Promise<void> =>
    ipcRenderer.invoke('remove-bypass-rule', ruleId),
  updateBypassRule: (ruleId: string, updates: Partial<ProxyBypassRule>): Promise<void> =>
    ipcRenderer.invoke('update-bypass-rule', ruleId, updates),
  addAddressesToBypass: (addresses: string[], description?: string): Promise<void> =>
    ipcRenderer.invoke('add-addresses-to-bypass', addresses, description),
  getProcessAddresses: (pid: number): Promise<string[]> =>
    ipcRenderer.invoke('get-process-addresses', pid)
});
