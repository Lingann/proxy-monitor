import { t } from '../../../utils/i18n-helper.js';
import { Column } from './common-table-types.js';
import { EMPTY_STATE_ICON } from '../common-icons/index.js';

export class CommonTableBody<T> {
  private element: HTMLTableSectionElement;
  private onRowClick?: (row: T) => void;

  constructor(onRowClick?: (row: T) => void) {
    this.element = document.createElement('tbody');
    this.element.className = 'common-table__body';
    this.onRowClick = onRowClick;
  }

  public getElement(): HTMLTableSectionElement {
    return this.element;
  }

  public render(data: T[], columns: Column<T>[], loading: boolean = false) {
    this.element.innerHTML = '';

    if (loading) {
        this.renderSkeleton(columns.length);
        return;
    }

    if (data.length === 0) {
      this.renderEmpty(columns.length);
      return;
    }

    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = 'common-table__row';
      
      if (this.onRowClick) {
        tr.classList.add('common-table__row--clickable');
        tr.onclick = () => this.onRowClick!(row);
      }

      columns.forEach(col => {
        const td = document.createElement('td');
        td.className = 'common-table__cell';
        
        const value = (row as any)[col.key];
        
        if (col.render) {
          const content = col.render(value, row);
          if (typeof content === 'string') {
            td.innerHTML = content;
          } else {
            td.appendChild(content);
          }
        } else {
          td.textContent = value !== undefined && value !== null ? String(value) : '-';
          td.title = td.textContent; // Tooltip
        }
        
        tr.appendChild(td);
      });
      
      this.element.appendChild(tr);
    });
  }

  private renderEmpty(colSpan: number) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = colSpan;
    td.className = 'common-table__empty';
    
    const content = document.createElement('div');
    content.className = 'common-table__empty-content';
    
    // Simple Empty State SVG
    const svg = EMPTY_STATE_ICON;
    
    const icon = document.createElement('div');
    icon.className = 'common-table__empty-icon';
    icon.innerHTML = svg;
    
    const text = document.createElement('div');
    text.className = 'common-table__empty-text';
    text.textContent = t('common.no_data') || 'No Data';
    
    content.appendChild(icon);
    content.appendChild(text);
    td.appendChild(content);
    
    tr.appendChild(td);
    this.element.appendChild(tr);
  }

  private renderSkeleton(colSpan: number) {
      // Render 5 skeleton rows
      for(let i=0; i<5; i++) {
          const tr = document.createElement('tr');
          tr.className = 'common-table__row common-table__row--skeleton';
          for(let j=0; j<colSpan; j++) {
             const td = document.createElement('td');
             td.className = 'common-table__cell';
             const skeleton = document.createElement('div');
             skeleton.className = 'common-table__skeleton-bar';
             td.appendChild(skeleton);
             tr.appendChild(td);
          }
          this.element.appendChild(tr);
      }
  }
}
