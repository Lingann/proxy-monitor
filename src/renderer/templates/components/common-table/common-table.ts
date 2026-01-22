import { TableOptions, Column, SortState } from './common-table-types.js';
import { CommonTableHeader } from './common-table-header.js';
import { CommonTableBody } from './common-table-body.js';
import { CommonTablePagination } from './common-table-pagination.js';
import { filterData, sortData, paginateData } from './common-table-data-processor.js';

export class CommonTable<T> {
  private container: HTMLElement;
  private options: TableOptions<T>;
  
  // State
  private columns: Column<T>[];
  private rawData: T[] = [];
  private sortState: SortState = { key: null, direction: 'asc' };
  private filters: Record<string, string> = {};
  private currentPage: number = 1;
  private loading: boolean = false;

  // Components
  private header: CommonTableHeader<T>;
  private body: CommonTableBody<T>;
  private pagination: CommonTablePagination;
  
  // Elements
  private wrapper!: HTMLElement;
  private tableContainer!: HTMLElement;
  private table!: HTMLTableElement;

  constructor(container: HTMLElement | string, options: TableOptions<T>) {
    if (typeof container === 'string') {
      const el = document.getElementById(container);
      if (!el) throw new Error(`Container #${container} not found`);
      this.container = el;
    } else {
      this.container = container;
    }

    this.options = {
      rowKey: 'id',
      draggableColumns: true,
      ...options,
      pagination: {
        enable: true,
        pageSize: 10,
        ...options.pagination
      }
    };

    this.columns = [...this.options.columns];
    this.rawData = this.options.data || [];
    this.loading = !!this.options.loading;

    // Initialize Components
    this.header = new CommonTableHeader<T>({
      onSort: (key) => this.handleSort(key),
      onFilter: (key, val) => this.handleFilter(key, val),
      onColumnReorder: (from, to) => this.handleColumnReorder(from, to)
    }, this.options.draggableColumns);

    this.body = new CommonTableBody<T>(this.options.onRowClick);
    
    this.pagination = new CommonTablePagination((page) => this.handlePageChange(page));

    this.initStructure();
    this.render();
  }

  private initStructure() {
    this.container.innerHTML = '';
    
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'common-table-wrapper';
    if (this.options.height) {
        this.wrapper.style.height = this.options.height;
    }

    // Table Container (Scrollable)
    this.tableContainer = document.createElement('div');
    this.tableContainer.className = 'common-table-container';

    this.table = document.createElement('table');
    this.table.className = 'common-table';
    
    this.table.appendChild(this.header.getElement());
    this.table.appendChild(this.body.getElement());
    this.tableContainer.appendChild(this.table);

    this.wrapper.appendChild(this.tableContainer);
    this.wrapper.appendChild(this.pagination.getElement());
    
    this.container.appendChild(this.wrapper);
  }

  public setData(data: T[]) {
    this.rawData = data;
    this.currentPage = 1; // Reset to page 1 on new data
    this.render();
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
    this.render();
  }

  private render() {
    // 1. Process Data
    let processed = filterData(this.rawData, this.filters);
    processed = sortData(processed, this.sortState);
    
    const total = processed.length;
    
    // 2. Paginate
    let currentData = processed;
    if (this.options.pagination?.enable) {
      currentData = paginateData(processed, this.currentPage, this.options.pagination.pageSize);
    }

    // 3. Update Components
    this.header.render(this.columns, this.sortState, this.filters);
    this.body.render(currentData, this.columns, this.loading);
    
    if (this.options.pagination) {
        this.pagination.render(this.options.pagination, total, this.currentPage);
    }
  }

  // Handlers

  private handleSort(key: string) {
    if (this.sortState.key === key) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.key = key;
      this.sortState.direction = 'asc';
    }
    this.render();
  }

  private handleFilter(key: string, value: string) {
    if (!value) {
      delete this.filters[key];
    } else {
      this.filters[key] = value;
    }
    this.currentPage = 1;
    this.render();
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.render();
  }

  private handleColumnReorder(fromIndex: number, toIndex: number) {
    const col = this.columns[fromIndex];
    this.columns.splice(fromIndex, 1);
    this.columns.splice(toIndex, 0, col);
    this.render();
  }
}
