
import { InjectionKey, Ref } from 'vue'

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

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

export interface FormProps {
  model: Record<string, unknown>;
  rules?: FormRules;

  /* 标签宽度 */
  labelWidth?: string | number;

  /* 标签对齐方式 */
  labelPosition?: 'left' | 'right' | 'top';

  /* 表单尺寸 */
  size?: 'small' | 'medium' | 'large';

  /* 是否禁用 */
  disabled?: boolean;

  /* 是否显示校验错误信息 */
  showMessage?: boolean;
}

export interface FormItemConfig {
  /* 标签文本 */
  label?: string;
  
  /* 字段名 */
  prop?: string;
  
  /* 标签宽度 (覆盖 FormConfig) */
  labelWidth?: string | number;
  
  /* 是否必填 */
  required?: boolean;
  
  /* 校验规则 (覆盖 FormRules) */
  rules?: FormItemRule | FormItemRule[];
  
  /* 是否显示错误信息 */
  showMessage?: boolean;
}

export interface FormItemContext {
  prop: string;
  validate: (trigger?: FormTrigger) => Promise<ValidationResult>;
  resetField: () => void;
  clearValidate: () => void;
}

export interface FormItemValidateContext {
  validate: (trigger?: FormTrigger) => Promise<ValidationResult>;
}

export interface FormContext {
  model: Record<string, unknown>;
  labelWidth: Ref<string | number | undefined>;
  labelPosition: Ref<'left' | 'right' | 'top' | undefined>;
  size: Ref<'small' | 'medium' | 'large' | undefined>;
  disabled: Ref<boolean | undefined>;
  showMessage: Ref<boolean | undefined>;
  rules: Ref<FormRules | undefined>;
  registerField: (field: FormItemContext) => void;
  unregisterField: (field: FormItemContext) => void;
  validateField: (prop: string, cb?: (isValid: boolean, message?: string) => void) => void;
}

export type FormItemRuleValidator = (
  rule: FormItemRule,
  value: unknown
) => Promise<void | string | boolean> | void | string | boolean

export type LegacyFormItemRuleValidator = (
  value: unknown
) => ValidationResult | Promise<ValidationResult> | boolean | Promise<boolean>

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContext');
export const FormItemContextKey: InjectionKey<FormItemValidateContext> = Symbol('FormItemContext');
