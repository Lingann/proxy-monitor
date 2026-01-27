export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export type ValidationState = 'valid' | 'error' | 'validating' | ''

export type FormTrigger = 'blur' | 'change'

export type FormRuleMessageType =
  | 'required'
  | 'min'
  | 'max'
  | 'len'
  | 'pattern'
  | 'email'
  | 'url'
  | 'number'
  | 'string'
  | 'validator'
  | 'default'

export interface FormItemRule {
  trigger?: FormTrigger | FormTrigger[];
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  len?: number;
  type?: 'email' | 'string' | 'number' | 'url';
  pattern?: RegExp | string;
  validator?: FormItemRuleValidator | LegacyFormItemRuleValidator;
}

export type FormRules = Record<string, FormItemRule | FormItemRule[]>;

export interface ValidatableField {
  prop: string;
  validate: (trigger?: FormTrigger) => Promise<ValidationResult>;
  clearValidate: () => void;
  showError?: (message: string) => void;
}

export type FormItemRuleValidator = (
  rule: FormItemRule,
  value: unknown
) => Promise<void | string | boolean> | void | string | boolean

export type LegacyFormItemRuleValidator = (
  value: unknown
) => ValidationResult | Promise<ValidationResult> | boolean | Promise<boolean>
