/**
 * ******************************************************
 * @file                     ripple-wave.tsx
 * @description             「波纹效果组件」
 * 使用纯CSS动画实现波纹效果，采用函数式编程范式
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { defineComponent, onBeforeUnmount, ref } from 'vue'

import { debounce } from '../../utils'
import { useRippleAnimation, useRippleState } from './composables'

// ==================================================
// #region 类型定义
// ==================================================

export interface RippleWaveOptions {

  /** 动画持续时间(ms) */
  duration?: number

  /** 波纹颜色 */
  color?: string

  /** 最大缩放比例 */
  maxScale?: number
}

export interface RippleWaveProps {

  /** 是否启用波纹效果 */
  enabled?: boolean

  /** 特效选项 */
  options?: RippleWaveOptions
}

export interface RippleWaveInstance {

  /** 触发波纹效果 */
  trigger: (event?: MouseEvent) => void
}

// #endregion
// ==================================================

// ==================================================
// #region 组件实现
// ==================================================

/**
 * 波纹效果组件
 * @param props - 「组件属性」包含配置选项
 * @returns 「组件实例」包含波纹效果控制方法
 * @complexity O(1) - 常量级计算
 */
export const BnRippleWave = defineComponent({
  name: 'BnRippleWave',
  props: {
    enabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object as () => RippleWaveOptions,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    const waveContainer = ref<HTMLDivElement | null>(null)
    const { state, resetState } = useRippleState()
    const { createWaveElement, cleanupWave } = useRippleAnimation(waveContainer)

    /**
     * 处理波纹动画结束
     */
    const handleAnimationEnd = () => {
      cleanupWave(state.currentWave)
    }

    /**
     * 创建波纹效果
     * @param event - 「鼠标事件」点击事件对象
     */
    const createWave = debounce((event?: MouseEvent) => {
      try {
        // 提前返回 - 无事件或容器未就绪
        if (!event || !waveContainer.value) return

        // 清理之前的波纹
        cleanupWave(state.currentWave)

        // 创建新波纹
        const wave = createWaveElement(props.options, event, waveContainer.value)
        wave.addEventListener('animationend', handleAnimationEnd)
        waveContainer.value.appendChild(wave)
        state.currentWave = wave
      } catch (error) {
        console.error('[BnRippleWave] 波纹效果创建失败:', error)
      }
    }, 100)

    // 组件卸载前清理
    onBeforeUnmount(() => {
      cleanupWave(state.currentWave)
      resetState()
    })

    // 暴露trigger方法
    expose({
      trigger: createWave
    })

    return () => {
      // 提前返回 - 未启用波纹效果
      if (!props.enabled) return null

      return (
        <div
          class="bn-ripple-wave"
          ref={waveContainer}
        />
      )
    }
  }
})

// #endregion
// ==================================================

export default BnRippleWave
