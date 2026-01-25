/**
 * ******************************************************
 * @file                     use-button-event.ts
 * @description             「按钮事件组合式函数」
 * 处理按钮的点击事件和状态控制
 * @author                  blancnova-web
 * ******************************************************
 */

import { createEmitter } from '@blanc-nova/emitter-utils'
import { type ComputedRef } from 'vue'

import type { ButtonProps } from '../props'
import type { ButtonEmitter, ButtonEvents } from '../types'

// ==================================================
// #region 类型定义
// ==================================================

/**
 * 按钮事件组合式函数返回值
 */
interface UseButtonEventReturn {

  /** 点击事件处理函数 */
  handleClick: (event: MouseEvent) => void

  /** 事件分发器 */
  emitter: ButtonEmitter
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 按钮事件组合式函数
 * @param config - 「按钮配置」包含合并后的预设和用户配置
 * @param emit - 「事件发射器」用于触发父组件事件
 * @returns 「按钮事件返回值」包含事件处理函数和事件分发器
 * @complexity O(1) - 常量级计算
 */
export function useButtonEvent(
  config: ComputedRef<ButtonProps>,
  emit: (event: 'click', e: MouseEvent) => void
): UseButtonEventReturn {
  // 创建事件分发器
  const emitter = createEmitter<ButtonEvents>()

  // 处理点击事件
  const handleClick = (event: MouseEvent) => {
    // 如果按钮处于禁用或加载状态，不触发点击事件
    if (config.value.disabled || config.value.loading) {
      event.preventDefault()
      return
    }

    // 触发内部事件分发
    emitter.emit('click', event)
    // 触发父组件事件
    emit('click', event)
  }

  return {
    handleClick,
    emitter
  }
}

// #endregion
// ==================================================
