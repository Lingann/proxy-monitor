/**
 * ******************************************************
 * @file                     radio.ts
 * @description             「单选框属性定义」
 * 定义单选框的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */
import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes } from 'vue'

import type { RadioSize, RadioValueType } from '../types'

// ==================================================
// #region 基础属性定义
// ==================================================

/**
 * 创建单选框属性
 * @returns 「单选框属性定义」包含默认值的属性定义
 */
export const createRadioProps = createVueProps('radio', {
  // Vue3 v-model 支持
  modelValue: {
    type: Boolean,
    default: undefined
  },
  // 受控模式
  checked: {
    type: Boolean,
    default: undefined
  },
  // 非受控模式默认值
  defaultChecked: {
    type: Boolean,
    default: false
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  },
  // 单选框的值
  value: {
    type: [String, Number, Boolean] as unknown as () => RadioValueType,
    default: undefined
  },
  // 单选框尺寸
  size: {
    type: String as () => RadioSize,
    default: 'medium'
  },
  // 自动获取焦点
  autoFocus: {
    type: Boolean,
    default: false
  },
  // input 的 name 属性，会继承自 RadioGroup
  name: {
    type: String,
    default: undefined
  },
  // HTML id 属性
  id: {
    type: String,
    default: undefined
  },
  // HTML title 属性
  title: {
    type: String,
    default: undefined
  }
})

// #endregion
// ==================================================

// 单选框属性类型
export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof createRadioProps>>>
