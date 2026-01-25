/**
 * ******************************************************
 * @file                     badge.tsx
 * @description             「徽章组件实现」
 * 实现一个符合设计规范的徽章组件
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { computed, defineComponent } from 'vue'

import { useBadgeClass } from './composables/use-badge-class'
import { useBadgeEvent } from './composables/use-badge-event'
import { useBadgePreset } from './composables/use-badge-preset'
import { type BadgeProps, createBadgeProps } from './props'

// ==================================================
// #region 组件定义
// ==================================================

export const BnBadge = defineComponent<BadgeProps>({
  name: 'BnBadge',
  props: createBadgeProps({
    offset: ['50%', '-50%'] as [string, string],
    shape: 'circle'
  }),
  setup(props, { slots }) {
    // ==================================================
    // #region 组合式函数
    // ==================================================

    /* 处理预设配置 */
    const { config, displayCount } = useBadgePreset(props)

    /* 处理类名 */
    const { badgeClass, badgeContentClass, badgeSupClass } = useBadgeClass(config)

    /* 处理事件 */
    const { handleClick, handleMouseEnter, handleMouseLeave } = useBadgeEvent(config)

    /* 处理徽章偏移量样式 */
    const badgeSupStyle = computed(() => {
      /* 获取偏移量 */
      const offset = config.value.offset || props.offset

      /* 防御式编程：验证offset参数是否合法 */
      if (!offset || !Array.isArray(offset) || offset.length < 2) return {}

      /* 确保offset是[x, y]形式的二元组 */
      const [offsetXValue, offsetYValue] = offset as [number | string, number | string]

      /* 处理偏移量值，如果是数字则添加px单位，如果是字符串则直接使用 */
      const offsetX = typeof offsetXValue === 'number' ? `${offsetXValue}px` : offsetXValue
      const offsetY = typeof offsetYValue === 'number' ? `${offsetYValue}px` : offsetYValue

      /* 根据徽章类型设置不同的CSS变量 */
      if (props.dot) {
        /* 点模式使用dot-offset变量 */
        return {
          '--bn-badge-dot-offset-x': offsetX,
          '--bn-badge-dot-offset-y': offsetY
        }
      } else {
        /* 普通徽章使用offset变量 */
        return {
          '--bn-badge-offset-x': offsetX,
          '--bn-badge-offset-y': offsetY
        }
      }
    })

    /* 判断是否为独立的状态点 */
    const isStandalone = computed(() => {
      return !slots.default && (!!props.status || displayCount.value !== null)
    })

    /* #endregion */
    // ==================================================

    // ==================================================
    /* #region 渲染函数 */
    // ==================================================

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
      /* 防御式渲染：没有计数且不是点模式和状态模式时不渲染 */
      if (displayCount.value === null && !props.dot && !props.status) return null

      /* 渲染徽章内容 */
      return (
        <sup class={badgeSupClass.value} style={badgeSupStyle.value}>
          {/* 仅在非点模式且有显示计数时才渲染数字 */}
          {!props.dot && displayCount.value !== null && displayCount.value}
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
            {/* 防御式渲染：确保插槽存在才渲染 */}
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
    // ==================================================
  }
})

// #endregion
// ==================================================

export default BnBadge
