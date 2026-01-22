import { t } from '../../../utils/i18n-helper.js';
import { Column } from './common-table-types.js';

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
    const svg = `
    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
        <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
        <g fill-rule="nonzero" stroke="#D9D9D9">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
          <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"></path>
        </g>
      </g>
    </svg>
    `;
    
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
