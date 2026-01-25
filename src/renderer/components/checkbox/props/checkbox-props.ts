/**
 * ******************************************************
 * @file                     checkbox-props.ts
 * @description             「复选框属性定义」
 * 定义复选框的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '@blanc-nova/vue-utils'
import type { ExtractPropTypes } from 'vue'

import type { CheckboxSize, CheckboxValueType } from '../types'

// ==================================================
// #region 基础属性定义
// ==================================================

/**
 * 创建复选框属性
 * @returns 「复选框属性定义」包含默认值的属性定义
 */
export const checkboxProps = createVueProps('checkbox', {
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
  // 半选状态
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 复选框的值
  value: {
    type: [String, Number, Boolean] as unknown as () => CheckboxValueType,
    default: undefined
  },
  // 复选框尺寸
  size: {
    type: String as () => CheckboxSize,
    default: 'medium'
  },
  // 用于 v-model 双向绑定
  modelValue: {
    type: Boolean,
    default: undefined
  },
  // 自动获取焦点
  autoFocus: {
    type: Boolean,
    default: false
  }
})

// #endregion
// ==================================================

// 复选框属性类型
export type CheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxProps>>>
