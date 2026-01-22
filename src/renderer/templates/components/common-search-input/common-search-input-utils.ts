import { SearchInputOption } from './common-search-input-types.js';

// Declare Fuse globally as we expect it to be loaded via <script>
declare global {
  interface Window {
    Fuse: any;
  }
}

export class FuseWrapper {
  private fuse: any;
  private options: any;

  constructor(data: SearchInputOption[], options: any = {}) {
    if (!window.Fuse) {
      console.warn('Fuse.js is not loaded. Search will fallback to simple includes.');
    } else {
      const defaultOptions = {
        keys: ['label'],
        threshold: 0.3,
        ...options
      };
      this.fuse = new window.Fuse(data, defaultOptions);
    }
    this.options = options;
  }

  public search(query: string): SearchInputOption[] {
    if (!query || !query.trim()) {
      return [];
    }
    
    if (this.fuse) {
      return this.fuse.search(query).map((result: any) => result.item);
    } else {
      // Fallback
      const lowerQuery = query.toLowerCase();
      // @ts-ignore
      return this.fuse.input.filter(item => item.label.toLowerCase().includes(lowerQuery));
    }
  }

  public setCollection(data: SearchInputOption[]) {
    if (this.fuse) {
      this.fuse.setCollection(data);
    }
  }
}

export function debounce(func: Function, wait: number) {
  let timeout: any;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function calculateDropdownPosition(
  triggerRect: DOMRect,
  dropdownHeight: number,
  viewportHeight: number
): 'top' | 'bottom' {
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  
  // Prefer bottom if it fits, or if it fits better than top
  if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
    return 'bottom';
  }
  return 'top';
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  
  // Simple highlight logic (case insensitive)
  // Note: For advanced Fuse highlighting, we would need matches from Fuse result
  // This is a basic implementation for the requirement "highlight content"
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="common-search-input__highlight">$1</span>');
}
