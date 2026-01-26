export interface BnTableColumn<T = any> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any;
}

export interface BnTablePagination {
  enable: boolean;
  pageSize: number;
}

export interface BnTableProps<T = any> {
  columns: BnTableColumn<T>[];
  data?: T[];
  loading?: boolean;
  pagination?: Partial<BnTablePagination>;
  height?: string;
}

export interface BnTableConfig<T = any> {
  columns: BnTableColumn<T>[];
  data: T[];
  loading: boolean;
  pagination: BnTablePagination;
  height: string;
}

export type BnTableSortDirection = 'asc' | 'desc';

// 向后兼容的类型别名
export type TableColumn<T = any> = BnTableColumn<T>;
export type TablePagination = BnTablePagination;
export type TableProps<T = any> = BnTableProps<T>;
export type TableConfig<T = any> = BnTableConfig<T>;
export type SortDirection = BnTableSortDirection;
