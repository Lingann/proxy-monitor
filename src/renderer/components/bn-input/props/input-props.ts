/**
 * ******************************************************
 * @file                     input-props.ts
 * @description             「输入框属性定义」
 * 定义输入框的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { Component, ExtractPropTypes, PropType } from 'vue'

import type { FormItemRule } from '../../../shared/validation'
import type { InputSize, InputType } from '../types'

/* ================================================== */
/* 区域：基础属性定义 */
/* ================================================== */

/**
 * 创建基础输入框属性
 * @returns 「输入框属性定义」包含默认值的属性定义
 */
export const inputProps = createVueProps('input', {
  modelValue: {
    type: String,
    default: ''
  },
  size: {
    type: String as () => InputSize,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => InputType,
    default: 'text'
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  block: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: Object as () => Component,
    default: undefined
  },
  suffixIcon: {
    type: Object as () => Component,
    default: undefined
  },
  showCount: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: undefined
  },
  trim: {
    type: Boolean,
    default: false
  },
  rules: {
    type: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
    default: undefined
  },

  /* 事件回调：输入事件 */
  onInput: Function as PropType<(value: string) => void>,

  /* 事件回调：变更事件 */
  onChange: Function as PropType<(event: Event) => void>,

  /* 事件回调：获得焦点事件 */
  onFocus: Function as PropType<(event: FocusEvent) => void>,

  /* 事件回调：失去焦点事件 */
  onBlur: Function as PropType<(event: FocusEvent) => void>,

  /* 事件回调：清除事件 */
  onClear: Function as PropType<() => void>
})

/* ================================================== */
/* 区域结束：基础属性定义 */
/* ================================================== */

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>
