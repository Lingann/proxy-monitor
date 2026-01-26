/* ****************************************************** */
/* @file                     use-badge-offset-style.ts */
/* @description             「徽章组件偏移样式处理」 */
/* 计算徽章上标的偏移量样式 */
/* @author                  blancnova-web */
/* ****************************************************** */

import { computed } from 'vue'

import type { ComputedRef } from 'vue'

import type { BadgeProps } from '../props'
import type { BadgeConfig } from '../types'

/* 使用徽章偏移样式 */
export function useBadgeOffsetStyle(
  config: ComputedRef<BadgeConfig>,
  props: BadgeProps
) {
  /* 处理徽章偏移量样式 */
  const badgeSupStyle = computed(() => {
    /* 获取偏移量 */
    const offset = config.value.offset ?? props.offset

    /* 防御式编程：验证offset参数是否合法 */
    if (!offset || !Array.isArray(offset) || offset.length < 2) return {}

    /* 确保offset是[x, y]形式的二元组 */
    const [offsetXValue, offsetYValue] = offset as [number | string, number | string]

    /* 处理偏移量值 */
    const offsetX = typeof offsetXValue === 'number' ? `${offsetXValue}px` : offsetXValue
    const offsetY = typeof offsetYValue === 'number' ? `${offsetYValue}px` : offsetYValue

    /* 根据徽章类型设置不同的CSS变量 */
    if (props.dot) return {
      '--bn-badge-dot-offset-x': offsetX,
      '--bn-badge-dot-offset-y': offsetY
    }

    return {
      '--bn-badge-offset-x': offsetX,
      '--bn-badge-offset-y': offsetY
    }
  })

  return {
    badgeSupStyle
  }
}
