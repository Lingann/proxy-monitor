import { computed } from 'vue';
import { TableProps, TableConfig } from '../types';

export function useTableConfig(props: TableProps) {
  const mergedConfig = computed<TableConfig>(() => ({
    columns: props.columns || [],
    data: props.data || [],
    loading: props.loading ?? false,
    pagination: {
      enable: true,
      pageSize: 10,
      ...props.pagination
    },
    height: props.height || 'auto'
  }));

  return {
    mergedConfig
  };
}
