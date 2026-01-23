
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
   * Input size
   * @default 'medium'
   */
  size?: InputSize;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
  
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
   * Custom prefix icon (Component or VNode)
   */
  prefixIcon?: any;
  
  /**
   * Custom suffix icon (Component or VNode)
   */
  suffixIcon?: any;
  
  /**
   * Validator configuration
   */
  validator?: InputValidator;
}

export interface CommonInputProps {
  modelValue: string;
  config?: InputConfig;
}
