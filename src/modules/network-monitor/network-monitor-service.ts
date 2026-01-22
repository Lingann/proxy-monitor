import * as path from 'path';
import { fileURLToPath } from 'url';
import type { NetworkAnalysisData } from '../../shared/common-types.js';
import { ProcessManagerService } from '../../core/process-manager-service.js';
import { DatabaseService } from '../../core/database-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NetworkMonitor {
  private lastData: NetworkAnalysisData | null = null;
  private workerId = 'network-monitor-worker';

  constructor(filters: string[] = []) {
    this.initWorker(filters);
  }

  private initWorker(filters: string[]): void {
    const pm = ProcessManagerService.getInstance();
    const db = DatabaseService.getInstance();
    
    // In dev, the worker is .ts. In prod, it's .js.
    // Electron runs the compiled .js in dist.
    const workerPath = path.join(__dirname, 'network-monitor.worker.js');

    pm.onMessage(this.workerId, (message) => {
      if (message.type === 'TRAFFIC_UPDATE') {
        const data: NetworkAnalysisData = message.data;
        this.lastData = data;
        
        // Update database
        const today = new Date().toISOString().split('T')[0];
        
        // 1. Global daily stats (convert bps to bytes for daily total - approx)
        // Since we poll every 1s, rx_sec is roughly bytes added this second.
        db.updateGlobalDailyStats(today, data.globalStats.downloadSpeed, data.globalStats.uploadSpeed);
        
        // 2. Process daily stats
        const processStats = data.processes.map(p => ({
            name: p.name,
            rx: p.downloadSpeed,
            tx: p.uploadSpeed
        }));
        db.updateProcessDailyStats(today, processStats);
        
        // 3. Recent traffic (10 mins)
        db.addRecentTraffic(data.globalStats.downloadSpeed, data.globalStats.uploadSpeed);
      }
    });

    pm.startProcess(this.workerId, workerPath);
    pm.sendMessage(this.workerId, { type: 'SET_FILTERS', filters });
    pm.sendMessage(this.workerId, { type: 'START' });
  }

  setFilters(filters: string[]): void {
    const pm = ProcessManagerService.getInstance();
    pm.sendMessage(this.workerId, { type: 'SET_FILTERS', filters });
  }

  /**
   * Non-blocking analyze - returns the latest data cached from the worker
   */
  async analyze(): Promise<NetworkAnalysisData> {
    if (!this.lastData) {
        // Return a skeleton if no data yet
        return {
            analysisTime: new Date().toISOString(),
            processes: [],
            connections: [],
            remoteIPGroups: [],
            globalStats: {
                uploadSpeed: 0,
                downloadSpeed: 0,
                interfaces: []
            }
        };
    }
    return this.lastData;
  }
  
  /**
   * Get 10-minute traffic history for charts
   */
  async getRecentTrafficHistory() {
      const db = DatabaseService.getInstance();
      return db.getRecentTraffic();
  }

  stop(): void {
    const pm = ProcessManagerService.getInstance();
    pm.stopProcess(this.workerId);
  }
}
