/**
 * ******************************************************
 * @file                     checkbox-group-props.ts
 * @description             「复选框组属性定义」
 * 定义复选框组的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes } from 'vue'

import type { CheckboxOptionType, CheckboxSize, CheckboxValueType } from '../types'

// ==================================================
// #region 基础属性定义
// ==================================================

/**
 * 创建复选框组属性
 * @returns 「复选框组属性定义」包含默认值的属性定义
 */
export const checkboxGroupProps = createVueProps('checkbox-group', {
  // 默认选中的选项
  defaultValue: {
    type: Array as unknown as () => CheckboxValueType[],
    default: () => []
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 选中的选项（受控模式）
  modelValue: {
    type: Array as unknown as () => CheckboxValueType[],
    default: undefined
  },
  // 可选项配置
  options: {
    type: Array as unknown as () => Array<CheckboxOptionType | string | number>,
    default: () => []
  },
  // 尺寸
  size: {
    type: String as () => CheckboxSize,
    default: 'medium'
  },
  // 复选框的name属性
  name: {
    type: String,
    default: undefined
  }
})

// #endregion
// ==================================================

// 复选框组属性类型
export type CheckboxGroupProps = Partial<ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>>
