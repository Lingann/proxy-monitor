/* ****************************************************** */
/* @file                     use-badge-standalone.ts */
/* @description             「徽章组件结构模式处理」 */
/* 计算徽章是否以独立模式渲染 */
/* @author                  blancnova-web */
/* ****************************************************** */

import { computed } from 'vue'

import type { ComputedRef } from 'vue'

import type { BadgeProps } from '../props'
import type { BadgeCountValue } from '../types'

/* 使用徽章结构模式 */
export function useBadgeStandalone(
  props: BadgeProps,
  displayCount: ComputedRef<BadgeCountValue | null>,
  hasDefaultSlot: ComputedRef<boolean>
) {
  /* 判断是否为独立模式 */
  const isStandalone = computed(() => {
    if (hasDefaultSlot.value) return false

    if (props.status) return true

    return displayCount.value !== null
  })

  return {
    isStandalone
  }
}
