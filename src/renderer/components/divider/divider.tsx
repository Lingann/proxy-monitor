/**
 * ******************************************************
 * @file                     divider.tsx
 * @description             「分割线组件实现」
 * 实现一个符合设计规范的分割线组件
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { computed, defineComponent } from 'vue'

import { useDividerClass } from './composables/use-divider-class'
import { useDividerEvent } from './composables/use-divider-event'
import { createDividerProps, type DividerProps } from './props'

// ==================================================
// #region 组件定义
// ==================================================

export const BnDivider = defineComponent<DividerProps>({
  name: 'BnDivider',
  props: createDividerProps(),
  setup(props, { slots }) {
    // ==================================================
    // #region 组合式函数
    // ==================================================

    /* 处理类名 */
    const { dividerClass, dividerInnerClass } = useDividerClass(props)

    /* 处理事件 */
    const { handleClick } = useDividerEvent(props)

    /* 处理orientation margin样式 */
    const orientationMarginStyle = computed(() => {
      if (!props.orientationMargin || !props.orientation || props.orientation === 'center') return {}

      /* 根据方向设置不同的边距样式 */
      const marginValue = typeof props.orientationMargin === 'number'
        ? `${props.orientationMargin}px`
        : props.orientationMargin

      /* 设置CSS变量 */
      if (props.orientation === 'left') {
        return {
          '--bn-divider-orientation-left-width': marginValue
        }
      }

      if (props.orientation === 'right') {
        return {
          '--bn-divider-orientation-right-width': marginValue
        }
      }

      return {}
    })

    /* 判断是否有内容 */
    const hasInnerContent = computed(() => !!slots.default)

    /* #endregion */
    // ==================================================

    // ==================================================
    /* #region 渲染函数 */
    // ==================================================

    return () => (
      <div
        class={dividerClass.value}
        style={orientationMarginStyle.value}
        onClick={handleClick}
      >
        {hasInnerContent.value && props.type !== 'vertical' && (
          <span class={dividerInnerClass.value}>
            {slots.default && slots.default()}
          </span>
        )}
      </div>
    )

    /* #endregion */
    // ==================================================
  }
})

// #endregion
// ==================================================

export default BnDivider
