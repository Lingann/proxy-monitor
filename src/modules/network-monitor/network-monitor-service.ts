import { exec } from 'child_process';
import { promisify } from 'util';
import type { ProcessInfo, ConnectionInfo, RemoteIPGroup, NetworkAnalysisData } from '../../shared/common-types';

const execAsync = promisify(exec);

export class NetworkMonitor {
  private processFilters: string[];

  constructor(filters: string[] = ['GameView', 'GameViewer', 'proxy']) {
    this.processFilters = filters;
  }

  setFilters(filters: string[]): void {
    this.processFilters = filters;
  }

  async analyze(): Promise<NetworkAnalysisData> {
    const processes = await this.getTargetProcesses();
    const connections = await this.getConnections(processes);

    const remoteIPGroups = this.groupConnectionsByIP(connections);

    return {
      analysisTime: new Date().toISOString(),
      processes,
      connections,
      remoteIPGroups,
    };
  }

  private async getTargetProcesses(): Promise<ProcessInfo[]> {
    /* 获取进程列表 */
    const { stdout } = await execAsync('tasklist /fo csv /nh');
    const lines = stdout.trim().split('\n');
    const processes: ProcessInfo[] = [];

    for (const line of lines) {
      const parts = line.split(',').map((p) => p.replace(/"/g, '').trim());
      
      /* 过滤无效行 */
      if (parts.length < 5) continue;

      const name = parts[0];
      
      /* 检查是否匹配过滤器 */
      if (!this.processFilters.some((filter) => name.toLowerCase().includes(filter.toLowerCase()))) {
        continue;
      }

      const pid = parseInt(parts[1], 10);
      const memUsage = parts[4];
      const memoryMB = this.parseMemoryString(memUsage);

      processes.push({
        pid,
        name,
        cpu: 0,
        memory: memoryMB,
        totalConnections: 0,
        establishedConnections: 0,
      });
    }

    return processes;
  }

  private async getConnections(processes: ProcessInfo[]): Promise<ConnectionInfo[]> {
    const pids = processes.map((p) => p.pid);
    const connections: ConnectionInfo[] = [];

    try {
      /* 获取网络连接 */
      const { stdout } = await execAsync('netstat -ano');
      const lines = stdout.trim().split('\n');

      for (const line of lines) {
        /* 仅处理 ESTABLISHED 连接 */
        if (!line.includes('ESTABLISHED')) continue;

        const parts = line.trim().split(/\s+/);
        /* 过滤无效行 */
        if (parts.length < 5) continue;

        const pid = parseInt(parts[parts.length - 1], 10);

        /* 仅处理目标进程 */
        if (!pids.includes(pid)) continue;

        const process = processes.find((p) => p.pid === pid);
        /* 再次确认进程存在 */
        if (!process) continue;

        const [localIp, localPort] = parts[1].split(':');
        const [remoteIp, remotePort] = parts[2].split(':');

        connections.push({
          processId: pid,
          processName: process.name,
          localAddress: localIp,
          localPort: parseInt(localPort, 10),
          remoteAddress: remoteIp,
          remotePort: parseInt(remotePort, 10),
          state: parts[3],
        });

        process.totalConnections++;
        process.establishedConnections++;
      }
    } catch (error) {
      /* 忽略错误，返回空列表或部分结果 */
      console.error('Error getting connections:', error);
    }

    return connections;
  }

  private groupConnectionsByIP(connections: ConnectionInfo[]): RemoteIPGroup[] {
    const groups = new Map<string, { count: number; ports: Set<number> }>();

    for (const conn of connections) {
      if (!groups.has(conn.remoteAddress)) {
        groups.set(conn.remoteAddress, { count: 0, ports: new Set() });
      }
      const group = groups.get(conn.remoteAddress)!;
      group.count++;
      group.ports.add(conn.remotePort);
    }

    return Array.from(groups.entries())
      .map(([ip, data]) => ({
        ip,
        count: data.count,
        ports: Array.from(data.ports).sort((a, b) => a - b),
      }))
      .sort((a, b) => b.count - a.count);
  }

  private parseMemoryString(memStr: string): number {
    const match = memStr.match(/([\d,]+)\s*K/i);
    /* 无法解析时返回 0 */
    if (!match) return 0;
    
    const value = parseInt(match[1].replace(/,/g, ''), 10);
    return Math.round((value / 1024) * 100) / 100;
  }
}
