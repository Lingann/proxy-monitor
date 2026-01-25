/**
 * ******************************************************
 * @file                     use-badge-class.ts
 * @description             「徽章组件类名处理」
 * 处理徽章组件类名
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { BadgeConfig } from '../types'

// ==================================================
// #region 类名处理函数
// ==================================================

/**
 * 使用徽章类名
 * @param config - 「徽章配置」所有徽章配置
 * @returns 「类名计算属性」computed类名
 */
export function useBadgeClass(config: ComputedRef<BadgeConfig>) {
  const badgeClass = computed(() => {
    const classes: string[] = ['bn-badge']

    // 添加尺寸类名
    if (config.value.size) {
      classes.push(`bn-badge--${config.value.size}`)
    }

    // 添加颜色类名
    if (config.value.color) {
      classes.push(`bn-badge--${config.value.color}`)
    }

    // 添加形状类名
    if (config.value.shape) {
      classes.push(`bn-badge--${config.value.shape}`)
    }

    // 添加点模式类名
    if (config.value.dot) {
      classes.push('bn-badge--dot')
    }

    // 添加状态类名
    if (config.value.status) {
      classes.push('bn-badge--status')
      classes.push(`bn-badge--status-${config.value.status}`)
    }

    return classes
  })

  const badgeContentClass = computed(() => {
    return ['bn-badge__content']
  })

  const badgeSupClass = computed(() => {
    const classes: string[] = ['bn-badge__sup']

    // 添加尺寸类名
    if (config.value.size) {
      classes.push(`bn-badge__sup--${config.value.size}`)
    }

    // 添加颜色类名
    if (config.value.color) {
      classes.push(`bn-badge__sup--${config.value.color}`)
    }

    // 添加形状类名
    if (config.value.shape) {
      classes.push(`bn-badge__sup--${config.value.shape}`)
    }

    // 添加点模式类名
    if (config.value.dot) {
      classes.push('bn-badge__sup--dot')
    }

    // 添加状态类名
    if (config.value.status) {
      classes.push(`bn-badge__sup--status-${config.value.status}`)
    }

    // 添加隐藏类名（count为0且不显示0值）
    if (
      (config.value.count === 0 || config.value.count === '0') &&
      !config.value.showZero &&
      !config.value.dot &&
      !config.value.status
    ) {
      classes.push('bn-badge__sup--hidden')
    }

    // 添加是否显示类名
    if (!config.value.show) {
      classes.push('bn-badge__sup--hidden')
    }

    return classes
  })

  return {
    badgeClass,
    badgeContentClass,
    badgeSupClass
  }
}

// #endregion
// ==================================================
