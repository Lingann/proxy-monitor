export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any; // Allow extra props
}

export type ValidateTrigger = 'change' | 'blur' | 'focus';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface SelectValidator {
  trigger?: ValidateTrigger | ValidateTrigger[];
  validate: (value: string | number | null) => ValidationResult | Promise<ValidationResult>;
}

export interface SelectConfig {
  options?: SelectOption[];
  placeholder?: string;
  width?: string; // CSS width string (e.g. "200px", "100%")
  size?: 'small' | 'medium' | 'large'; // Default: 'medium'
  maxItems?: number; // Max items to show before scrolling (default 5 or 6)
  defaultValue?: string | number;
  disabled?: boolean;
  
  /**
   * Validator configuration
   */
  validator?: SelectValidator;
  
  zIndex?: number;
  onChange?: (value: string | number | null, option?: SelectOption) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface SelectState {
  isOpen: boolean;
  selectedValue: string | number | null;
  isValid: boolean;
  errorMessage: string | null;
}
