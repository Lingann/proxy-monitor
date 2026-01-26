import { defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { BnSelect } from '../bn-select';
import { BnPaginationProps } from './types';
import { useBnPaginationState } from './composables/use-bn-pagination-state';
import { useBnPaginationEvents } from './composables/use-bn-pagination-events';
import './bn-pagination.scss';

export default defineComponent({
  name: 'BnPagination',
  props: {
    total: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    pageSizeOptions: { type: Array as PropType<number[]>, default: () => [10, 20, 50, 100] },
    onUpdateCurrentPage: Function as PropType<(val: number) => void>,
    onUpdatePageSize: Function as PropType<(val: number) => void>,
    onChange: Function as PropType<(page: number, size: number) => void>
  },
  setup(props: BnPaginationProps) {
    const { t } = useI18n();

    /* 1. 分页状态 */
    const { totalPages } = useBnPaginationState(props);

    /* 2. 事件处理 */
    const { handlePageChange, handleSizeChange } = useBnPaginationEvents(props, totalPages);

    return () => (
      <div class="bn-pagination">
         <div class="bn-pagination__total">
            {t('common.total')} {props.total}
         </div>
         <div class="bn-pagination__size">
             <BnSelect
               options={(props.pageSizeOptions || [10, 20, 50, 100]).map(s => ({
                 label: `${s} / ${t('common.page') || 'page'}`,
                 value: s
               }))}
               size="small"
               clearable={false}
               modelValue={props.pageSize}
               onChange={(val) => handleSizeChange(val)}
             />
         </div>
         <div class="bn-pagination__pages">
            <button 
                class="btn-icon" 
                disabled={props.currentPage === 1}
                onClick={() => handlePageChange(1)}
            >
                <ChevronsLeft size={16} />
            </button>
            <button 
                class="btn-icon" 
                disabled={props.currentPage === 1}
                onClick={() => handlePageChange(props.currentPage - 1)}
            >
                <ChevronLeft size={16} />
            </button>
            
            <span class="page-info">{props.currentPage} / {totalPages.value}</span>

            <button 
                class="btn-icon" 
                disabled={props.currentPage === totalPages.value}
                onClick={() => handlePageChange(props.currentPage + 1)}
            >
                <ChevronRight size={16} />
            </button>
            <button 
                class="btn-icon" 
                disabled={props.currentPage === totalPages.value}
                onClick={() => handlePageChange(totalPages.value)}
            >
                <ChevronsRight size={16} />
            </button>
         </div>
      </div>
    );
  }
});
