/* ****************************************************** */
/* 文件: select-props.ts */
/* 描述: 选择器组件属性定义 */
/* 定义选择器组件的属性 */
/* 作者: blancnova-web */
/* ****************************************************** */

import type { ExtractPropTypes, PropType } from 'vue'

import { createVueProps } from '../../../utils/create-vue-props'

import type { SelectOption, SelectSize } from '../types'

/* 属性工厂函数 */

/* 创建选择器组件属性 */
export const createSelectProps = createVueProps('select', {

  /* 绑定值 */
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: null
  },

  /* 选项列表 */
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },

  /* 选择器尺寸 */
  size: {
    type: String as PropType<SelectSize>,
    default: 'medium'
  },

  /* 占位符 */
  placeholder: {
    type: String,
    default: ''
  },

  /* 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /* 是否可清空 */
  clearable: {
    type: Boolean,
    default: false
  },

  /* 最大显示项数 */
  maxItems: {
    type: Number,
    default: 5
  },

  /* 是否错误状态 */
  error: {
    type: Boolean,
    default: false
  },

  /* 错误提示信息 */
  errorMessage: {
    type: String,
    default: ''
  },

  /* 下拉框层级 */
  zIndex: {
    type: Number,
    default: 100
  },

  /* 事件回调：值改变事件 */
  onChange: Function as PropType<(value: string | number | null, option: SelectOption) => void>,

  /* 事件回调：获得焦点事件 */
  onFocus: Function as PropType<(e: FocusEvent) => void>,

  /* 事件回调：失去焦点事件 */
  onBlur: Function as PropType<(e: FocusEvent) => void>,

  /* 事件回调：清空事件 */
  onClear: Function as PropType<() => void>
} as const)

/* 选择器组件属性类型 */
export type SelectProps = Partial<ExtractPropTypes<ReturnType<typeof createSelectProps>>>

/* 导出属性工厂函数 */
export const selectProps = createSelectProps

