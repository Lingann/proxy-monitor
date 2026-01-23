export interface TableColumn<T = any> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any;
}

export interface TablePagination {
  enable: boolean;
  pageSize: number;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data?: T[];
  loading?: boolean;
  pagination?: Partial<TablePagination>;
  height?: string;
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading: boolean;
  pagination: TablePagination;
  height: string;
}

export type SortDirection = 'asc' | 'desc';
