import type { NetworkAnalysisData, AnalysisConfig, SystemProxyConfig, ExtendedProxyConfig, ProxyBypassRule } from '../shared/common-types';

declare global {
  interface Window {
    electronAPI: {
      analyzeConnections: () => Promise<NetworkAnalysisData>;
      setFilters: (filters: string[]) => Promise<void>;
      getConfig: () => Promise<AnalysisConfig>;
      saveSettings: (settings: any) => Promise<boolean>;
      getSettings: () => Promise<any>;
      getProxyConfig: () => Promise<SystemProxyConfig>;
      getExtendedProxyConfig: () => Promise<ExtendedProxyConfig>;
      setProxyConfig: (config: Partial<SystemProxyConfig>) => Promise<void>;
      setExtendedProxyConfig: (config: Partial<ExtendedProxyConfig>) => Promise<void>;
      enableProxy: () => Promise<void>;
      disableProxy: () => Promise<void>;
      addBypassRule: (address: string, description?: string) => Promise<void>;
      removeBypassRule: (ruleId: string) => Promise<void>;
      updateBypassRule: (ruleId: string, updates: Partial<ProxyBypassRule>) => Promise<void>;
      addAddressesToBypass: (addresses: string[], description?: string) => Promise<void>;
      getProcessAddresses: (pid: number) => Promise<string[]>;
    };
  }
}

export {};
