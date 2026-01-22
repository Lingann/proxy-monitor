import { InputConfig, InputState, ValidateTrigger } from './common-input-types.js';
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
  protected config: InputConfig;
  protected state: InputState;
  
  protected container!: HTMLElement;
  protected wrapper!: HTMLElement;
  protected input!: HTMLInputElement;
  protected clearButton: HTMLElement | null = null;
  protected errorElement!: HTMLElement;

  constructor(config: InputConfig) {
    this.config = {
      size: 'medium',
      type: 'text',
      ...config
    };

    this.state = {
      value: config.defaultValue || '',
      isValid: true,
      isFocused: false
    };

    this.init();
  }

  protected init(): void {
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
    const triggers = this.getValidationTriggers();

    // Input Event
    this.input.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      this.state.value = value;
      
      this.updateClearButtonVisibility();
      
      if (this.config.onChange) {
        this.config.onChange(value);
      }

      if (triggers.includes('change')) {
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

      if (triggers.includes('focus')) {
        this.validate();
      }
    });

    // Blur Event
    this.input.addEventListener('blur', (e) => {
      this.state.isFocused = false;
      this.container.classList.remove('is-focused');
      
      if (this.config.trim) {
        const currentValue = this.input.value;
        const trimmedValue = currentValue.trim();
        
        if (currentValue !== trimmedValue) {
          this.setValue(trimmedValue);
          if (this.config.onChange) {
            this.config.onChange(trimmedValue);
          }
        }
      }

      if (this.config.onBlur) {
        this.config.onBlur(e);
      }

      if (triggers.includes('blur')) {
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

  private getValidationTriggers(): ValidateTrigger[] {
    if (!this.config.validator) {
      return [];
    }
    if (!this.config.validator.trigger) {
      return ['blur']; // Default to blur
    }
    const trigger = this.config.validator.trigger;
    return Array.isArray(trigger) ? trigger : [trigger];
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
      const result = await this.config.validator.validate(this.state.value);
      
      if (!result.isValid) {
        this.setError(result.message || '');
      } else {
        this.clearError();
      }

      return result.isValid;
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }

  public setError(message: string): void {
    this.state.isValid = false;
    this.state.errorMessage = message;
    this.container.classList.add('is-error');
    this.errorElement.textContent = message;
  }

  public clearError(): void {
    this.state.isValid = true;
    this.state.errorMessage = undefined;
    this.container.classList.remove('is-error');
    this.errorElement.textContent = '';
  }
}
