import { ref, Ref, watch } from 'vue';
import { TableConfig, SortDirection } from '../types';

export function useTableState(mergedConfig: Ref<TableConfig>) {
  const currentPage = ref(1);
  const pageSize = ref(mergedConfig.value.pagination.pageSize);
  const sortKey = ref<string | null>(null);
  const sortDirection = ref<SortDirection>('asc');

  // Watch for pageSize changes in config (props)
  watch(() => mergedConfig.value.pagination.pageSize, (val) => {
    if (val) pageSize.value = val;
  });

  return {
    currentPage,
    pageSize,
    sortKey,
    sortDirection
  };
}
