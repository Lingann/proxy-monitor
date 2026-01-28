/**
 * ******************************************************
 * @file                     radio.ts
 * @description             「单选框类型定义」
 * 定义 Radio 和 RadioGroup 的相关 TypeScript 类型
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ComputedRef, CSSProperties, InjectionKey } from 'vue'

// ==================================================
// #region 基础类型
// ==================================================

/**
 * Radio 的值类型
 * @description 支持字符串、数字、布尔值以及符合规范的对象
 */
export type RadioValueType = string | number | boolean | {
  id: string | number
  [key: string]: string | number | boolean | undefined | null | Record<string, unknown>
}

/**
 * 类型守卫：检查值是否为有效的RadioValueType
 * @param value 要检查的值
 * @returns 是否为有效的RadioValueType
 * @description 用于运行时安全检查值类型
 */
export function isValidRadioValue(value: unknown): value is RadioValueType {
  // 原始类型检查
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return true
  }

  // 对象类型检查 - 必须有id属性
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return 'id' in value && (typeof value.id === 'string' || typeof value.id === 'number')
  }

  return false
}

/**
 * Radio 组件的尺寸
 */
export type RadioSize = 'small' | 'medium' | 'large'

/**
 * Radio 按钮样式类型
 */
export type RadioButtonStyle = 'outline' | 'solid'

/**
 * Radio 选项类型 (用于 RadioGroup 的 options 属性)
 */
export interface RadioOptionType<V = RadioValueType> {
  label: string // 选项显示的文本
  value: V // 选项的值
  disabled?: boolean // 是否禁用该选项
  style?: CSSProperties | string // 应用于该选项的样式
  title?: string // HTML title 属性
  id?: string // HTML id 属性
  // 可以根据需要扩展其他属性
}

/**
 * RadioGroup 的选项类型 (用于渲染方式)
 */
export type RadioOptionRenderType = 'default' | 'button'

// #endregion
// ==================================================

// ==================================================
// #region 事件类型
// ==================================================

/**
 * Radio change 事件对象接口 (模仿原生事件)
 */
export interface RadioChangeEvent {
  target: {
    checked: boolean
    value: RadioValueType
  }
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

/**
 * RadioGroup change 事件参数类型 (Ant Design 风格)
 */
export interface RadioGroupChangeEvent {
  target: {
    value: RadioValueType // RadioGroup 选中的值
  }
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: Event
}

/**
 * Radio 单个组件的 Emit 定义
 */
export interface RadioEmit {
  (e: 'update:modelValue', value: boolean): void // 添加v-model支持
  (e: 'change', event: RadioChangeEvent): void // 状态改变事件 (主要由 Group 触发或独立使用时)
  (e: 'focus' | 'blur', event: FocusEvent): void // 聚焦/失焦事件
}

/**
 * RadioGroup 组件的 Emit 定义
 */
export interface RadioGroupEmit {
  (e: 'update:modelValue' | 'change', value: RadioValueType): void // 用于 v-model 和 change 事件
}

// #endregion
// ==================================================

// ==================================================
// #region 上下文 Context 类型
// ==================================================

/**
 * RadioGroup 提供给 Radio 的上下文接口
 */
export interface RadioGroupContext {
  // 状态
  name: ComputedRef<string | undefined> // Group 的 name 属性
  selectedValue: ComputedRef<RadioValueType | undefined> // Group 当前选中的值
  disabled: ComputedRef<boolean> // Group 是否整体禁用
  size: ComputedRef<RadioSize | undefined> // Group 的尺寸
  optionType: ComputedRef<RadioOptionRenderType> // Group 的渲染类型 (default/button)
  buttonStyle: ComputedRef<RadioButtonStyle> // Group 的按钮样式

  // 方法
  changeValue: (value: RadioValueType) => void // 用于 Radio 通知 Group 值改变
}

/**
 * RadioGroup 上下文的 Injection Key
 */
export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('BnRadioGroup')

// #endregion
// ==================================================
