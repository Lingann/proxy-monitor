export interface ProcessInfo {
  pid: number;
  name: string;
  category: 'System' | 'Third-party';
  cpu: number;
  memory: number;
  downloadSpeed: number;
  uploadSpeed: number;
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

export interface NetworkInterfaceStats {
  iface: string;
  rx_sec: number;
  tx_sec: number;
}

export interface NetworkAnalysisData {
  analysisTime: string;
  processes: ProcessInfo[];
  connections: ConnectionInfo[];
  remoteIPGroups: RemoteIPGroup[];
  globalStats: {
    uploadSpeed: number;
    downloadSpeed: number;
    interfaces: NetworkInterfaceStats[];
  };
}

export interface AnalysisConfig {
  processFilters: string[];
  autoRefresh: boolean;
  refreshInterval: number;
}