import { computed } from 'vue';
import { PaginationProps } from '../types';

export function usePaginationState(props: PaginationProps) {
  /* 计算总页数 */
  const totalPages = computed(() => Math.ceil(props.total / props.pageSize) || 1);

  return {
    totalPages
  };
}
