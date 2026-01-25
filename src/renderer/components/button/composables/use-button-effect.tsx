/**
 * ******************************************************
 * @file                     use-button-effect.tsx
 * @description             「按钮效果Hook」
 * 根据effect属性返回对应的效果组件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ComputedRef, FunctionalComponent } from 'vue'
import { ref } from 'vue'

import type { RippleWaveInstance } from '../../ripple-wave'
import { BnRippleWave } from '../../ripple-wave'
import type { ShadowWaveInstance } from '../../shadow-wave'
import { BnShadowWave } from '../../shadow-wave'
import type { ButtonProps } from '../props'
import type { ButtonEmitter } from '../types'

interface EffectOptions {

  /** 动画持续时间(ms) */
  duration?: number

  /** 效果颜色 */
  color?: string

  /** 最大缩放比例/阴影扩散范围 */
  scale?: number
}

interface EffectProps {

  /** 按钮配置 */
  config: ButtonProps

  /** 特效选项 */
  options?: EffectOptions

  /** 事件发射器 */
  emitter: ButtonEmitter
}

/**
 * 按钮效果Hook
 * @param config - 「按钮配置」包含合并后的预设和用户配置
 * @param options - 「特效选项」自定义特效参数
 * @returns 「效果组件」根据effect返回对应的效果组件
 * @complexity O(1) - 常量级计算
 */
export function useButtonEffect(_config: ComputedRef<ButtonProps>) {
  const rippleOptions = {
    duration: 400,
    color: 'rgba(var(--bn-primary-inner-5), 0.3)',
    scale: 2
  }

  const shadowOptions = {
    duration: 400,
    color: 'rgba(var(--bn-primary-inner-5), 0.3)',
    scale: 8
  }

  /**
   * 获取效果组件
   * @param props - 「组件属性」包含配置选项
   * @returns 「效果组件」根据effect返回对应的效果组件
   */
  const EffectComponent: FunctionalComponent<EffectProps> = (props: EffectProps) => {
    const { effect, variant, color } = props.config

    // 提前返回 - 无效果
    if (!effect) return null

    // 提前返回 - 无效果
    if (variant === 'link' || variant === 'text') return null

    // 计算颜色
    const rippleColor = color !== 'default' ? `rgba(var(--bn-${color}-inner-5), 0.3)` : 'var(--bn-border-color-base)'
    const shadowColor = color !== 'default' ? `rgba(var(--bn-${color}-inner-5), 0.3)` : 'var(--bn-border-color-base)'

    const rippleRef = ref<RippleWaveInstance | null>(null)
    const shadowRef = ref<ShadowWaveInstance | null>(null)

    const triggerRipple = (event?: MouseEvent) => {
      rippleRef.value?.trigger(event)
    }

    const triggerShadow = (event?: MouseEvent) => {
      shadowRef.value?.trigger(event)
      console.log('triggerShadow')
    }

    props.emitter.on('click', triggerRipple)
    props.emitter.on('click', triggerShadow)

    // 根据effect返回对应组件
    switch (effect) {
      case 'ripple':
        return (
          <BnRippleWave
            enabled={true}
            options={{
              ...rippleOptions,
              color: rippleColor
            }}
            ref={rippleRef}
          />
        )
      case 'shadow':
        return (
          <BnShadowWave
            enabled={true}
            options={{
              ...shadowOptions,
              color: shadowColor
            }}
            ref={shadowRef}
          />
        )
      default:
        return null
    }
  }

  return {
    EffectComponent
  }
}
