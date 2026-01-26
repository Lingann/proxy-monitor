/**
 * ******************************************************
 * @file                     shadow-wave.tsx
 * @description             「阴影波纹效果组件」
 * 使用纯CSS动画实现阴影波纹效果，采用函数式编程范式
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { CSSProperties, defineComponent, nextTick, onBeforeUnmount, ref } from 'vue'

import { debounce } from '../../utils'
import { useWaveAnimation, useWaveState, useWaveStyles } from './composables'

// ==================================================
// #region 类型定义
// ==================================================

export interface ShadowWaveOptions {

  /** 动画持续时间(ms) */
  duration?: number

  /** 阴影颜色 */
  color?: string

  /** 阴影扩散范围(px) */
  spread?: number
}

export interface ShadowWaveProps {

  /** 是否启用阴影波纹效果 */
  enabled?: boolean

  /** 特效选项 */
  options?: ShadowWaveOptions
}

export interface ShadowWaveInstance {

  /** 触发阴影波纹效果 */
  trigger: (event?: MouseEvent) => void
}

// #endregion
// ==================================================

// ==================================================
// #region 组件实现
// ==================================================

/**
 * 阴影波纹效果组件
 * @param props - 「组件属性」包含配置选项
 * @returns 「组件实例」包含阴影波纹效果控制方法
 * @complexity O(1) - 常量级计算
 */
export const BnShadowWave = defineComponent({
  name: 'BnShadowWave',
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object as () => ShadowWaveOptions,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    const {
      duration = 500,
      color = 'rgba(24, 144, 255, 0.4)',
      spread = 8
    } = props.options

    const waveContainer = ref<HTMLDivElement | null>(null)
    const { state, resetState } = useWaveState()
    const { createWaveElement, cleanupWave } = useWaveAnimation(waveContainer)
    const styles = useWaveStyles({ duration, color, spread })

    /**
     * 处理波纹动画结束
     */
    const handleAnimationEnd = () => {
      cleanupWave(state.currentWave)
      state.waveCount--

      if (state.waveCount === 0) {
        state.isAnimating = false
        state.isInitialized = false
      }
    }

    /**
     * 创建阴影波纹效果
     * @param event - 「鼠标事件」点击事件对象
     */
    const createWave = debounce((_event?: MouseEvent) => {
      try {
        if (!state.isInitialized) {
          state.isInitialized = true
        }

        nextTick(() => {
          // 提前返回 - 容器未就绪
          if (!waveContainer.value) return

          // 清理之前的波纹
          cleanupWave(state.currentWave)

          state.isAnimating = true
          state.waveCount++

          // 创建新波纹
          const wave = createWaveElement({ duration, color, spread })
          wave.addEventListener('animationend', handleAnimationEnd)
          waveContainer.value.appendChild(wave)
          state.currentWave = wave
        })
      } catch (error) {
        console.error('[BnShadowWave] 波纹效果创建失败:', error)
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
      // 提前返回 - 未启用效果
      if (!props.enabled) return null

      // 提前返回 - 未初始化
      if (!state.isInitialized) return null

      return (
        <div
          class="bn-shadow-wave"
          ref={waveContainer}
          style={styles.value}
        />
      )
    }
  }
})

// #endregion
// ==================================================

export default BnShadowWave
