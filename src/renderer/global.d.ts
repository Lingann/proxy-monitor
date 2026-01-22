import type { NetworkAnalysisData, AnalysisConfig } from '../shared/types';

declare global {
  interface Window {
    electronAPI: {
      analyzeConnections: () => Promise<NetworkAnalysisData>;
      setFilters: (filters: string[]) => Promise<void>;
      generateReport: (data: NetworkAnalysisData) => Promise<string>;
      getConfig: () => Promise<AnalysisConfig>;
    };
  }
}

export {};