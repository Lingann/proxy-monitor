/**
 * ******************************************************
 * @file                     use-ripple-animation.ts
 * @description             「波纹动画管理组合式函数」
 * 管理波纹效果的创建和清理
 * @author                  blancnova-web
 * ******************************************************
 */

import type { Ref } from 'vue'

import type { RippleWaveOptions } from '../bn-ripple-wave'

// ==================================================
// #region 类型定义
// ==================================================

export interface RippleAnimationInstance {

  /** 创建波纹元素 */
  createWaveElement: (options: RippleWaveOptions, event: MouseEvent, container: HTMLDivElement) => HTMLDivElement

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
export const useRippleAnimation = (_container: Ref<HTMLDivElement | null>): RippleAnimationInstance => {

  /**
   * 创建波纹元素
   * @param options - 「配置选项」波纹效果配置
   * @param event - 「鼠标事件」点击事件对象
   * @param container - 「容器元素」波纹效果容器
   * @returns 「波纹元素」新创建的DOM元素
   */
  const createWaveElement = (
    options: RippleWaveOptions,
    event: MouseEvent,
    container: HTMLDivElement
  ): HTMLDivElement => {
    const { color = 'rgba(135, 21, 21, 0.35)', duration = 600 } = options

    // 获取容器位置和尺寸
    const rect = container.getBoundingClientRect()

    // 计算点击位置相对于容器的坐标
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // 创建波纹元素
    const wave = document.createElement('div')
    wave.className = 'bn-ripple-wave__circle'
    wave.style.backgroundColor = color
    wave.style.animationDuration = `${duration}ms`

    // 设置波纹大小和位置
    const size = Math.max(rect.width, rect.height)
    wave.style.width = `${size}px`
    wave.style.height = `${size}px`
    wave.style.left = `${x}px`
    wave.style.top = `${y}px`

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
