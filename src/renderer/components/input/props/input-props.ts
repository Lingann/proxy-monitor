/**
 * ******************************************************
 * @file                     input-props.ts
 * @description             「输入框属性定义」
 * 定义输入框的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '@blanc-nova/vue-utils'
import type { Component, ExtractPropTypes } from 'vue'

import type { InputSize, InputType } from '../types'

// ==================================================
// #region 基础属性定义
// ==================================================

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
    default: '请输入'
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
    default: true
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
  }
})

// #endregion
// ==================================================

export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>
