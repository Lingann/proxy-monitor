import { t } from '../../../utils/i18n-helper.js';
import { Column, SortState } from './common-table-types.js';

interface HeaderEvents {
  onSort: (key: string) => void;
  onFilter: (key: string, value: string) => void;
  onColumnReorder: (fromIndex: number, toIndex: number) => void;
}

export class CommonTableHeader<T> {
  private element: HTMLTableSectionElement;
  private events: HeaderEvents;
  private draggedColIndex: number | null = null;
  private draggable: boolean;

  constructor(events: HeaderEvents, draggable: boolean = true) {
    this.element = document.createElement('thead');
    this.element.className = 'common-table__header';
    this.events = events;
    this.draggable = draggable;
  }

  public getElement(): HTMLTableSectionElement {
    return this.element;
  }

  public render(columns: Column<T>[], sortState: SortState, filters: Record<string, string>) {
    this.element.innerHTML = '';
    const tr = document.createElement('tr');
    tr.className = 'common-table__header-row';

    columns.forEach((col, index) => {
      const th = document.createElement('th');
      th.className = 'common-table__th';
      if (col.width) th.style.width = col.width;

      // Drag & Drop
      if (this.draggable) {
        th.draggable = true;
        th.classList.add('common-table__th--draggable');
        this.setupDragEvents(th, index);
      }

      // Content Container
      const content = document.createElement('div');
      content.className = 'common-table__th-content';

      // Title & Sort
      const titleWrapper = document.createElement('div');
      titleWrapper.className = 'common-table__th-title';
      
      const titleText = document.createElement('span');
      titleText.textContent = t(col.title);
      titleWrapper.appendChild(titleText);

      if (col.sortable) {
        th.classList.add('common-table__th--sortable');
        titleWrapper.onclick = (e) => {
           // Prevent bubble if clicking filter
           if ((e.target as HTMLElement).tagName === 'INPUT') return;
           this.events.onSort(col.key);
        };
        
        if (sortState.key === col.key) {
           const icon = document.createElement('span');
           icon.className = 'common-table__sort-icon';
           icon.textContent = sortState.direction === 'asc' ? '↑' : '↓';
           titleWrapper.appendChild(icon);
        }
      }
      content.appendChild(titleWrapper);

      // Filter
      if (col.filterable) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'common-table__filter-input';
        input.placeholder = '...';
        input.onclick = (e) => e.stopPropagation();
        input.oninput = (e) => {
          this.events.onFilter(col.key, (e.target as HTMLInputElement).value);
        };
        if (filters[col.key]) {
          input.value = filters[col.key];
        }
        content.appendChild(input);
      }

      th.appendChild(content);
      tr.appendChild(th);
    });

    this.element.appendChild(tr);
  }

  private setupDragEvents(th: HTMLElement, index: number) {
    th.addEventListener('dragstart', (e) => {
      this.draggedColIndex = index;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
      }
      th.classList.add('common-table__th--dragging');
    });

    th.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
    });

    th.addEventListener('drop', (e) => {
      e.stopPropagation();
      th.classList.remove('common-table__th--dragging');
      if (this.draggedColIndex !== null && this.draggedColIndex !== index) {
        this.events.onColumnReorder(this.draggedColIndex, index);
      }
      this.draggedColIndex = null;
    });

    th.addEventListener('dragend', () => {
      th.classList.remove('common-table__th--dragging');
    });
  }
}
