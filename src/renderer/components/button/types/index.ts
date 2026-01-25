/**
 * ******************************************************
 * @file                     types.ts
 * @description             「按钮组件类型定义」
 * 定义按钮组件的所有类型和接口
 * @author                  blancnova-web
 * ******************************************************
 */

import type { createEmitter } from '@blanc-nova/emitter-utils'

// ==================================================
// #region 基础类型定义
// ==================================================

/**
 * 按钮尺寸类型
 */
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * 按钮颜色类型
 */
export type ButtonColor = 'default' | 'primary' | 'danger'

/**
 * 按钮变体类型
 */
export type ButtonVariant = 'outlined' | 'solid' | 'dashed' | 'soft' | 'text' | 'link'

/**
 * 按钮形状类型
 */
export type ButtonShape = 'circle' | 'square' | 'capsule'

/**
 * 按钮状态类型
 */
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'loading'

/**
 * 按钮类型
 */
export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * 按钮特效类型
 */
export type ButtonEffect = 'shadow' | 'ripple'

/**
 * 按钮预设
 */
export type ButtonPreset = 'default' | 'primary' | 'danger' | 'link' | 'text'

// #endregion
// ==================================================

// ==================================================
// #region 预设配置类型
// ==================================================

/**
 * 按钮预设配置接口
 */
export interface ButtonPresetConfig {

  /** 颜色 */
  color?: ButtonColor

  /** 尺寸 */
  size?: ButtonSize

  /** 变体 */
  variant?: ButtonVariant

  /** 形状 */
  shape?: ButtonShape

  /** 特效 */
  effect?: ButtonEffect
}

/**
 * 按钮预设映射表类型
 */
export type ButtonPresetMap = Record<ButtonPreset, ButtonPresetConfig>

// #endregion
// ==================================================

// ==================================================
// #region 按钮状态接口
// ==================================================

/**
 * 按钮状态接口
 */
export interface ButtonStateProps {

  /** 是否禁用 */
  disabled: boolean

  /** 是否加载中 */
  loading: boolean
}

// #endregion
// ==================================================

// ==================================================
// #region 事件类型定义
// ==================================================

/**
 * 按钮事件类型枚举
 */
export type ButtonEventType = 'click' | 'mouseenter' | 'mouseleave' | 'mousedown' | 'mouseup' | 'mounted' | 'unmounted' | 'beforeUnmount'

/**
 * 按钮事件映射类型
 */
export type ButtonEvents = Record<ButtonEventType, MouseEvent>

/**
 * 按钮事件分发器类型
 */
export type ButtonEmitter = ReturnType<typeof createEmitter<ButtonEvents>>

// #endregion
// ==================================================
