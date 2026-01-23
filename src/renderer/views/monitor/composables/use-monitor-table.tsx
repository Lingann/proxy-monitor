import { ref, computed, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProcessData } from '../types';
import { TableColumn } from '../../../components/common-table/types';
import Icon from '../../../components/icon/icon'; // Assuming Icon component exists

export function useMonitorTable(
    processes: Ref<ProcessData[] | undefined>,
    callbacks: {
        onShowDetails: (pid: number) => void;
        onLimitSpeed: (pid: number) => void;
    }
) {
    const { t } = useI18n();
    const searchQuery = ref('');

    const formatSpeed = (bytesPerSec: number): string => {
        if (!bytesPerSec) return '0 B/s';
        if (bytesPerSec < 1024) return Math.round(bytesPerSec) + ' B/s';
        if (bytesPerSec < 1024 * 1024) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
        return (bytesPerSec / 1024 / 1024).toFixed(1) + ' MB/s';
    };

    const filteredProcesses = computed(() => {
        let data = processes.value || [];
        if (searchQuery.value) {
            const term = searchQuery.value.toLowerCase();
            data = data.filter(p => 
                (p.name && p.name.toLowerCase().includes(term)) || 
                (p.pid && p.pid.toString().includes(term))
            );
        }
        return data;
    });

    const columns = computed<TableColumn<ProcessData>[]>(() => [
        { key: 'pid', title: t('table.pid'), width: '80px', sortable: true },
        { key: 'name', title: t('table.name'), sortable: true },
        { key: 'category', title: t('table.category'), sortable: true, render: (val) => val || t('category.third_party') },
        { key: 'downloadSpeed', title: t('table.download'), sortable: true, render: (val) => formatSpeed(val) },
        { key: 'uploadSpeed', title: t('table.upload'), sortable: true, render: (val) => formatSpeed(val) },
        { key: 'establishedConnections', title: t('table.connections'), render: (_, row) => `${row.establishedConnections} / ${row.totalConnections}` },
        { 
            key: 'actions', 
            title: t('table.actions'), 
            width: '120px',
            render: (_, row) => (
                <div class="action-cell">
                    <button class="btn-icon" onClick={() => callbacks.onShowDetails(row.pid)} title={t('actions.view_details')}>
                         <Icon name="info" size={16} />
                    </button>
                    <button class="btn-icon" onClick={() => callbacks.onLimitSpeed(row.pid)} title={t('actions.limit_speed')}>
                         <Icon name="download" size={16} />
                    </button>
                </div>
            )
        }
    ]);

    return {
        searchQuery,
        filteredProcesses,
        columns
    };
}
