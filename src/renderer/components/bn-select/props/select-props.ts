/**
 * ******************************************************
 * @file                     select-props.ts
 * @description             「选择器组件Props定义」
 * 定义选择器组件的Props
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes, PropType } from 'vue'

import type { SelectOption, SelectSize } from '../types'

// ==================================================
// #region Props 工厂函数
// ==================================================

/**
 * 创建选择器组件 Props
 * @returns 「选择器组件Props」包含所有属性定义
 */
export const createSelectProps = createVueProps('select', {

  /** 绑定值 */
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: null
  },

  /** 选项列表 */
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },

  /** 选择器尺寸 */
  size: {
    type: String as PropType<SelectSize>,
    default: 'medium'
  },

  /** 占位符 */
  placeholder: {
    type: String,
    default: ''
  },

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: false
  },

  /** 最大显示项数 */
  maxItems: {
    type: Number,
    default: 5
  },

  /** 是否错误状态 */
  error: {
    type: Boolean,
    default: false
  },

  /** 错误提示信息 */
  errorMessage: {
    type: String,
    default: ''
  },

  /** 下拉框层级 */
  zIndex: {
    type: Number,
    default: 100
  },

  /* 事件回调：值更新事件 */
  onUpdateModelValue: Function as PropType<(value: string | number | null) => void>,

  /* 事件回调：值改变事件 */
  onChange: Function as PropType<(value: string | number | null, option: SelectOption) => void>,

  /* 事件回调：获得焦点事件 */
  onFocus: Function as PropType<(e: FocusEvent) => void>,

  /* 事件回调：失去焦点事件 */
  onBlur: Function as PropType<(e: FocusEvent) => void>,

  /* 事件回调：清空事件 */
  onClear: Function as PropType<() => void>
} as const)

// #endregion
// ==================================================

// ==================================================
// #region Props 类型定义
// ==================================================

/**
 * 选择器组件 Props 类型
 */
export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof createSelectProps>>>

/**
 * 导出 Props 工厂函数
 */
export const selectProps = createSelectProps

// #endregion
// ==================================================

