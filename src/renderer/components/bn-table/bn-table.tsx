import { defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowUp, ArrowDown } from 'lucide-vue-next';
import BnPagination from '../bn-pagination/bn-pagination';
import { TableColumn, TablePagination } from './types';
import { useTableConfig } from './composables/use-table-config';
import { useTableState } from './composables/use-table-state';
import { useTableData } from './composables/use-table-data';
import { useTableEvents } from './composables/use-table-events';
import './styles/index.scss';

export default defineComponent({
  name: 'BnTable',
  props: {
    columns: { type: Array as PropType<TableColumn[]>, required: true },
    data: { type: Array as PropType<any[]>, default: () => [] },
    loading: { type: Boolean, default: false },
    pagination: { type: Object as PropType<Partial<TablePagination>>, default: () => ({ enable: true, pageSize: 10 }) },
    height: { type: String, default: 'auto' }
  },
  setup(props) {
    const { t } = useI18n();

    /* 1. Configuration */
    const { mergedConfig } = useTableConfig(props);

    /* 2. State */
    const { 
        currentPage, 
        pageSize, 
        sortKey, 
        sortDirection 
    } = useTableState(mergedConfig);

    /* 3. Data Processing */
    const { 
        processedData, 
        paginatedData 
    } = useTableData(
        mergedConfig, 
        sortKey, 
        sortDirection, 
        currentPage, 
        pageSize
    );

    /* 4. Events */
    const { 
        handleSort, 
        handlePageChange, 
        handlePageSizeChange 
    } = useTableEvents(
        sortKey, 
        sortDirection, 
        currentPage, 
        pageSize
    );

    return () => (
      <div class="bn-table-wrapper" style={{ height: mergedConfig.value.height }}>
         <div class="bn-table-container">
            <table class="bn-table">
                <thead>
                    <tr>
                        {mergedConfig.value.columns.map(col => (
                            <th 
                                style={{ width: col.width }}
                                onClick={() => col.sortable && handleSort(col.key)}
                                class={{ 'is-sortable': col.sortable }}
                            >
                                <div class="bn-table__th-content">
                                    {col.title}
                                    {col.sortable && sortKey.value === col.key && (
                                        <span class="bn-table__sort-icon">
                                            {sortDirection.value === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {mergedConfig.value.loading ? (
                        <tr>
                            <td colspan={mergedConfig.value.columns.length} class="bn-table__loading-cell">{t('common.loading')}</td>
                        </tr>
                    ) : paginatedData.value.length === 0 ? (
                        <tr>
                            <td colspan={mergedConfig.value.columns.length} class="bn-table__empty-cell">{t('table.no_data')}</td>
                        </tr>
                    ) : (
                        paginatedData.value.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {mergedConfig.value.columns.map(col => (
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
         
         {mergedConfig.value.pagination.enable && (
             <BnPagination
                 total={processedData.value.length}
                 currentPage={currentPage.value}
                 pageSize={pageSize.value}
                 onUpdateCurrentPage={handlePageChange}
                 onUpdatePageSize={handlePageSizeChange}
             />
         )}
      </div>
    );
  }
});
