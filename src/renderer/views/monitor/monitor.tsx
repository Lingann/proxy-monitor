import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import styles from './monitor.module.scss';
import { useMonitorData } from './composables/use-monitor-data';
import { useMonitorChart } from './composables/use-monitor-chart';
import { useMonitorTable } from './composables/use-monitor-table';
import BnTable from '../../components/bn-table/bn-table';
import CommonSearchInput from '../../components/common-search-input/common-search-input';
import Icon from '../../components/bn-icon/icon';

export default defineComponent({
    name: 'MonitorView',
    setup() {
        const { t } = useI18n();
        const { currentData, trafficHistory, isAnalyzing } = useMonitorData();
        const chartContainer = ref<HTMLElement | null>(null);

        useMonitorChart(chartContainer, trafficHistory);

        const viewMode = ref<'list' | 'details'>('list');
        const selectedPid = ref<number | null>(null);

        const handleShowDetails = (pid: number) => {
            selectedPid.value = pid;
            viewMode.value = 'details';
        };

        const handleLimitSpeed = (pid: number) => {
            alert(t('messages.limit_speed_unavailable', { pid }));
        };

        const handleAddToBypass = async (pid: number) => {
            try {
                const addresses = await window.electronAPI.getProcessAddresses(pid);
                if (addresses.length === 0) {
                    alert(t('messages.no_addresses_found'));
                    return;
                }

                const process = currentData.value?.processes.find((p: any) => p.pid === pid);
                const description = process ? `Process: ${process.name} (PID: ${pid})` : `PID: ${pid}`;

                await window.electronAPI.addAddressesToBypass(addresses, description);
                alert(t('messages.added_to_bypass', { count: addresses.length }));
            } catch (error) {
                console.error('Failed to add addresses to bypass:', error);
                alert(t('messages.add_to_bypass_error'));
            }
        };

        const handleRemoveFromBypass = async (pid: number) => {
            alert(t('messages.remove_from_bypass_unavailable'));
        };

        const { searchQuery, filteredProcesses, columns } = useMonitorTable(
            computed(() => currentData.value?.processes),
            {
                onShowDetails: handleShowDetails,
                onLimitSpeed: handleLimitSpeed,
                onAddToBypass: handleAddToBypass,
                onRemoveFromBypass: handleRemoveFromBypass
            }
        );

        const selectedProcess = computed(() => {
            if (!currentData.value || !selectedPid.value) return null;
            return currentData.value.processes.find((p: any) => p.pid === selectedPid.value);
        });

        const stats = computed(() => {
            const data = currentData.value;
            if (!data) return { processCount: 0, connectionCount: 0, serverCount: 0, totalMemory: 0, upload: 0, download: 0 };
            
            const totalMemory = (data.processes || []).reduce((sum: number, p: any) => sum + p.memory, 0);
            
            let totalDownload = 0;
            let totalUpload = 0;
            if (data.globalStats) {
                totalDownload = data.globalStats.downloadSpeed;
                totalUpload = data.globalStats.uploadSpeed;
            } else {
                totalDownload = (data.processes || []).reduce((sum: number, p: any) => sum + (p.downloadSpeed || 0), 0);
                totalUpload = (data.processes || []).reduce((sum: number, p: any) => sum + (p.uploadSpeed || 0), 0);
            }

            return {
                processCount: (data.processes || []).length,
                connectionCount: (data.connections || []).length,
                serverCount: (data.remoteIPGroups || []).length,
                totalMemory: totalMemory.toFixed(2),
                upload: totalUpload,
                download: totalDownload
            };
        });

        const formatSpeed = (bytesPerSec: number): string => {
            if (!bytesPerSec) return '0 B/s';
            if (bytesPerSec < 1024) return Math.round(bytesPerSec) + ' B/s';
            if (bytesPerSec < 1024 * 1024) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
            return (bytesPerSec / 1024 / 1024).toFixed(1) + ' MB/s';
        };

        return () => (
            <div class={styles.container}>
                {viewMode.value === 'list' ? (
                    <>
                        <div class={styles.dashboardGrid}>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.processes')}</span>
                                <span class={styles.value} id="processCount">{stats.value.processCount}</span>
                            </div>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.connections')}</span>
                                <span class={styles.value} id="connectionCount">{stats.value.connectionCount}</span>
                            </div>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.servers')}</span>
                                <span class={styles.value} id="serverCount">{stats.value.serverCount}</span>
                            </div>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.memory')}</span>
                                <span class={styles.value} id="memoryUsage">{stats.value.totalMemory} MB</span>
                            </div>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.total_upload')}</span>
                                <span class={styles.value} id="totalUploadSpeed" style={{ color: '#d96a6a' }}>
                                    {formatSpeed(stats.value.upload)}
                                </span>
                            </div>
                            <div class={styles.statCard}>
                                <span class={styles.label}>{t('monitor.total_download')}</span>
                                <span class={styles.value} id="totalDownloadSpeed" style={{ color: '#5d9bc9' }}>
                                    {formatSpeed(stats.value.download)}
                                </span>
                            </div>
                        </div>

                        <div class={styles.chartSection}>
                            <h3>{t('monitor.network_traffic')}</h3>
                            <div ref={chartContainer} class={styles.chartContainer}></div>
                        </div>

                        <div class={styles.tableSection}>
                            <div class={styles.header}>
                                <h3>{t('monitor.process_list')}</h3>
                                <div style={{ width: '300px' }}>
                                    <CommonSearchInput 
                                        modelValue={searchQuery.value}
                                        onUpdateModelValue={(v: string | number | null) => searchQuery.value = String(v || '')}
                                        config={{ 
                                            placeholder: t('monitor.search_placeholder') || 'Search PID / Name',
                                            size: 'small'
                                        }}
                                    />
                                </div>
                            </div>
                            <BnTable
                                columns={columns.value}
                                data={filteredProcesses.value}
                                pagination={{ enable: true, pageSize: 10 }}
                                height="calc(100% - 60px)"
                            />
                        </div>
                    </>
                ) : (
                    <div class={styles.detailsContent}>
                        <div class={styles.viewHeader}>
                            <button class="btn-icon" onClick={() => viewMode.value = 'list'}>
                                <Icon name="arrow-left" size={20} />
                            </button>
                            <h2>{selectedProcess.value?.name}</h2>
                        </div>
                        <div class={styles.infoCard}>
                            <h3>{t('actions.view_details')}</h3>
                            <p><strong>PID:</strong> {selectedProcess.value?.pid}</p>
                            <p><strong>Category:</strong> {selectedProcess.value?.category || t('category.third_party')}</p>
                            <p><strong>Memory:</strong> {selectedProcess.value?.memory} MB</p>
                            <p><strong>CPU:</strong> {selectedProcess.value?.cpu?.toFixed(1) || '0'} %</p>
                        </div>
                        {/* 
                          To implement Server and Connection tables here, we would need 
                          to filter currentData based on selectedPid and pass to CommonTable.
                          This can be added as enhancement. 
                        */}
                    </div>
                )}
            </div>
        );
    }
});
