import { SelectOption } from './common-select-types.js';

export function createContainer(width?: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'common-select';
  if (width) {
    container.style.width = width;
  }
  return container;
}

export function createTrigger(placeholder: string = 'Please select'): HTMLElement {
  const trigger = document.createElement('div');
  trigger.className = 'common-select__trigger';
  trigger.tabIndex = 0; // Make focusable
  
  const text = document.createElement('span');
  text.className = 'common-select__value';
  text.textContent = placeholder;
  text.classList.add('is-placeholder');
  
  const icon = document.createElement('span');
  icon.className = 'common-select__arrow';
  // Simple CSS arrow will be styled
  
  trigger.appendChild(text);
  trigger.appendChild(icon);
  return trigger;
}

export function createDropdown(maxItems: number = 5): HTMLElement {
  const dropdown = document.createElement('div');
  dropdown.className = 'common-select__dropdown';
  // We will handle max-height via CSS variable or JS logic later, 
  // but setting a variable here helps if we want dynamic item counts.
  // Assuming default item height is ~32px or 40px.
  // Let's rely on CSS --max-display-items variable.
  dropdown.style.setProperty('--max-display-items', String(maxItems));
  return dropdown;
}

export function createOption(option: SelectOption, isSelected: boolean): HTMLElement {
  const item = document.createElement('div');
  item.className = `common-select__option ${isSelected ? 'is-selected' : ''} ${option.disabled ? 'is-disabled' : ''}`;
  item.textContent = option.label;
  item.dataset.value = String(option.value);
  if (option.disabled) {
    item.setAttribute('disabled', 'true'); // For selector convenience
  }
  return item;
}

export function createErrorElement(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'common-select__error';
  el.style.display = 'none';
  return el;
}
