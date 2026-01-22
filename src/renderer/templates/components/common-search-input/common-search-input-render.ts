import { SearchInputOption } from './common-search-input-types.js';
import { highlightText } from './common-search-input-utils.js';

const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  clear: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
};

export function createContainer(width?: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'common-search-input';
  if (width) {
    container.style.width = width;
  }
  return container;
}

export function createInputWrapper(placeholder: string, prefixIcon?: string): { 
  wrapper: HTMLElement, 
  input: HTMLInputElement, 
  prefixEl: HTMLElement, 
  clearEl: HTMLElement 
} {
  const wrapper = document.createElement('div');
  wrapper.className = 'common-search-input__wrapper';
  
  // Prefix Icon
  const prefixEl = document.createElement('div');
  prefixEl.className = 'common-search-input__prefix';
  prefixEl.innerHTML = prefixIcon || ICONS.search;
  
  // Input
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'common-search-input__field';
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  
  // Clear Icon
  const clearEl = document.createElement('div');
  clearEl.className = 'common-search-input__clear';
  clearEl.innerHTML = ICONS.clear;
  clearEl.style.display = 'none'; // Hidden by default
  
  wrapper.appendChild(prefixEl);
  wrapper.appendChild(input);
  wrapper.appendChild(clearEl);
  
  return { wrapper, input, prefixEl, clearEl };
}

export function createDropdown(maxItems: number): HTMLElement {
  const dropdown = document.createElement('div');
  dropdown.className = 'common-search-input__dropdown';
  // We'll set max-height via CSS variable or style based on item height
  // but CSS is cleaner. The variable --max-display-items is used in common-select.
  // We can reuse that convention.
  if (maxItems) {
    dropdown.style.setProperty('--max-display-items', String(maxItems));
  }
  return dropdown;
}

export function createOption(option: SearchInputOption, query: string, isActive: boolean = false): HTMLElement {
  const el = document.createElement('div');
  el.className = 'common-search-input__option';
  if (option.disabled) el.classList.add('is-disabled');
  if (isActive) el.classList.add('is-active');
  
  el.dataset.value = String(option.value);
  
  // Highlight content
  const content = highlightText(option.label, query);
  el.innerHTML = content;
  
  return el;
}

export function createNoResults(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'common-search-input__empty';
  el.textContent = 'No results found';
  return el;
}
