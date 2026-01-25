/**
 * ******************************************************
 * @file                     use-button-state.ts
 * @description             「按钮状态组合式函数」
 * 处理按钮的加载和禁用状态
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
 * 按钮状态组合式函数返回值
 */
interface UseButtonStateReturn {

  /** 按钮状态 */
  buttonState: ComputedRef<ButtonState>
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 按钮状态组合式函数
 * @param config - 「按钮配置」包含合并后的预设和用户配置
 * @returns 「按钮状态返回值」包含计算后的按钮状态
 * @complexity O(1) - 常量级计算
 */
export function useButtonState(config: ComputedRef<ButtonProps>): UseButtonStateReturn {
  // 计算按钮状态
  const buttonState = computed<ButtonState>(() => {
    if (config.value.loading) return 'loading'
    if (config.value.disabled) return 'disabled'
    return 'default'
  })

  return {
    buttonState
  }
}

// #endregion
// ==================================================
