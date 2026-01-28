/**
 * ******************************************************
 * @file                     use-wave-animation.ts
 * @description             「波纹动画管理组合式函数」
 * 管理波纹效果的创建和清理
 * @author                  blancnova-web
 * ******************************************************
 */

import type { Ref } from 'vue'

import type { ShadowWaveOptions } from '../bn-shadow-wave'

// ==================================================
// #region 类型定义
// ==================================================

export interface WaveAnimationInstance {

  /** 创建波纹元素 */
  createWaveElement: (options: ShadowWaveOptions) => HTMLDivElement

  /** 清理波纹元素 */
  cleanupWave: (wave: HTMLDivElement | null) => void
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 波纹动画管理
 * @param _container - 「容器引用」波纹效果容器
 * @returns 「动画控制方法」创建和清理波纹
 * @complexity O(1) - 常量级DOM操作
 */
export const useWaveAnimation = (_container: Ref<HTMLDivElement | null>): WaveAnimationInstance => {

  /**
   * 创建波纹元素
   * @param options - 「配置选项」波纹效果配置
   * @returns 「波纹元素」新创建的DOM元素
   */
  const createWaveElement = (options: ShadowWaveOptions): HTMLDivElement => {
    const wave = document.createElement('div')
    wave.className = 'bn-shadow-wave__circle'
    wave.style.setProperty('--shadow-color', options.color ?? 'rgba(24, 144, 255, 0.4)')
    wave.style.setProperty('--shadow-spread', `${options.spread ?? 8}px`)
    wave.style.animationDuration = `${options.duration ?? 500}ms`
    return wave
  }

  /**
   * 清理波纹元素
   * @param wave - 「波纹元素」待清理的DOM元素
   */
  const cleanupWave = (wave: HTMLDivElement | null): void => {
    if (wave) {
      wave.remove()
    }
  }

  return {
    createWaveElement,
    cleanupWave
  }
}

// #endregion
// ==================================================
