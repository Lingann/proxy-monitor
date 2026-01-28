import { computed } from 'vue';
import { BnPaginationProps } from '../types';

export function useBnPaginationState(props: BnPaginationProps) {
  /* 计算总页数 */
  const totalPages = computed(() => Math.ceil(props.total / props.pageSize) || 1);

  return {
    totalPages
  };
}
