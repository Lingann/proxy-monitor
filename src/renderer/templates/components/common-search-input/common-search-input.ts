import { SearchInputConfig, SearchInputOption, SearchInputState } from './common-search-input-types.js';
import { FuseWrapper, debounce, calculateDropdownPosition } from './common-search-input-utils.js';
import { createContainer, createInputWrapper, createDropdown, createOption, createNoResults } from './common-search-input-render.js';

export class CommonSearchInput {
  private container: HTMLElement;
  private wrapper: HTMLElement; // Main container
  private inputWrapper: HTMLElement;
  private input: HTMLInputElement;
  private dropdown: HTMLElement;
  private clearBtn: HTMLElement;
  
  private config: SearchInputConfig;
  private state: SearchInputState = {
    isOpen: false,
    selectedValue: null,
    query: '',
    activeOptionIndex: -1,
    filteredOptions: []
  };
  
  private fuseWrapper: FuseWrapper;
  private boundHandleClickOutside: (e: MouseEvent) => void;

  constructor(container: HTMLElement | string, config: SearchInputConfig) {
    const parent = typeof container === 'string' ? document.getElementById(container) : container;
    if (!parent) throw new Error(`CommonSearchInput: Container not found`);
    this.container = parent;
    
    this.config = {
      width: '100%',
      size: 'medium',
      maxItems: 5,
      searchKeys: ['label'],
      clearable: true,
      enableDropdown: false, // Default to pure input per requirement 3
      ...config
    };
    
    // Auto-enable dropdown if options are provided and not explicitly disabled?
    // User said "Default not show popup... need separate config".
    // So we respect enableDropdown flag. 
    
    this.fuseWrapper = new FuseWrapper(this.config.options || [], this.config.fuseOptions || { keys: this.config.searchKeys });
    
    // Initialize DOM
    this.wrapper = createContainer(this.config.width);
    const size = this.config.size || 'medium';
    this.wrapper.classList.add(`is-${size}`);
    if (this.config.zIndex) {
      this.wrapper.style.zIndex = String(this.config.zIndex);
    }
    
    const inputElements = createInputWrapper(this.config.placeholder || '', this.config.prefixIcon);
    this.inputWrapper = inputElements.wrapper;
    this.input = inputElements.input;
    this.clearBtn = inputElements.clearEl;
    
    this.dropdown = createDropdown(this.config.maxItems || 5);
    
    this.wrapper.appendChild(this.inputWrapper);
    this.wrapper.appendChild(this.dropdown);
    this.container.appendChild(this.wrapper);
    
    this.boundHandleClickOutside = this.handleClickOutside.bind(this);
    
    this.bindEvents();
    
    if (this.config.defaultValue) {
        this.setValue(this.config.defaultValue, false);
    }
    
    if (this.config.disabled) {
        this.setDisabled(true);
    }
  }

  private bindEvents() {
    // Input
    const debouncedSearch = debounce((query: string) => {
      this.handleSearch(query);
    }, 200);

    this.input.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value;
      this.state.query = val;
      this.toggleClearButton(val);
      
      if (this.config.onSearch) {
        this.config.onSearch(val);
      }
      
      if (this.config.enableDropdown) {
        debouncedSearch(val);
      }
    });

    // Focus
    this.input.addEventListener('focus', (e) => {
      this.wrapper.classList.add('is-focused');
      if (this.config.onFocus) this.config.onFocus(e);
      
      if (this.config.enableDropdown && this.state.query) {
        this.open();
      }
    });

    // Blur
    this.input.addEventListener('blur', (e) => {
      this.wrapper.classList.remove('is-focused');
      if (this.config.onBlur) this.config.onBlur(e);
      
      // Delay closing to allow clicking options
      setTimeout(() => {
        if (!this.wrapper.contains(document.activeElement)) {
           this.close();
        }
      }, 200);
    });

    // Keydown
    this.input.addEventListener('keydown', (e) => {
      if (!this.state.isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.highlightOption(this.state.activeOptionIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.highlightOption(this.state.activeOptionIndex - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (this.state.activeOptionIndex >= 0 && this.state.filteredOptions[this.state.activeOptionIndex]) {
            this.selectOption(this.state.filteredOptions[this.state.activeOptionIndex]);
          }
          break;
        case 'Escape':
          this.close();
          break;
      }
    });

    // Clear Button
    this.clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });
  }

  private handleSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed) {
      this.state.filteredOptions = this.config.options || [];
      // Optionally render all options or hide? 
      // Usually search input shows all options if empty?
      // Requirement 8: "Ignore leading/trailing spaces"
    } else {
      this.state.filteredOptions = this.fuseWrapper.search(trimmed);
    }
    
    this.renderOptions();
    if (this.state.filteredOptions.length > 0 || trimmed.length > 0) {
        this.open();
    } else {
        this.close();
    }
  }

  private renderOptions() {
    this.dropdown.innerHTML = '';
    
    if (this.state.filteredOptions.length === 0) {
      this.dropdown.appendChild(createNoResults());
      return;
    }
    
    this.state.filteredOptions.forEach((opt, index) => {
      const el = createOption(opt, this.state.query, index === this.state.activeOptionIndex);
      el.addEventListener('click', () => {
        this.selectOption(opt);
      });
      el.addEventListener('mouseenter', () => {
        this.highlightOption(index);
      });
      this.dropdown.appendChild(el);
    });
  }

  private highlightOption(index: number) {
    if (index < 0) index = 0;
    if (index >= this.state.filteredOptions.length) index = this.state.filteredOptions.length - 1;
    
    this.state.activeOptionIndex = index;
    
    const options = this.dropdown.querySelectorAll('.common-search-input__option');
    options.forEach((el, i) => {
      if (i === index) el.classList.add('is-active');
      else el.classList.remove('is-active');
    });
    
    // Scroll to view
    const activeEl = options[index] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  public selectOption(option: SearchInputOption) {
    this.state.selectedValue = option.value;
    this.input.value = option.label;
    this.state.query = option.label;
    
    this.close();
    this.toggleClearButton(option.label);
    
    if (this.config.onChange) {
      this.config.onChange(option.value, option);
    }
  }

  public setValue(value: string | number, emitChange = true) {
    const option = (this.config.options || []).find(o => o.value === value);
    if (option) {
      this.state.selectedValue = value;
      this.input.value = option.label;
      this.toggleClearButton(option.label);
      if (emitChange && this.config.onChange) {
        this.config.onChange(value, option);
      }
    } else {
      // Just set input value if no option matches (free text?)
      // Assuming value is ID, so if not found, we can't display label easily unless we know it.
      // But maybe value IS the text.
      this.input.value = String(value);
      this.toggleClearButton(String(value));
    }
  }
  
  public getValue() {
    return this.state.selectedValue || this.input.value;
  }

  public clear() {
    this.input.value = '';
    this.state.query = '';
    this.state.selectedValue = null;
    this.toggleClearButton('');
    this.input.focus();
    
    if (this.config.onChange) {
      this.config.onChange(null);
    }
    if (this.config.onSearch) {
      this.config.onSearch('');
    }
    
    if (this.config.enableDropdown) {
        this.handleSearch(''); // Reset options
        // close or keep open with all options?
        // Usually clear closes or shows all.
        // Let's show all if focused.
        this.state.filteredOptions = this.config.options || [];
        this.renderOptions();
    }
  }

  private toggleClearButton(val: string) {
    if (!this.config.clearable) return;
    
    if (val) {
      this.clearBtn.style.display = ''; // Reset to flex (via css hover logic or force show?)
      // CSS says .has-value:hover .clear.
      this.wrapper.classList.add('has-value');
    } else {
      this.wrapper.classList.remove('has-value');
      this.clearBtn.style.display = 'none';
    }
  }

  public open() {
    if (this.state.isOpen || this.config.disabled || !this.config.enableDropdown) return;
    
    this.state.isOpen = true;
    this.wrapper.classList.add('is-open');
    document.addEventListener('click', this.boundHandleClickOutside);
    
    // Position
    const rect = this.wrapper.getBoundingClientRect();
    const pos = calculateDropdownPosition(rect, this.dropdown.scrollHeight || 200, window.innerHeight);
    
    this.dropdown.classList.remove('is-top', 'is-bottom');
    this.dropdown.classList.add(`is-${pos}`);
  }

  public close() {
    if (!this.state.isOpen) return;
    
    this.state.isOpen = false;
    this.wrapper.classList.remove('is-open');
    document.removeEventListener('click', this.boundHandleClickOutside);
  }

  private handleClickOutside(e: MouseEvent) {
    if (!this.state.isOpen) return;
    if (!this.wrapper.contains(e.target as Node)) {
      this.close();
    }
  }
  
  public setDisabled(disabled: boolean) {
    this.config.disabled = disabled;
    this.input.disabled = disabled;
    if (disabled) {
      this.wrapper.classList.add('is-disabled');
    } else {
      this.wrapper.classList.remove('is-disabled');
    }
  }
  
  public updateOptions(options: SearchInputOption[]) {
      this.config.options = options;
      this.fuseWrapper.setCollection(options);
      // Re-run search if open
      if (this.state.isOpen) {
          this.handleSearch(this.state.query);
      }
  }
  
  public destroy() {
    document.removeEventListener('click', this.boundHandleClickOutside);
    this.container.innerHTML = '';
  }
}
