export type InputSize = 'small' | 'medium' | 'large';

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
   * Custom prefix icon (HTML string)
   */
  prefixIcon?: string;
  
  /**
   * Custom suffix icon (HTML string)
   */
  suffixIcon?: string;
  
  /**
   * Validation function
   * Return true if valid, false if invalid
   */
  validator?: (value: string) => boolean | Promise<boolean>;
  
  /**
   * Error message to show when validation fails
   */
  errorMessage?: string;
  
  /**
   * Trigger validation on change or blur
   * @default 'blur'
   */
  validateTrigger?: 'change' | 'blur';
  
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
