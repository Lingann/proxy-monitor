/**
 * ******************************************************
 * @file                     use-divider-class.ts
 * @description             「分割线组件类名处理」
 * 处理分割线组件类名
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'

import type { DividerProps } from '../props'

// ==================================================
// #region 类名处理函数
// ==================================================

/**
 * 使用分割线类名
 * @param props - 「分割线Props」组件属性
 * @returns 「类名计算属性」computed类名
 */
export function useDividerClass(props: DividerProps) {

  /**
   * 分割线主类名
   */
  const dividerClass = computed(() => {
    const classes: string[] = ['bn-divider']

    // 添加类型类名
    if (props.type) {
      classes.push(`bn-divider--${props.type}`)
    }

    // 添加方向类名
    if (props.orientation) {
      classes.push(`bn-divider--${props.orientation}`)
    }

    // 添加是否为普通文本样式类名
    if (props.plain) {
      classes.push('bn-divider--plain')
    }

    // 添加虚线样式类名
    if (props.dashed || props.dash) {
      classes.push('bn-divider--dashed')
    }

    // 添加样式类名
    if (props.style && props.style !== 'solid' && !props.dashed && !props.dash) {
      classes.push(`bn-divider--${props.style}`)
    }

    return classes
  })

  /**
   * 分割线内容类名
   */
  const dividerInnerClass = computed(() => {
    return ['bn-divider__inner']
  })

  return {
    dividerClass,
    dividerInnerClass
  }
}

// #endregion
// ==================================================
