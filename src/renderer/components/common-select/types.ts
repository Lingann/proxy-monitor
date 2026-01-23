
export type SelectSize = 'small' | 'medium' | 'large';

export type ValidateTrigger = 'change' | 'blur' | 'focus';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectValidator {
  trigger?: ValidateTrigger | ValidateTrigger[];
  validate: (value: any) => Promise<ValidationResult>;
}

export interface SelectConfig {
  options?: SelectOption[];
  width?: string | number;
  size?: SelectSize;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  maxItems?: number;
  zIndex?: number;
  validator?: SelectValidator;
}

export interface CommonSelectProps {
  modelValue: string | number | null;
  config?: SelectConfig;
}
