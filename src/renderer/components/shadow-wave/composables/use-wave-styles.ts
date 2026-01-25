/**
 * ******************************************************
 * @file                     use-wave-styles.ts
 * @description             「波纹样式计算组合式函数」
 * 计算波纹效果的样式变量
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'

import type { ShadowWaveOptions } from '../shadow-wave'

// ==================================================
// #region 类型定义
// ==================================================

export interface WaveStyles {

  /** 阴影颜色 */
  '--shadow-color': string

  /** 阴影扩散范围 */
  '--shadow-spread': string

  /** 动画持续时间 */
  '--animation-duration': string
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 波纹样式计算
 * @param options - 「配置选项」波纹效果配置
 * @returns 「计算样式」CSS变量样式对象
 * @complexity O(1) - 常量级样式计算
 */
export const useWaveStyles = (options: ShadowWaveOptions) => {
  const styles = computed<WaveStyles>(() => ({
    '--shadow-color': options.color ?? 'rgba(24, 144, 255, 0.4)',
    '--shadow-spread': `${options.spread ?? 8}px`,
    '--animation-duration': `${options.duration ?? 500}ms`
  }))

  return styles
}

// #endregion
// ==================================================
