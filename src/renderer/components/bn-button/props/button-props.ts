/**
 * ******************************************************
 * @file                     button-props.ts
 * @description             「按钮组件Props定义」
 * 定义按钮组件的Props
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../utils/create-vue-props'
import type { ExtractPropTypes, PropType } from 'vue'

import type { ButtonColor, ButtonPreset, ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '../types'

/* 按钮事件回调类型定义 */
export interface ButtonEventCallbacks {
  onClick?: (event: MouseEvent) => void
}

// ==================================================
// #region Props 工厂函数
// ==================================================

/**
 * 创建按钮组件 Props
 * @returns 「按钮组件Props」包含所有属性定义
 */
export const createButtonProps = createVueProps('button', {

  /** 按钮预设 */
  preset: {
    type: String as PropType<ButtonPreset>,
    default: 'default'
  },

  /** 按钮形状 */
  shape: {
    type: String as PropType<ButtonShape>,
    default: undefined
  },

  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: undefined
  },

  /** 按钮颜色 */
  color: {
    type: String as PropType<ButtonColor>,
    default: undefined
  },

  /** 按钮变体 */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: undefined
  },

  /** 按钮特效 */
  effect: {
    type: String as PropType<'shadow' | 'ripple' | undefined>,
    default: undefined
  },

  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },

  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },

  /** 按钮类型 */
  type: {
    type: String as PropType<ButtonType>,
    default: 'button'
  },

  /** 按钮图标 */
  icon: {
    type: String,
    default: ''
  },

  /** 按钮名称 */
  name: {
    type: String,
    default: ''
  },

  /** 按钮标签 */
  'aria-label': {
    type: String,
    default: ''
  },

  /** 按钮角色 */
  role: {
    type: String,
    default: 'button'
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
 * 按钮组件 Props 类型
 */
export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof createButtonProps>>>

// #endregion
// ==================================================
