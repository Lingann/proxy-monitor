/**
 * ******************************************************
 * @file                     radio-group-props.ts
 * @description             「单选框组属性定义」
 * 定义单选框组的基础属性
 * @author                  blancnova-web
 * ******************************************************
 */
import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes } from 'vue'

import type {
  RadioButtonStyle,
  RadioOptionRenderType,
  RadioOptionType,
  RadioSize,
  RadioValueType
} from '../types'

// ==================================================
// #region 基础属性定义
// ==================================================

/**
 * 创建单选框组属性
 * @returns 「单选框组属性定义」包含默认值的属性定义
 */
export const createRadioGroupProps = createVueProps('radio-group', {
  // 受控模式值
  modelValue: {
    type: [String, Number, Boolean] as unknown as () => RadioValueType,
    default: undefined
  },
  // 默认选中的值 (非受控)
  defaultValue: {
    type: [String, Number, Boolean] as unknown as () => RadioValueType,
    default: undefined
  },
  // 是否禁用整个组
  disabled: {
    type: Boolean,
    default: false
  },
  // 尺寸，会应用于组内所有 Radio 或 RadioButton
  size: {
    type: String as () => RadioSize,
    default: 'medium'
  },
  // RadioButton 的样式风格
  buttonStyle: {
    type: String as () => RadioButtonStyle,
    default: 'outline'
  },
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name: {
    type: String,
    default: undefined
  },
  // 以配置形式设置子元素
  options: {
    type: Array as unknown as () => Array<RadioOptionType | string | number>,
    default: undefined
  },
  // 用于设置 Radio options 类型
  optionType: {
    type: String as () => RadioOptionRenderType,
    default: 'default'
  },
  // RadioButton 模式下，是否宽度适应父容器
  block: {
    type: Boolean,
    default: false
  }
})

// #endregion
// ==================================================

// 单选框组属性类型
export type RadioGroupProps = Partial<ExtractPropTypes<ReturnType<typeof createRadioGroupProps>>>
