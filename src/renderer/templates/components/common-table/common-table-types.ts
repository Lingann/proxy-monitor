export interface Column<T> {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => string | HTMLElement;
}

export interface PaginationOptions {
  enable: boolean;
  pageSize: number;
}

export interface TableOptions<T> {
  columns: Column<T>[];
  data?: T[];
  loading?: boolean;
  rowKey?: string;
  draggableColumns?: boolean;
  pagination?: PaginationOptions;
  onRowClick?: (row: T) => void;
  height?: string; // For fixed header/scrollable body
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: string | null;
  direction: SortDirection;
}

export interface TableState<T> {
  data: T[];
  filteredData: T[];
  currentData: T[];
  sort: SortState;
  filters: Record<string, string>;
  page: number;
  loading: boolean;
}

export interface TableEvents<T> {
  onSort: (key: string) => void;
  onFilter: (key: string, value: string) => void;
  onPageChange: (page: number) => void;
  onColumnReorder: (fromIndex: number, toIndex: number) => void;
  onRowClick: (row: T) => void;
}
