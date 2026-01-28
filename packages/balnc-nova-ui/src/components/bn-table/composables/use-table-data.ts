import { computed, Ref } from 'vue';
import { TableConfig, SortDirection } from '../types';

export function useTableData(
  mergedConfig: Ref<TableConfig>,
  sortKey: Ref<string | null>,
  sortDirection: Ref<SortDirection>,
  currentPage: Ref<number>,
  pageSize: Ref<number>
) {
  const processedData = computed(() => {
    let res = [...mergedConfig.value.data];
    
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
    if (!mergedConfig.value.pagination.enable) return processedData.value;
    const start = (currentPage.value - 1) * pageSize.value;
    return processedData.value.slice(start, start + pageSize.value);
  });

  return {
    processedData,
    paginatedData
  };
}
