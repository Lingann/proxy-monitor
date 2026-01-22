import type { NetworkAnalysisData, AnalysisConfig } from '../shared/common-types';

declare global {
  interface Window {
    electronAPI: {
      analyzeConnections: () => Promise<NetworkAnalysisData>;
      setFilters: (filters: string[]) => Promise<void>;
      getConfig: () => Promise<AnalysisConfig>;
      saveSettings: (settings: any) => Promise<boolean>;
      getSettings: () => Promise<any>;
    };
  }
}

export {};
