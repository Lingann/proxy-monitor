import { ref, onMounted, onUnmounted } from 'vue';
import { MonitorData, TrafficHistoryItem } from '../types';

export function useMonitorData() {
  const currentData = ref<MonitorData | null>(null);
  const trafficHistory = ref<TrafficHistoryItem[]>([]);
  const isAnalyzing = ref(false);
  const error = ref<string | null>(null);
  let pollInterval: any = null;
  const MAX_HISTORY = 60;

  const updateHistory = (upload: number, download: number, timestamp: Date = new Date()) => {
    trafficHistory.value.push({ time: timestamp, upload, download });
    if (trafficHistory.value.length > MAX_HISTORY) {
      trafficHistory.value.shift();
    }
  };

  const fetchData = async () => {
    try {
      isAnalyzing.value = true;
      const data = await (window as any).electronAPI.analyzeConnections();
      currentData.value = data;

      let totalDownload = 0;
      let totalUpload = 0;
      if (data.globalStats) {
        totalDownload = data.globalStats.downloadSpeed;
        totalUpload = data.globalStats.uploadSpeed;
      } else {
        totalDownload = (data.processes || []).reduce((sum: number, p: any) => sum + (p.downloadSpeed || 0), 0);
        totalUpload = (data.processes || []).reduce((sum: number, p: any) => sum + (p.uploadSpeed || 0), 0);
      }
      updateHistory(totalUpload, totalDownload);
    } catch (e: any) {
      error.value = e.message;
      console.error(e);
    } finally {
      isAnalyzing.value = false;
    }
  };

  const loadHistory = async () => {
    try {
        const history = await (window as any).electronAPI.getRecentTraffic();
        if (history && Array.isArray(history)) {
             history.forEach((h: any) => {
                 trafficHistory.value.push({
                     time: new Date(h.timestamp),
                     upload: h.tx,
                     download: h.rx
                 });
             });
             while (trafficHistory.value.length > MAX_HISTORY) {
                 trafficHistory.value.shift();
             }
        }
    } catch (e) {
        console.error('Failed to load history', e);
    }
  };

  const startPolling = () => {
    fetchData(); // Initial fetch
    if (!pollInterval) {
        pollInterval = setInterval(fetchData, 1000);
    }
  };

  const stopPolling = () => {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
  };

  onMounted(() => {
    loadHistory().then(() => {
        startPolling();
    });
  });

  onUnmounted(() => {
    stopPolling();
  });

  return {
    currentData,
    trafficHistory,
    isAnalyzing,
    error,
    startPolling,
    stopPolling
  };
}
