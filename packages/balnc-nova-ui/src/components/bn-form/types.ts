
import type { InjectionKey, Ref } from 'vue'

import type {
  FormItemRule,
  FormRules,
  FormTrigger,
  ValidationResult,
  ValidatableField
} from '../../shared/validation'

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

/* 表单项校验触发上下文 */
export interface FormItemValidateContext {
  /* 触发 blur 校验 */
  notifyBlur: () => Promise<ValidationResult>;

  /* 触发 change 校验 */
  notifyChange: () => Promise<ValidationResult>;
}

/* 表单级上下文：配置 + 规则 + 注册 */
export interface FormContext {
  /* 表单模型 */
  model: Record<string, unknown>;

  /* 标签宽度 */
  labelWidth: Ref<string | number | undefined>;

  /* 标签对齐方式 */
  labelPosition: Ref<'left' | 'right' | 'top' | undefined>;

  /* 表单尺寸 */
  size: Ref<'small' | 'medium' | 'large' | undefined>;

  /* 是否禁用 */
  disabled: Ref<boolean | undefined>;

  /* 是否显示校验信息 */
  showMessage: Ref<boolean | undefined>;

  /* 表单规则 */
  rules: Ref<FormRules | undefined>;

  /* 字段注册 */
  registerField: (field: ValidatableField) => void;
  unregisterField: (field: ValidatableField) => void;

  /* 按字段触发校验 */
  validateField: (prop: string, cb?: (isValid: boolean, message?: string) => void) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContext');
export const FormItemContextKey: InjectionKey<FormItemValidateContext> = Symbol('FormItemContext');

export type {
  FormItemRule,
  FormRules,
  FormTrigger,
  ValidationResult,
  ValidationState,
  ValidatableField
} from '../../shared/validation'
