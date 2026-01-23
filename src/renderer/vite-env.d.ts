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
}

interface Window {
  electronAPI: ElectronAPI;
}
