/**
 * ******************************************************
 * @file                     button.tsx
 * @description             「按钮组件实现」
 * 实现一个功能完整、类型安全的按钮组件
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { defineComponent, ref } from 'vue'

import { useButtonClass } from './composables/use-button-class'
import { useButtonEffect } from './composables/use-button-effect'
import { useButtonEvent } from './composables/use-button-event'
import { useButtonPreset } from './composables/use-button-preset'
import { createButtonProps } from './props/button-props'
// ==================================================
// #region 组件定义
// ==================================================

export const BnButton = defineComponent({
  name: 'BnButton',
  props: createButtonProps(),
  setup(props, { slots }) {
    // ==================================================
    // #region 组合式函数
    // ==================================================

    /* 处理预设配置 */
    const { config } = useButtonPreset(props)

    const { buttonClass } = useButtonClass(config)

    const { handleClick, emitter } = useButtonEvent(config)

    const { EffectComponent } = useButtonEffect(config)

    const buttonRef = ref<HTMLElement | null>(null)

    /* #endregion */
    // ==================================================

    // ==================================================
    /* #region 渲染函数 */
    // ==================================================

    return () => (
      <button
        aria-label={props['aria-label']}
        class={[
          buttonClass.value,
          props.size && `bn-btn-${props.size}`,
          props.shape && `bn-btn-${props.shape}`,
          props.effect && `bn-btn-effect-${props.effect}`,
          props.loading && 'bn-btn-loading',
          props.disabled && 'bn-btn-disabled'
        ]}
        disabled={props.disabled || props.loading}
        name={props.name}
        ref={buttonRef}
        role={props.role}
        type={props.type}
        onClick={handleClick}
      >
        {/* 加载状态 */}
        {props.loading && (
          <span class="bn-btn__loading">
            <i class="bn-btn__loading-icon" />
          </span>
        )}

        {/* 图标 */}
        {!props.loading && props.icon && (
          <span class="bn-btn__icon">
            <i class={props.icon} />
          </span>
        )}

        {/* 文本内容 */}
        {slots.default && (
          <span class="bn-btn__text">
            {slots.default()}
          </span>
        )}

        {/* 效果组件 */}
        {EffectComponent && <EffectComponent config={config.value} emitter={emitter} />}
      </button>
    )

    /* #endregion */
    // ==================================================
  }
})

// #endregion
// ==================================================

export default BnButton
