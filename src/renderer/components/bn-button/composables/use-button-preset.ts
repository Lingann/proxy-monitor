/**
 * ******************************************************
 * @file                     use-button-preset.ts
 * @description             「按钮预设组合式函数」
 * 处理按钮预设和用户配置的合并逻辑
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, type ComputedRef, type ExtractPropTypes } from 'vue'

import type { createButtonProps } from '../props'
import type { ButtonPresetMap } from '../types'

// ==================================================
// #region 类型定义
// ==================================================

type ButtonPropsType = ExtractPropTypes<ReturnType<typeof createButtonProps>>

/**
 * 按钮预设组合式函数返回值
 */
interface UseButtonPresetReturn {

  /** 合并后的配置 */
  config: ComputedRef<ButtonPropsType>
}

// #endregion
// ==================================================

// ==================================================
// #region 预设配置
// ==================================================

/**
 * 按钮预设配置映射表
 * @description 定义各个预设的默认配置
 * @complexity O(1) - 常量配置
 */
export const buttonPresets: ButtonPresetMap = {
  default: {
    color: 'default',
    size: 'medium',
    variant: 'outlined',
    shape: undefined,
    effect: 'shadow'
  },
  primary: {
    color: 'primary',
    size: 'medium',
    variant: 'solid',
    shape: undefined,
    effect: 'shadow'
  },
  danger: {
    color: 'danger',
    size: 'medium',
    variant: 'solid',
    shape: undefined,
    effect: 'shadow'
  },
  link: {
    color: 'primary',
    size: 'medium',
    variant: 'link',
    shape: undefined,
    effect: undefined
  },
  text: {
    color: 'primary',
    size: 'medium',
    variant: 'text',
    shape: undefined,
    effect: undefined
  }
} as const

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 按钮预设组合式函数
 * @param props - 「按钮属性」包含预设和用户配置
 * @returns 「按钮预设返回值」包含合并后的配置
 * @complexity O(1) - 常量级计算
 */
export function useButtonPreset(props: ButtonPropsType): UseButtonPresetReturn {
  // 合并预设配置和用户配置
  const config = computed(() => {
    // 获取预设配置
    const presetConfig = buttonPresets[props.preset || 'default']

    // 用户配置优先级高于预设配置
    const mergedConfig = {
      ...props,
      color: props.color || presetConfig.color,
      size: props.size || presetConfig.size,
      variant: props.variant || presetConfig.variant,
      shape: props.shape || presetConfig.shape,
      effect: props.effect || presetConfig.effect
    }

    return mergedConfig
  })

  return {
    config
  }
}

// #endregion
// ==================================================
