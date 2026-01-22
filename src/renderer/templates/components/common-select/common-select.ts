import { SelectConfig, SelectOption, SelectState, ValidateTrigger } from './common-select-types.js';
import { findOption, calculateDropdownPosition } from './common-select-utils.js';
import { createContainer, createTrigger, createDropdown, createOption, createErrorElement } from './common-select-render.js';

export class CommonSelect {
  private container: HTMLElement;
  private wrapper: HTMLElement; // The .common-select element
  private trigger: HTMLElement;
  private dropdown: HTMLElement;
  private errorEl: HTMLElement;
  
  private config: SelectConfig;
  private state: SelectState = {
    isOpen: false,
    selectedValue: null,
    isValid: true,
    errorMessage: null
  };
  
  private boundHandleClickOutside: (e: MouseEvent) => void;

  constructor(container: HTMLElement | string, config: SelectConfig) {
    const parent = typeof container === 'string' ? document.getElementById(container) : container;
    if (!parent) throw new Error(`CommonSelect: Container not found`);
    this.container = parent;
    
    this.config = {
      options: [],
      maxItems: 5,
      placeholder: 'Please select',
      ...config
    };

    // Initialize DOM
    this.wrapper = createContainer(this.config.width);
    
    // Apply size class
    const size = this.config.size || 'medium';
    this.wrapper.classList.add(`is-${size}`);

    if (this.config.zIndex) {
      this.wrapper.style.zIndex = String(this.config.zIndex);
    }
    
    this.trigger = createTrigger(this.config.placeholder);
    this.dropdown = createDropdown(this.config.maxItems);
    this.errorEl = createErrorElement();
    
    this.wrapper.appendChild(this.trigger);
    this.wrapper.appendChild(this.dropdown);
    this.wrapper.appendChild(this.errorEl);
    this.container.appendChild(this.wrapper);
    
    // Bind events
    this.boundHandleClickOutside = this.handleClickOutside.bind(this);
    this.bindEvents();
    
    // Initial Render
    this.renderOptions();
    
    // Set default value if provided
    if (this.config.defaultValue !== undefined) {
      this.setValue(this.config.defaultValue, false);
    }

    if (this.config.disabled) {
      this.setDisabled(true);
    }
  }

  private bindEvents() {
    const triggers = this.getValidationTriggers();

    // Trigger click
    this.trigger.addEventListener('click', (e) => {
      if (this.config.disabled) return;
      this.toggle();
    });

    // Keyboard navigation (basic)
    this.trigger.addEventListener('keydown', (e) => {
      if (this.config.disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
    
    // Focus
    this.trigger.addEventListener('focus', (e) => {
      if (this.config.onFocus) {
        this.config.onFocus(e);
      }
      
      if (triggers.includes('focus')) {
        this.validate();
      }
    });
    
    // Blur
    this.trigger.addEventListener('blur', (e) => {
      if (this.config.onBlur) this.config.onBlur(e);
      
      if (triggers.includes('blur')) {
        // Delay validation slightly to check if we just clicked an option
        setTimeout(() => {
            if (!this.state.isOpen) {
                this.validate();
            }
        }, 100);
      }
    });
  }

  private getValidationTriggers(): ValidateTrigger[] {
    if (!this.config.validator) return [];
    if (!this.config.validator.trigger) return ['change']; // Default to change for select
    const trigger = this.config.validator.trigger;
    return Array.isArray(trigger) ? trigger : [trigger];
  }

  private handleClickOutside(e: MouseEvent) {
    if (!this.state.isOpen) return;
    if (!this.wrapper.contains(e.target as Node)) {
      this.close();
    }
  }

  public toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    if (this.state.isOpen || this.config.disabled) return;
    
    this.state.isOpen = true;
    this.wrapper.classList.add('is-open');
    document.addEventListener('click', this.boundHandleClickOutside);
    
    // Calculate position
    const rect = this.trigger.getBoundingClientRect();
    const position = calculateDropdownPosition(rect, this.dropdown.scrollHeight || 200, window.innerHeight);
    
    this.dropdown.classList.remove('is-top', 'is-bottom');
    this.dropdown.classList.add(`is-${position}`);
    
    // Scroll to selected
    if (this.state.selectedValue !== null) {
        const selectedEl = this.dropdown.querySelector(`.common-select__option[data-value="${this.state.selectedValue}"]`);
        if (selectedEl) {
            selectedEl.scrollIntoView({ block: 'nearest' });
        }
    }
  }

  public close() {
    if (!this.state.isOpen) return;
    
    this.state.isOpen = false;
    this.wrapper.classList.remove('is-open');
    document.removeEventListener('click', this.boundHandleClickOutside);
  }

  public setValue(value: string | number | null, emitChange: boolean = true) {
    const option = findOption(this.config.options || [], value);
    
    // Update State
    this.state.selectedValue = value;
    
    // Update UI
    const valueText = this.trigger.querySelector('.common-select__value');
    if (valueText) {
      if (option) {
        valueText.textContent = option.label;
        valueText.classList.remove('is-placeholder');
      } else {
        valueText.textContent = this.config.placeholder || '';
        valueText.classList.add('is-placeholder');
      }
    }
    
    // Update selected class in dropdown
    const options = this.dropdown.querySelectorAll('.common-select__option');
    options.forEach(el => {
      if ((el as HTMLElement).dataset.value === String(value)) {
        el.classList.add('is-selected');
      } else {
        el.classList.remove('is-selected');
      }
    });

    if (emitChange && this.config.onChange) {
      this.config.onChange(value, option);
    }
    
    const triggers = this.getValidationTriggers();
    if (triggers.includes('change')) {
      this.validate();
    }
  }

  public clear() {
    this.setValue(null);
  }

  public getValue(): string | number | null {
    return this.state.selectedValue;
  }

  public setOptions(options: SelectOption[]) {
    this.config.options = options;
    this.renderOptions();
    // Re-set value to refresh label if it exists in new options.
    this.setValue(this.state.selectedValue, false);
  }

  public setDisabled(disabled: boolean) {
    this.config.disabled = disabled;
    if (disabled) {
      this.wrapper.classList.add('is-disabled');
      this.trigger.tabIndex = -1;
      this.close();
    } else {
      this.wrapper.classList.remove('is-disabled');
      this.trigger.tabIndex = 0;
    }
  }

  public async validate(): Promise<boolean> {
    if (!this.config.validator) {
      return true;
    }
    
    try {
      const result = await this.config.validator.validate(this.state.selectedValue);
      this.state.isValid = result.isValid;
      this.state.errorMessage = result.message || null;
      
      if (!result.isValid) {
        this.setError(result.message || '');
      } else {
        this.clearError();
      }
      
      return result.isValid;
    } catch (e) {
      console.error('Validation failed', e);
      return false;
    }
  }

  public setError(message: string) {
    this.state.isValid = false;
    this.state.errorMessage = message;
    this.wrapper.classList.add('is-error');
    this.errorEl.textContent = message;
    this.errorEl.style.display = 'block';
  }

  public clearError() {
    this.state.isValid = true;
    this.state.errorMessage = null;
    this.wrapper.classList.remove('is-error');
    this.errorEl.textContent = '';
    this.errorEl.style.display = 'none';
  }

  private renderOptions() {
    this.dropdown.innerHTML = '';
    if (!this.config.options || this.config.options.length === 0) {
        // Optional: show "No options"
        const noOpt = document.createElement('div');
        noOpt.className = 'common-select__option is-disabled';
        noOpt.textContent = 'No options';
        this.dropdown.appendChild(noOpt);
        return;
    }

    this.config.options.forEach(opt => {
      const el = createOption(opt, opt.value === this.state.selectedValue);
      el.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling to trigger (which might toggle)
        if (opt.disabled) return;
        
        this.setValue(opt.value);
        this.close();
      });
      this.dropdown.appendChild(el);
    });
  }
  
  public destroy() {
    document.removeEventListener('click', this.boundHandleClickOutside);
    this.container.innerHTML = '';
  }
}
