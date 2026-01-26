/* ****************************************************** */
/* @file                     use-badge-event.ts */
/* @description             「徽章组件事件处理」 */
/* 处理徽章组件的事件 */
/* @author                  blancnova-web */
/* ****************************************************** */

import type { ComputedRef } from 'vue'

import type { BadgeProps } from '../props'
import type { BadgeConfig, BadgeCountValue, BadgeEmitFn } from '../types'

/* ================================================== */
/* #region 事件处理函数 */
/* ================================================== */

/* 使用徽章事件 */
export function useBadgeEvent(
  config: ComputedRef<BadgeConfig>,
  props: BadgeProps,
  emit: BadgeEmitFn,
  countValue: ComputedRef<BadgeCountValue | undefined>,
  syncModelValue: (nextValue: BadgeCountValue | undefined) => void
) {
  /* 点击处理 */
  const handleClick = (e: MouseEvent) => {
    if (!config.value.show) return

    syncModelValue(countValue.value)

    emit('click', e)

    /* 调用 Props 中的回调函数 */
    props.onClick?.(e)
  }

  /* 鼠标进入 */
  const handleMouseEnter = (e: MouseEvent) => {
    if (!config.value.show) return

    emit('mouseenter', e)

    /* 调用 Props 中的回调函数 */
    props.onMouseenter?.(e)
  }

  /* 鼠标离开 */
  const handleMouseLeave = (e: MouseEvent) => {
    if (!config.value.show) return

    emit('mouseleave', e)

    /* 调用 Props 中的回调函数 */
    props.onMouseleave?.(e)
  }

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave
  }
}

/* #endregion */
/* ================================================== */
