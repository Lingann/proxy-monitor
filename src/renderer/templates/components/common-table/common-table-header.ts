import { t } from '../../../utils/i18n-helper.js';
import { Column, SortState } from './common-table-types.js';
import { SORT_ASC_ICON, SORT_DESC_ICON, SORT_DEFAULT_ICON } from '../common-icons/index.js';

interface HeaderEvents {
  onSort: (key: string) => void;
  onFilter: (key: string, value: string) => void;
  onColumnReorder: (fromIndex: number, toIndex: number) => void;
}

export class CommonTableHeader<T> {
  private element: HTMLTableSectionElement;
  private events: HeaderEvents;

  constructor(events: HeaderEvents) {
    this.element = document.createElement('thead');
    this.element.className = 'common-table__header';
    this.events = events;
  }

  public getElement(): HTMLTableSectionElement {
    return this.element;
  }

  public render(columns: Column<T>[], sortState: SortState, filters: Record<string, string>) {
    this.element.innerHTML = '';
    const tr = document.createElement('tr');
    tr.className = 'common-table__header-row';

    columns.forEach((col) => {
      const th = document.createElement('th');
      th.className = 'common-table__th';
      if (col.width) th.style.width = col.width;

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
        titleWrapper.onclick = () => {
           this.events.onSort(col.key);
        };
        
        // Always show sort icon placeholder or active icon
        const icon = document.createElement('span');
        icon.className = 'common-table__sort-icon';
        
        if (sortState.key === col.key) {
           icon.classList.add('active');
           icon.innerHTML = sortState.direction === 'asc' 
             ? SORT_ASC_ICON // Up
             : SORT_DESC_ICON; // Down
        } else {
           // Default neutral state (double arrow)
           icon.innerHTML = SORT_DEFAULT_ICON;
        }
        titleWrapper.appendChild(icon);
      }
      content.appendChild(titleWrapper);

      th.appendChild(content);

      // Resizer
      this.setupResize(th);

      tr.appendChild(th);
    });

    this.element.appendChild(tr);
  }

  private setupResize(th: HTMLElement) {
    const resizer = document.createElement('div');
    resizer.className = 'common-table__resizer';
    resizer.onclick = (e) => e.stopPropagation(); // Prevent sort
    th.appendChild(resizer);

    let startX = 0;
    let startWidth = 0;

    const onMouseMove = (e: MouseEvent) => {
        const width = startWidth + (e.clientX - startX);
        if (width > 50) {
            th.style.width = `${width}px`;
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        th.classList.remove('common-table__th--resizing');
    };

    resizer.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Prevent sort
        startX = e.clientX;
        startWidth = th.offsetWidth;
        th.classList.add('common-table__th--resizing');
        document.body.style.cursor = 'col-resize';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
  }
}
