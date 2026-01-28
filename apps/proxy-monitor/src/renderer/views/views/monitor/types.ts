export interface ProcessData {
  pid: number;
  name: string;
  category: string;
  memory: number;
  cpu: number;
  downloadSpeed: number;
  uploadSpeed: number;
  establishedConnections: number;
  totalConnections: number;
}

export interface ServerGroupData {
  ip: string;
  ports: Set<number>;
  count: number;
}

export interface ConnectionData {
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: string;
  processId: number;
}

export interface GlobalStats {
  downloadSpeed: number;
  uploadSpeed: number;
}

export interface MonitorData {
  processes: ProcessData[];
  connections: ConnectionData[];
  remoteIPGroups: any[]; // Or specific type if known
  globalStats?: GlobalStats;
}

export interface TrafficHistoryItem {
  time: Date;
  upload: number;
  download: number;
}
