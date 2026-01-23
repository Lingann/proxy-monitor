
import { Component, VNode } from 'vue';

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
  /* 输入框尺寸 */
  /* @default 'medium' */
  size?: InputSize;
  
  /* 输入框占位符 */
  placeholder?: string;
  
  /* 输入框类型 */
  /* @default 'text' */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  
  /* 是否禁用 */
  /* @default false */
  disabled?: boolean;
  
  /* 是否显示清除按钮 */
  /* @default false */
  clearable?: boolean;

  /* 最大长度 */
  maxLength?: number;

  /* 失去焦点时是否自动去除首尾空格 */
  /* @default false */
  trim?: boolean;
  
  /* 自定义前缀图标 (组件或 VNode) */
  prefixIcon?: Component | VNode;
  
  /* 自定义后缀图标 (组件或 VNode) */
  suffixIcon?: Component | VNode;
  
  /* 验证器配置 */
  validator?: InputValidator;
}

export interface CommonInputProps {
  modelValue: string;
  config?: InputConfig;
}
