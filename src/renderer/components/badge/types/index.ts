/**
 * ******************************************************
 * @file                     types.ts
 * @description             「徽章组件类型定义」
 * 定义徽章组件的所有类型和接口
 * @author                  blancnova-web
 * ******************************************************
 */

import type { createEmitter } from '@blanc-nova/emitter-utils'

// ==================================================
// #region 基础类型定义
// ==================================================

/**
 * 徽章尺寸类型
 */
export type BadgeSize = 'small' | 'medium' | 'large'

/**
 * 徽章颜色类型
 */
export type BadgeColor = 'default' | 'primary' | 'danger' | 'success' | 'warning'

/**
 * 徽章形状类型
 */
export type BadgeShape = 'circle' | 'square'

/**
 * 徽章状态类型
 */
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning'

/**
 * 徽章预设
 */
export type BadgePreset = 'default' | 'primary' | 'danger' | 'success' | 'warning'

// #endregion
// ==================================================

// ==================================================
// #region 预设配置类型
// ==================================================

/**
 * 徽章预设配置接口
 */
export interface BadgePresetConfig {

  /** 颜色 */
  color?: BadgeColor

  /** 尺寸 */
  size?: BadgeSize

  /** 形状 */
  shape?: BadgeShape
}

/**
 * 徽章预设映射表类型
 */
export type BadgePresetMap = Record<BadgePreset, BadgePresetConfig>

// #endregion
// ==================================================

// ==================================================
// #region 徽章状态接口
// ==================================================

/**
 * 徽章状态接口
 */
export interface BadgeStateProps {

  /** 是否显示 */
  show: boolean

  /** 是否有点 */
  dot: boolean

  /** 状态类型 */
  status?: BadgeStatus
}

// #endregion
// ==================================================

// ==================================================
// #region 事件类型定义
// ==================================================

/**
 * 徽章事件类型枚举
 */
export type BadgeEventType = 'click' | 'mouseenter' | 'mouseleave' | 'mounted' | 'unmounted'

/**
 * 徽章事件映射类型
 */
export type BadgeEvents = Record<BadgeEventType, MouseEvent>

/**
 * 徽章事件分发器类型
 */
export type BadgeEmitter = ReturnType<typeof createEmitter<BadgeEvents>>

// #endregion
// ==================================================

// ==================================================
// #region 配置类型定义
// ==================================================

/**
 * 徽章配置接口
 */
export interface BadgeConfig extends BadgePresetConfig, BadgeStateProps {

  /** 显示的数字 */
  count?: number | string

  /** 最大显示数值 */
  overflowCount?: number

  /** 当count为0时是否显示 */
  showZero?: boolean

  /** 自定义文本 */
  text?: string

  /** 徽章的偏移量 */
  offset?: [number | string, number | string]
}

// #endregion
// ==================================================
