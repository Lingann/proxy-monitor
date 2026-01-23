
import { InjectionKey, Ref } from 'vue';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface FormItemRule {
  trigger?: 'change' | 'blur' | 'focus';
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  type?: 'email' | 'string' | 'number' | 'url';
  pattern?: RegExp | string;
  validator?: (value: any) => ValidationResult | Promise<ValidationResult> | boolean | Promise<boolean>;
}

export type FormRules = Record<string, FormItemRule | FormItemRule[]>;

export interface FormConfig {
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

export interface FormProps {
  model: Record<string, any>;
  rules?: FormRules;
  config?: FormConfig;
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
  validate: (trigger?: string) => Promise<ValidationResult>;
  resetField: () => void;
  clearValidate: () => void;
}

export interface FormContext {
  model: Record<string, any>;
  config: Ref<FormConfig>;
  rules: Ref<FormRules | undefined>;
  registerField: (field: FormItemContext) => void;
  unregisterField: (field: FormItemContext) => void;
  validateField: (prop: string, cb?: (isValid: boolean, message?: string) => void) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContext');
