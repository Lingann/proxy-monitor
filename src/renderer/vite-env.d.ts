/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Extend window for electronAPI
interface ElectronAPI {
  analyzeConnections: () => Promise<any>;
  setFilters: (filters: string[]) => Promise<void>;
  getConfig: () => Promise<any>;
  saveSettings: (settings: any) => Promise<boolean>;
  getSettings: () => Promise<any>;
  getRecentTraffic: () => Promise<any[]>;
  getProxyConfig: () => Promise<any>;
  getExtendedProxyConfig: () => Promise<any>;
  setProxyConfig: (config: any) => Promise<void>;
  setExtendedProxyConfig: (config: any) => Promise<void>;
  enableProxy: () => Promise<void>;
  disableProxy: () => Promise<void>;
  addBypassRule: (address: string, description?: string) => Promise<void>;
  removeBypassRule: (ruleId: string) => Promise<void>;
  updateBypassRule: (ruleId: string, updates: any) => Promise<void>;
  addAddressesToBypass: (addresses: string[], description?: string) => Promise<void>;
  getProcessAddresses: (pid: number) => Promise<string[]>;
}

interface Window {
  electronAPI: ElectronAPI;
}

