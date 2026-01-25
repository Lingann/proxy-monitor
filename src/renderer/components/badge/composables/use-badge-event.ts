/**
 * ******************************************************
 * @file                     use-badge-event.ts
 * @description             「徽章组件事件处理」
 * 处理徽章组件的事件
 * @author                  blancnova-web
 * ******************************************************
 */

import { createEmitter } from '@blanc-nova/emitter-utils'
import type { ComputedRef } from 'vue'

import type { BadgeConfig, BadgeEvents, BadgeEventType } from '../types'

// ==================================================
// #region 事件处理函数
// ==================================================

/**
 * 徽章事件emit类型
 */
export interface BadgeEmitFn {
  (e: 'click' | 'mouseenter' | 'mouseleave', event: MouseEvent): void
}

/**
 * 使用徽章事件
 * @param config - 「徽章配置」徽章所有配置信息
 * @param emit - 「组件Emit函数」Vue组件Emit
 * @returns 「事件处理」事件处理函数和事件分发器
 */
export function useBadgeEvent(
  config: ComputedRef<BadgeConfig>,
  emit: BadgeEmitFn
) {
  // 创建事件分发器
  const emitter = createEmitter<BadgeEvents>()

  // 点击处理
  const handleClick = (e: MouseEvent) => {
    if (!config.value.show) return

    // 分发事件到内部监听器
    emitter.emit('click', e)

    // 向外部分发点击事件
    emit('click', e)
  }

  // 鼠标进入
  const handleMouseEnter = (e: MouseEvent) => {
    if (!config.value.show) return

    emitter.emit('mouseenter', e)
    emit('mouseenter', e)
  }

  // 鼠标离开
  const handleMouseLeave = (e: MouseEvent) => {
    if (!config.value.show) return

    emitter.emit('mouseleave', e)
    emit('mouseleave', e)
  }

  return {
    emitter,
    handleClick,
    handleMouseEnter,
    handleMouseLeave
  }
}

// #endregion
// ==================================================
