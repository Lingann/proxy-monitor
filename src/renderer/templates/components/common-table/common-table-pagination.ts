import { PaginationOptions } from './common-table-types.js';

export class CommonTablePagination {
  private element: HTMLElement;
  private onPageChange: (page: number) => void;

  constructor(onPageChange: (page: number) => void) {
    this.element = document.createElement('div');
    this.element.className = 'common-table-pagination';
    this.onPageChange = onPageChange;
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
    this.element.innerHTML = '';
    
    const pageSize = options.pageSize;
    const totalPages = Math.ceil(total / pageSize);
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);

    // Info Text
    const info = document.createElement('span');
    info.className = 'common-table-pagination__info';
    info.textContent = total > 0 
      ? `${start}-${end} / ${total}`
      : '0 / 0';
    this.element.appendChild(info);

    // Controls Wrapper
    const controls = document.createElement('div');
    controls.className = 'common-table-pagination__controls';

    // Previous Button
    const prevBtn = this.createButton('<', currentPage === 1, () => {
      if (currentPage > 1) this.onPageChange(currentPage - 1);
    });
    controls.appendChild(prevBtn);

    // Current Page Indicator
    const current = document.createElement('span');
    current.className = 'common-table-pagination__current';
    current.textContent = String(currentPage);
    controls.appendChild(current);

    // Next Button
    const nextBtn = this.createButton('>', currentPage >= totalPages || total === 0, () => {
      if (currentPage < totalPages) this.onPageChange(currentPage + 1);
    });
    controls.appendChild(nextBtn);

    this.element.appendChild(controls);
  }

  private createButton(text: string, disabled: boolean, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'common-table-pagination__btn';
    btn.textContent = text;
    btn.disabled = disabled;
    btn.onclick = onClick;
    return btn;
  }
}
