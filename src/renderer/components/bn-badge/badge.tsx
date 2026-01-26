/* ****************************************************** */
/* @file                     badge.tsx */
/* @description             「徽章组件实现」 */
/* 实现一个符合设计规范的徽章组件 */
/* @author                  blancnova-web */
/* ****************************************************** */

import './styles/index.scss'

import { computed, defineComponent } from 'vue'

import {
  useBadgeClass,
  useBadgeEvent,
  useBadgeModelValue,
  useBadgeOffsetStyle,
  useBadgePreset,
  useBadgeStandalone
} from './composables'

import { type BadgeProps, createBadgeProps } from './props/badge-props'
import type { BadgeEmitFn } from './types'

/* ================================================== */
/* #region 组件定义 */
/* ================================================== */

export const BnBadge = defineComponent<BadgeProps>({
  name: 'BnBadge',

  props: createBadgeProps({
    offset: ['50%', '-50%'] as [string, string],
    shape: 'circle'
  }),

  emits: ['update:modelValue', 'update:count', 'click', 'mouseenter', 'mouseleave'] as const,

  setup(props, { emit, slots }) {
    /* ================================================== */
    /* #region 组合式函数 */
    /* ================================================== */

    /* 处理预设配置 */
    const { countValue, syncModelValue } = useBadgeModelValue(props, emit as BadgeEmitFn)

    const { config, displayCount } = useBadgePreset(props, countValue)

    /* 处理类名 */
    const { badgeClass, badgeContentClass, badgeSupClass } = useBadgeClass(config)

    /* 处理偏移样式 */
    const { badgeSupStyle } = useBadgeOffsetStyle(config, props)

    /* 判断插槽状态 */
    const hasDefaultSlot = computed(() => !!slots.default)

    /* 判断独立渲染模式 */
    const { isStandalone } = useBadgeStandalone(props, displayCount, hasDefaultSlot)

    /* 处理事件 */
    const { handleClick, handleMouseEnter, handleMouseLeave } = useBadgeEvent(config, props, emit as BadgeEmitFn, countValue, syncModelValue)

    /* #endregion */
    /* ================================================== */

    /* ================================================== */
    /* #region 渲染函数 */
    /* ================================================== */

    /* 渲染状态点 */
    const renderStatusDot = () => {
      /* 防御式渲染：确保status存在 */
      if (!props.status) return null

      return (
        <div class={badgeSupClass.value} style={badgeSupStyle.value}>
          {/* 状态点无需内容 */}
        </div>
      )
    }

    /* 渲染文本 */
    const renderText = () => {
      /* 防御式渲染：确保text存在 */
      if (!props.text) return null

      return <span class="bn-badge__text">{props.text}</span>
    }

    /* 渲染徽章计数 */
    const renderBadgeCount = () => {
      if (props.status) return null

      if (props.dot) return <sup class={badgeSupClass.value} style={badgeSupStyle.value} />

      if (displayCount.value === null) return null

      /* 渲染徽章内容 */
      return (
        <sup class={badgeSupClass.value} style={badgeSupStyle.value}>
          {displayCount.value}
        </sup>
      )
    }

    /* 渲染独立徽章 */
    const renderStandalone = () => {
      return (
        <span
          class={badgeClass.value}
          onClick={handleClick}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          {renderStatusDot()}

          {renderBadgeCount()}

          {renderText()}
        </span>
      )
    }

    /* 渲染带内容的徽章 */
    const renderWithContent = () => {
      return (
        <span
          class={badgeClass.value}
          onClick={handleClick}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          <span class={badgeContentClass.value}>
            {slots.default && slots.default()}
          </span>

          {renderBadgeCount()}
        </span>
      )
    }

    return () => {
      /* 根据是否有内容决定渲染模式 */
      return isStandalone.value ? renderStandalone() : renderWithContent()
    }

    /* #endregion */
    /* ================================================== */
  }
})

/* #endregion */
/* ================================================== */

export default BnBadge
