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

/* 系统代理配置接口 */
export interface SystemProxyConfig {
  enabled: boolean;
  server: string;
  bypass: string;
}

/* 代理绕过规则项 */
export interface ProxyBypassRule {
  id: string;
  address: string;
  description?: string;
  enabled: boolean;
  createdAt: number;
}

/* 扩展的系统代理配置（用于前端） */
export interface ExtendedProxyConfig {
  enabled: boolean;
  server: string;
  bypassRules: ProxyBypassRule[];
}