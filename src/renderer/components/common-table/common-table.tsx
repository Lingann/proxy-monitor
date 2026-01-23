import { defineComponent, PropType, computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowUp, ArrowDown } from 'lucide-vue-next';
import CommonTablePagination from '../common-table-pagination/common-table-pagination';
import './common-table.scss';

export interface Column<T = any> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any; // Return JSX or string
}

export interface TableOptions<T> {
  columns: Column<T>[];
  data?: T[];
  loading?: boolean;
  pagination?: {
      enable: boolean;
      pageSize: number;
  };
  height?: string;
}

export default defineComponent({
  name: 'CommonTable',
  props: {
    columns: { type: Array as PropType<Column[]>, required: true },
    data: { type: Array as PropType<any[]>, default: () => [] },
    loading: { type: Boolean, default: false },
    pagination: { type: Object as PropType<{ enable: boolean; pageSize: number }>, default: () => ({ enable: true, pageSize: 10 }) },
    height: { type: String, default: 'auto' }
  },
  setup(props) {
    const { t } = useI18n();
    const currentPage = ref(1);
    const pageSize = ref(props.pagination.pageSize || 10);
    const sortKey = ref<string | null>(null);
    const sortDirection = ref<'asc' | 'desc'>('asc');

    watch(() => props.pagination.pageSize, (val) => {
        if (val) pageSize.value = val;
    });

    const processedData = computed(() => {
        let res = [...props.data];
        
        // Sort
        if (sortKey.value) {
            res.sort((a, b) => {
                const va = a[sortKey.value!];
                const vb = b[sortKey.value!];
                if (va === vb) return 0;
                const modifier = sortDirection.value === 'asc' ? 1 : -1;
                return va > vb ? modifier : -modifier;
            });
        }
        
        return res;
    });

    const paginatedData = computed(() => {
        if (!props.pagination.enable) return processedData.value;
        const start = (currentPage.value - 1) * pageSize.value;
        return processedData.value.slice(start, start + pageSize.value);
    });

    const handleSort = (key: string) => {
        if (sortKey.value === key) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey.value = key;
            sortDirection.value = 'asc';
        }
    };

    return () => (
      <div class="common-table-wrapper" style={{ height: props.height }}>
         <div class="common-table-container">
            <table class="common-table">
                <thead>
                    <tr>
                        {props.columns.map(col => (
                            <th 
                                style={{ width: col.width }}
                                onClick={() => col.sortable && handleSort(col.key)}
                                class={{ 'is-sortable': col.sortable }}
                            >
                                <div class="th-content">
                                    {col.title}
                                    {col.sortable && sortKey.value === col.key && (
                                        <span class="sort-icon">
                                            {sortDirection.value === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? (
                        <tr>
                            <td colspan={props.columns.length} class="loading-cell">{t('common.loading')}</td>
                        </tr>
                    ) : paginatedData.value.length === 0 ? (
                        <tr>
                            <td colspan={props.columns.length} class="empty-cell">{t('table.no_data')}</td>
                        </tr>
                    ) : (
                        paginatedData.value.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {props.columns.map(col => (
                                    <td>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
         </div>
         
         {props.pagination.enable && (
             <CommonTablePagination 
                 total={processedData.value.length}
                 currentPage={currentPage.value}
                 pageSize={pageSize.value}
                 onUpdateCurrentPage={(val) => currentPage.value = val}
                 onUpdatePageSize={(val) => pageSize.value = val}
             />
         )}
      </div>
    );
  }
});
