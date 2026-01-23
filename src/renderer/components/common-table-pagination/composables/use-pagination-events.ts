import { Ref } from 'vue';
import { PaginationProps } from '../types';

export function usePaginationEvents(
  props: PaginationProps,
  totalPages: Ref<number>
) {
  /* 处理页码改变 */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    props.onUpdateCurrentPage?.(page);
    props.onChange?.(page, props.pageSize);
  };

  /* 处理每页条数改变 */
  const handleSizeChange = (val: any) => {
    const size = Number(val);
    props.onUpdatePageSize?.(size);
    props.onChange?.(1, size); // 重置到第一页
  };

  return {
    handlePageChange,
    handleSizeChange
  };
}
