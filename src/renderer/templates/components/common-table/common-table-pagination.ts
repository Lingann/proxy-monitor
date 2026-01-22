import { PaginationOptions } from './common-table-types.js';
import { CommonSelect } from '../common-select/index.js';

export class CommonTablePagination {
  private element: HTMLElement;
  private controlsWrapper: HTMLElement;
  private pageSizeWrapper: HTMLElement;
  private onPageChange: (page: number) => void;
  private onPageSizeChange?: (pageSize: number) => void;
  private pageSizeSelect?: CommonSelect;

  constructor(
    onPageChange: (page: number) => void,
    onPageSizeChange?: (pageSize: number) => void
  ) {
    this.element = document.createElement('div');
    this.element.className = 'common-table-pagination';
    
    // Initialize containers
    this.controlsWrapper = document.createElement('div');
    this.controlsWrapper.className = 'common-table-pagination__controls';
    
    this.pageSizeWrapper = document.createElement('div');
    
    // Set layout: Right aligned
    this.element.style.justifyContent = 'flex-end';
    this.element.style.gap = '12px';
    
    this.element.appendChild(this.controlsWrapper);
    this.element.appendChild(this.pageSizeWrapper);

    this.onPageChange = onPageChange;
    this.onPageSizeChange = onPageSizeChange;
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public render(options: PaginationOptions, total: number, currentPage: number) {
    if (!options.enable) {
      this.element.style.display = 'none';
      return;
    }
    
    this.element.style.display = 'flex';
    
    // Clear and rebuild controls only
    this.controlsWrapper.innerHTML = '';
    
    const pageSize = options.pageSize;
    const totalPages = Math.ceil(total / pageSize);

    // Prev
    const prevBtn = this.createButton(
      '<svg width="12" height="12" viewBox="0 0 1024 1024"><path d="M724 218.3V151c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 335.1c5.3 3.9 12.9 0.4 12.9-6.3v-67.3c0-4.9-2.9-9.6-7.2-12.8L388 512l328.8-380.9c4.3-3.2 7.2-7.9 7.2-12.8z" fill="currentColor"/></svg>', 
      currentPage === 1, 
      () => {
        if (currentPage > 1) this.onPageChange(currentPage - 1);
      }
    );
    this.controlsWrapper.appendChild(prevBtn);

    // Pages
    const pages = this.generatePageNumbers(currentPage, totalPages);
    pages.forEach(page => {
      if (page === '...') {
        const span = document.createElement('span');
        span.className = 'common-table-pagination__ellipsis';
        span.textContent = '...';
        this.controlsWrapper.appendChild(span);
      } else {
        const pageBtn = this.createPageButton(
          Number(page), 
          Number(page) === currentPage,
          () => this.onPageChange(Number(page))
        );
        this.controlsWrapper.appendChild(pageBtn);
      }
    });

    // Next
    const nextBtn = this.createButton(
      '<svg width="12" height="12" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 144.7c-5.3-3.9-12.9-0.4-12.9 6.3v67.3c0 4.9 2.9 9.6 7.2 12.8L636 512l-326.8 380.9c-4.3 3.2-7.2 7.9-7.2 12.8v67.3c0 6.7 7.7 10.4 12.9 6.3l450.8-335.1a31.86 31.86 0 0 0 0-50.3z" fill="currentColor"/></svg>', 
      currentPage >= totalPages || total === 0, 
      () => {
        if (currentPage < totalPages) this.onPageChange(currentPage + 1);
      }
    );
    this.controlsWrapper.appendChild(nextBtn);

    // Page Size Select
    if (!this.pageSizeSelect) {
        this.pageSizeSelect = new CommonSelect(this.pageSizeWrapper, {
            options: [10, 20, 50, 100].map(size => ({
                label: `${size} / page`,
                value: size
            })),
            defaultValue: pageSize,
            width: '120px',
            size: 'medium', // Use medium size (32px) to match buttons
            placeholder: 'Page Size',
            onChange: (val) => {
                const newSize = Number(val);
                 if (this.onPageSizeChange && newSize !== pageSize) {
                    this.onPageSizeChange(newSize);
                }
            }
        });
    } else {
        // Just update value if needed, don't destroy
        if (this.pageSizeSelect.getValue() !== pageSize) {
            this.pageSizeSelect.setValue(pageSize);
        }
    }
  }

  private generatePageNumbers(current: number, total: number): (number | string)[] {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (current > 4) {
      pages.push('...');
    }

    let start = Math.max(2, current - 2);
    let end = Math.min(total - 1, current + 2);

    if (current <= 4) {
      end = 5;
    }
    if (current >= total - 3) {
      start = total - 4;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push('...');
    }

    pages.push(total);
    return pages;
  }

  private createButton(html: string, disabled: boolean, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'common-table-pagination__btn';
    btn.innerHTML = html;
    btn.disabled = disabled;
    btn.onclick = onClick;
    return btn;
  }

  private createPageButton(page: number, active: boolean, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = `common-table-pagination__page-btn ${active ? 'active' : ''}`;
    btn.textContent = String(page);
    btn.onclick = onClick;
    return btn;
  }
}
