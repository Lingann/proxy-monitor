import { Ref } from 'vue';
import { SortDirection } from '../types';

export function useTableEvents(
  sortKey: Ref<string | null>,
  sortDirection: Ref<SortDirection>,
  currentPage: Ref<number>,
  pageSize: Ref<number>
) {
  const handleSort = (key: string) => {
    if (sortKey.value === key) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortDirection.value = 'asc';
    }
  };

  const handlePageChange = (val: number) => {
    currentPage.value = val;
  };

  const handlePageSizeChange = (val: number) => {
    pageSize.value = val;
  };

  return {
    handleSort,
    handlePageChange,
    handlePageSizeChange
  };
}
