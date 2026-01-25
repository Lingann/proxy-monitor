/**
 * ******************************************************
 * @file                     use-badge-preset.ts
 * @description             「徽章组件预设配置」
 * 处理徽章组件预设
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { BadgeProps } from '../props'
import type { BadgeConfig, BadgePresetMap } from '../types'

// ==================================================
// #region 预设配置
// ==================================================

/**
 * 徽章预设配置
 */
const BADGE_PRESET_MAP: BadgePresetMap = {
  default: {
    color: 'default'
  },
  primary: {
    color: 'primary'
  },
  danger: {
    color: 'danger'
  },
  success: {
    color: 'success'
  },
  warning: {
    color: 'warning'
  }
}

// #endregion
// ==================================================

// ==================================================
// #region 预设处理函数
// ==================================================

/**
 * 使用徽章预设
 * @param props - 「徽章Props」徽章组件Props
 * @returns 「徽章配置」合并预设后的配置
 */
export function useBadgePreset(props: BadgeProps) {

  /**
   * 合并预设配置
   */
  const config = computed<BadgeConfig>(() => {
    // 基础配置
    const baseConfig: BadgeConfig = {
      show: props.show ?? true,
      dot: props.dot ?? false,
      count: props.count,
      overflowCount: props.overflowCount,
      showZero: props.showZero,
      status: props.status,
      text: props.text,
      offset: props.offset
    }

    // 预设配置
    const presetKey = props.preset || 'default'
    const presetConfig = BADGE_PRESET_MAP[presetKey] || BADGE_PRESET_MAP.default

    // 合并配置，用户设置覆盖预设
    return {
      ...presetConfig,
      ...baseConfig,
      // 显式设置的属性优先级最高
      color: props.color || presetConfig.color,
      size: props.size || presetConfig.size,
      shape: props.shape || presetConfig.shape
    }
  })

  /**
   * 处理显示的计数
   */
  const displayCount = computed(() => {
    if (config.value.dot) {
      return null
    }

    if (config.value.status) {
      return null
    }

    const count = config.value.count
    const overflowCount = config.value.overflowCount ?? 99

    // 处理count为0的情况
    if ((count === 0 || count === '0') && !config.value.showZero) {
      return null
    }

    // 处理数字溢出
    if (typeof count === 'number' && count > overflowCount) {
      return `${overflowCount}+`
    }

    return count
  })

  return {
    config,
    displayCount
  }
}

// #endregion
// ==================================================
