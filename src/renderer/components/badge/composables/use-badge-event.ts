/**
 * ******************************************************
 * @file                     use-badge-event.ts
 * @description             「徽章组件事件处理」
 * 处理徽章组件的事件
 * @author                  blancnova-web
 * ******************************************************
 */

import { createEmitter } from '../../../utils/create-emitter'
import type { ComputedRef } from 'vue'

import type { BadgeConfig, BadgeEvents, BadgeEventType } from '../types'

// ==================================================
// #region 事件处理函数
// ==================================================

/**
 * 使用徽章事件
 * @param config - 「徽章配置」徽章所有配置信息
 * @returns 「事件处理」事件处理函数和事件分发器
 */
export function useBadgeEvent(
  config: ComputedRef<BadgeConfig>
) {
  /* 创建事件分发器 */
  const emitter = createEmitter<BadgeEvents>()

  /* 点击处理 */
  const handleClick = (e: MouseEvent) => {
    if (!config.value.show) return

    /* 分发事件到内部监听器 */
    emitter.emit('click', e)

    /* 调用 Props 中的回调函数 */
    config.value.onClick?.(e)
  }

  /* 鼠标进入 */
  const handleMouseEnter = (e: MouseEvent) => {
    if (!config.value.show) return

    emitter.emit('mouseenter', e)

    /* 调用 Props 中的回调函数 */
    config.value.onMouseenter?.(e)
  }

  /* 鼠标离开 */
  const handleMouseLeave = (e: MouseEvent) => {
    if (!config.value.show) return

    emitter.emit('mouseleave', e)

    /* 调用 Props 中的回调函数 */
    config.value.onMouseleave?.(e)
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
