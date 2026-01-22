export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  totalConnections: number;
  establishedConnections: number;
}

export interface ConnectionInfo {
  processId: number;
  processName: string;
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: string;
}

export interface RemoteIPGroup {
  ip: string;
  count: number;
  ports: number[];
}

export interface NetworkAnalysisData {
  analysisTime: string;
  processes: ProcessInfo[];
  connections: ConnectionInfo[];
  remoteIPGroups: RemoteIPGroup[];
}

export interface AnalysisConfig {
  processFilters: string[];
  autoRefresh: boolean;
  refreshInterval: number;
}