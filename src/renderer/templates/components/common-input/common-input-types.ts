export type InputSize = 'small' | 'medium' | 'large';

export type ValidateTrigger = 'change' | 'blur' | 'focus';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface InputValidator {
  trigger?: ValidateTrigger | ValidateTrigger[];
  validate: (value: string) => ValidationResult | Promise<ValidationResult>;
}

export interface InputConfig {
  /**
   * Container element to mount the component
   */
  container?: HTMLElement;
  
  /**
   * Input size
   * @default 'medium'
   */
  size?: InputSize;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
  
  /**
   * Initial value
   */
  defaultValue?: string;
  
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to show a clear button when input has value
   * @default false
   */
  clearable?: boolean;

  /**
   * Maximum length of input
   */
  maxLength?: number;

  /**
   * Whether to trim whitespace on blur
   * @default false
   */
  trim?: boolean;
  
  /**
   * Custom prefix icon (HTML string)
   */
  prefixIcon?: string;
  
  /**
   * Custom suffix icon (HTML string)
   */
  suffixIcon?: string;
  
  /**
   * Validator configuration
   */
  validator?: InputValidator;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Callback when input is focused
   */
  onFocus?: (e: FocusEvent) => void;
  
  /**
   * Callback when input is blurred
   */
  onBlur?: (e: FocusEvent) => void;
  
  /**
   * Callback when Enter key is pressed
   */
  onEnter?: (value: string) => void;
}

export interface InputState {
  value: string;
  isValid: boolean;
  isFocused: boolean;
  errorMessage?: string;
}
