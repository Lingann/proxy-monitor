/**
 * ******************************************************
 * @file                     types.ts
 * @description             「输入框组件类型定义」
 * 定义输入框组件的所有类型和接口
 * @author                  blancnova-web
 * ******************************************************
 */

import type { Component } from 'vue'

// ==================================================
// #region 基础类型定义
// ==================================================

/**
 * 输入框尺寸类型
 */
export type InputSize = 'small' | 'medium' | 'large'

/**
 * 输入框状态类型
 */
export type InputState = 'default' | 'hover' | 'focus' | 'disabled' | 'error'

/**
 * 输入框类型
 */
export type InputType = 'text' | 'password' | 'search' | 'number' | 'tel' | 'email' | 'url'

// #endregion
// ==================================================

// ==================================================
// #region 基础属性接口
// ==================================================

/**
 * 基础输入框属性接口
 */
export interface BaseInputProps {

  /** 输入框值 */
  modelValue?: string

  /** 输入框尺寸 */
  size?: InputSize

  /** 是否禁用 */
  disabled?: boolean

  /** 是否只读 */
  readonly?: boolean

  /** 占位符文本 */
  placeholder?: string

  /** 是否显示错误状态 */
  error?: boolean

  /** 错误提示信息 */
  errorMessage?: string

  /** 是否块级显示 */
  block?: boolean

  /** 是否允许清空 */
  allowClear?: boolean

  /** 前缀图标 */
  prefixIcon?: Component

  /** 后缀图标 */
  suffixIcon?: Component

  /** 是否显示字数统计 */
  showCount?: boolean

  /** 最大输入长度 */
  maxLength?: number
}

/**
 * 密码输入框特有属性接口
 */
export interface PasswordInputProps extends BaseInputProps {

  /** 是否显示密码可见性切换 */
  visibilityToggle?: boolean
}

/**
 * 搜索输入框特有属性接口
 */
export interface SearchInputProps extends BaseInputProps {

  /** 搜索按钮文本 */
  searchText?: string

  /** 是否显示搜索按钮 */
  showSearchButton?: boolean

  /** 是否在输入时触发搜索 */
  searchOnInput?: boolean
}

// #endregion
// ==================================================

// ==================================================
// #region 事件类型定义
// ==================================================

/**
 * 输入框事件类型
 */
export interface InputEvents {

  /** 输入值更新事件 */
  'update:modelValue': string

  /** 输入事件 */
  input: string

  /** 值变化事件 */
  change: Event

  /** 获得焦点事件 */
  focus: FocusEvent

  /** 失去焦点事件 */
  blur: FocusEvent

  /** 清空事件 */
  clear: undefined

  /** 搜索事件(仅搜索框) */
  search?: string
}

// #endregion
// ==================================================
