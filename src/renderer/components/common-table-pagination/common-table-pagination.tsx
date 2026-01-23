import { defineComponent, PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import CommonSelect from '../common-select/common-select';
import './common-table-pagination.scss';

export default defineComponent({
  name: 'CommonTablePagination',
  props: {
    total: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    pageSizeOptions: { type: Array as PropType<number[]>, default: () => [10, 20, 50, 100] },
    onUpdateCurrentPage: Function as PropType<(val: number) => void>,
    onUpdatePageSize: Function as PropType<(val: number) => void>,
    onChange: Function as PropType<(page: number, size: number) => void>
  },
  setup(props) {
    const { t } = useI18n();
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize) || 1);
    
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages.value) return;
        props.onUpdateCurrentPage?.(page);
        props.onChange?.(page, props.pageSize);
    };

    const handleSizeChange = (val: any) => {
        const size = Number(val);
        props.onUpdatePageSize?.(size);
        props.onChange?.(1, size); // Reset to page 1
    };

    return () => (
      <div class="common-table-pagination">
         <div class="common-table-pagination__total">
            {t('common.total')} {props.total}
         </div>
         <div class="common-table-pagination__size">
             <CommonSelect 
               config={{
                   options: props.pageSizeOptions.map(s => ({ label: `${s} / ${t('common.page') || 'page'}`, value: s })),
                   size: 'small',
                   width: 120,
                   clearable: false
               }}
               modelValue={props.pageSize}
               onChange={(val) => handleSizeChange(val)}
             />
         </div>
         <div class="common-table-pagination__pages">
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
