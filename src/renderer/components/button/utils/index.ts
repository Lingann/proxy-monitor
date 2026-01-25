/**
 * ******************************************************
 * @file                     utils.ts
 * @description             「按钮工具函数」
 * 包含按钮组件相关的工具函数
 * @author                  blancnova-web
 * ******************************************************
 */

import { buttonPresets } from '../composables/use-button-preset'
import type { ButtonPreset, ButtonPresetConfig } from '../types'

// ==================================================
// #region 预设处理
// ==================================================

/**
 * 合并按钮配置
 * @description 合并预设配置和用户配置，用户配置优先级高于预设配置
 * @param preset - 「预设类型」按钮预设类型
 * @param userConfig - 「用户配置」用户传入的配置
 * @returns 「合并后的配置」合并后的完整配置
 * @complexity O(1) - 常量级配置合并
 */
export function mergeButtonConfig(
  preset: ButtonPreset,
  userConfig: Partial<ButtonPresetConfig>
): ButtonPresetConfig {
  // 获取预设配置
  const presetConfig = buttonPresets[preset]

  // 过滤掉 undefined 的用户配置
  const validUserConfig = Object.fromEntries(
    Object.entries(userConfig).filter(([_, value]) => value !== undefined)
  )

  // 合并配置，用户配置优先级更高
  return {
    ...presetConfig,
    ...validUserConfig
  }
}

// #endregion
// ==================================================
