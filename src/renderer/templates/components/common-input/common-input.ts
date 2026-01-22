import { InputConfig, InputState } from './common-input-types.js';
import { 
  createContainer, 
  createInputWrapper, 
  createInputElement, 
  createIcon, 
  createClearButton, 
  createErrorElement 
} from './common-input-render.js';
import { isEmpty } from './common-input-utils.js';

export class CommonInput {
  private config: InputConfig;
  private state: InputState;
  
  private container!: HTMLElement;
  private wrapper!: HTMLElement;
  private input!: HTMLInputElement;
  private clearButton: HTMLElement | null = null;
  private errorElement!: HTMLElement;

  constructor(config: InputConfig) {
    this.config = {
      size: 'medium',
      type: 'text',
      validateTrigger: 'blur',
      ...config
    };

    this.state = {
      value: config.defaultValue || '',
      isValid: true,
      isFocused: false
    };

    this.init();
  }

  private init(): void {
    // 1. Create Elements
    this.container = createContainer(this.config);
    this.wrapper = createInputWrapper();
    this.input = createInputElement(this.config);
    this.errorElement = createErrorElement();

    // 2. Assemble DOM
    
    // Prefix Icon
    if (this.config.prefixIcon) {
      this.wrapper.appendChild(createIcon(this.config.prefixIcon, 'prefix'));
    }

    // Input
    this.wrapper.appendChild(this.input);

    // Clear Button
    if (this.config.clearable) {
      this.clearButton = createClearButton();
      this.wrapper.appendChild(this.clearButton);
      this.updateClearButtonVisibility();
    }

    // Suffix Icon
    if (this.config.suffixIcon) {
      this.wrapper.appendChild(createIcon(this.config.suffixIcon, 'suffix'));
    }

    this.container.appendChild(this.wrapper);
    this.container.appendChild(this.errorElement);

    // 3. Mount to container
    if (this.config.container) {
      this.config.container.appendChild(this.container);
    }

    // 4. Bind Events
    this.bindEvents();
  }

  private bindEvents(): void {
    // Input Event
    this.input.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      this.state.value = value;
      
      this.updateClearButtonVisibility();
      
      if (this.config.onChange) {
        this.config.onChange(value);
      }

      if (this.config.validateTrigger === 'change') {
        this.validate();
      }
    });

    // Focus Event
    this.input.addEventListener('focus', (e) => {
      this.state.isFocused = true;
      this.container.classList.add('is-focused');
      
      if (this.config.onFocus) {
        this.config.onFocus(e);
      }
    });

    // Blur Event
    this.input.addEventListener('blur', (e) => {
      this.state.isFocused = false;
      this.container.classList.remove('is-focused');
      
      if (this.config.onBlur) {
        this.config.onBlur(e);
      }

      if (this.config.validateTrigger === 'blur') {
        this.validate();
      }
    });

    // Keydown Event (Enter)
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (this.config.onEnter) {
          this.config.onEnter(this.state.value);
        }
      }
    });

    // Clear Button Click
    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        this.clear();
        this.input.focus();
      });
    }
  }

  private updateClearButtonVisibility(): void {
    if (!this.clearButton) return;

    if (!isEmpty(this.state.value) && !this.config.disabled) {
      this.clearButton.style.display = 'flex';
      this.container.classList.add('has-value');
    } else {
      this.clearButton.style.display = 'none';
      this.container.classList.remove('has-value');
    }
  }

  // Public Methods

  public setValue(value: string): void {
    this.state.value = value;
    this.input.value = value;
    this.updateClearButtonVisibility();
  }

  public getValue(): string {
    return this.state.value;
  }

  public clear(): void {
    this.setValue('');
    if (this.config.onChange) {
      this.config.onChange('');
    }
  }

  public setDisabled(disabled: boolean): void {
    this.config.disabled = disabled;
    this.input.disabled = disabled;
    if (disabled) {
      this.container.classList.add('is-disabled');
    } else {
      this.container.classList.remove('is-disabled');
    }
    this.updateClearButtonVisibility();
  }

  public focus(): void {
    this.input.focus();
  }

  public blur(): void {
    this.input.blur();
  }

  public async validate(): Promise<boolean> {
    if (!this.config.validator) {
      return true;
    }

    try {
      const isValid = await this.config.validator(this.state.value);
      this.state.isValid = isValid;

      if (!isValid) {
        this.container.classList.add('is-error');
        if (this.config.errorMessage) {
          this.errorElement.textContent = this.config.errorMessage;
        }
      } else {
        this.container.classList.remove('is-error');
        this.errorElement.textContent = '';
      }

      return isValid;
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }
}
