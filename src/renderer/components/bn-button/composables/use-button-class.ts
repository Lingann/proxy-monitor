/**
 * ******************************************************
 * @file                     use-button-class.ts
 * @description             「按钮类名组合式函数」
 * 处理按钮类名相关的逻辑，支持预设系统
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, type ComputedRef } from 'vue'

import type { ButtonProps } from '../props'
import type { ButtonState } from '../types'

// ==================================================
// #region 类型定义
// ==================================================

/**
 * 按钮类名组合式函数返回值
 */
interface UseButtonClassReturn {

  /** 按钮类名 */
  buttonClass: ComputedRef<string>
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 按钮类名组合式函数
 * @param config - 「按钮配置」包含合并后的预设和用户配置
 * @returns 「按钮类名返回值」包含计算后的按钮类名
 * @complexity O(1) - 常量级计算
 */
export function useButtonClass(config: ComputedRef<ButtonProps>): UseButtonClassReturn {
  // 计算按钮状态
  const state = computed<ButtonState>(() => {
    if (config.value.loading) return 'loading'
    if (config.value.disabled) return 'disabled'
    return 'default'
  })

  // 生成类名
  const buttonClass = computed(() => {
    const classList: string[] = ['bn-btn']

    // 添加尺寸类名
    if (config.value.size) {
      classList.push(`bn-btn-size-${config.value.size}`)
    }

    // 添加颜色类名
    if (config.value.color) {
      classList.push(`bn-btn-color-${config.value.color}`)
    }

    // 添加变体类名
    if (config.value.variant) {
      classList.push(`bn-btn-variant-${config.value.variant}`)
    }

    // 添加形状类名
    if (config.value.shape) {
      classList.push(`bn-btn-shape-${config.value.shape}`)
    }

    // 添加特效类名
    if (config.value.effect) {
      classList.push(`bn-btn-effect-${config.value.effect}`)
    }

    // 添加状态类名
    if (state.value) {
      classList.push(`bn-btn-state-${state.value}`)
    }

    return classList.filter(Boolean).join(' ')
  })

  return {
    buttonClass
  }
}

// #endregion
// ==================================================
