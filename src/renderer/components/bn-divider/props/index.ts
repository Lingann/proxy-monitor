/**
 * ******************************************************
 * @file                     props.ts
 * @description             「分割线组件Props定义」
 * 定义分割线组件的Props
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes, PropType } from 'vue'

import type { DividerOrientation, DividerStyle, DividerType } from '../types'

// ==================================================
// #region Props 工厂函数
// ==================================================

/**
 * 创建分割线组件 Props
 * @returns 「分割线组件Props」包含所有属性定义
 */
export const createDividerProps = createVueProps('divider', {

  /** 水平还是垂直类型 */
  type: {
    type: String as PropType<DividerType>,
    default: 'horizontal'
  },

  /** 分割线样式类型 */
  dashed: {
    type: Boolean,
    default: false
  },

  /** 分割线样式 */
  style: {
    type: String as PropType<DividerStyle>,
    default: 'solid'
  },

  /** 标题的位置 */
  orientation: {
    type: String as PropType<DividerOrientation>,
    default: 'center'
  },

  /** 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right */
  orientationMargin: {
    type: [String, Number],
    default: undefined
  },

  /** 是否使用普通文本样式 */
  plain: {
    type: Boolean,
    default: false
  },

  /** 是否虚线 */
  dash: {
    type: Boolean,
    default: false
  },

  /* 事件回调：点击事件 */
  onClick: Function as PropType<(event: MouseEvent) => void>

} as const)

// #endregion
// ==================================================

// ==================================================
// #region Props 类型定义
// ==================================================

/**
 * 分割线组件 Props 类型
 */
export type DividerProps = Partial<ExtractPropTypes<ReturnType<typeof createDividerProps>>>

// #endregion
// ==================================================
