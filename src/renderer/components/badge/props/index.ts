/**
 * ******************************************************
 * @file                     props.ts
 * @description             「徽章组件Props定义」
 * 定义徽章组件的Props
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes, PropType } from 'vue'

import type { BadgeColor, BadgePreset, BadgeShape, BadgeSize, BadgeStatus } from '../types'

// ==================================================
// #region Props 工厂函数
// ==================================================

/**
 * 创建徽章组件 Props
 * @returns 「徽章组件Props」包含所有属性定义
 */
export const createBadgeProps = createVueProps('badge', {

  /** 徽章预设 */
  preset: {
    type: String as PropType<BadgePreset>,
    default: 'default'
  },

  /** 徽章形状 */
  shape: {
    type: String as PropType<BadgeShape>,
    default: 'circle'
  },

  /** 徽章尺寸 */
  size: {
    type: String as PropType<BadgeSize>,
    default: 'medium'
  },

  /** 徽章颜色 */
  color: {
    type: String as PropType<BadgeColor>,
    default: 'default'
  },

  /** 显示的数字 */
  count: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },

  /** 最大显示数值 */
  overflowCount: {
    type: Number,
    default: 99
  },

  /** 当count为0时是否显示 */
  showZero: {
    type: Boolean,
    default: false
  },

  /** 不显示数字，只有一个小红点 */
  dot: {
    type: Boolean,
    default: false
  },

  /** 设置徽标为状态点 */
  status: {
    type: String as PropType<BadgeStatus>,
    default: undefined
  },

  /** 状态点的文本 */
  text: {
    type: String,
    default: ''
  },

  /** 徽章的偏移量 */
  offset: {
    type: Array as unknown as PropType<[number | string, number | string]>,
    default: () => [0, 0]
  },

  /** 是否显示 */
  show: {
    type: Boolean,
    default: true
  }

} as const)

// #endregion
// ==================================================

// ==================================================
// #region Props 类型定义
// ==================================================

/**
 * 徽章组件 Props 类型
 */
export type BadgeProps = Partial<ExtractPropTypes<ReturnType<typeof createBadgeProps>>>

// #endregion
// ==================================================
