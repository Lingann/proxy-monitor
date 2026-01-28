/**
 * ******************************************************
 * @file                     use-divider-event.ts
 * @description             「分割线组件事件处理」
 * 处理分割线组件事件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { DividerProps } from '../props'

// ==================================================
// #region 事件处理函数
// ==================================================

/**
 * 使用分割线事件
 * @param props - 「分割线Props」组件属性
 * @returns 「事件处理函数」组件事件处理函数集合
 */
export function useDividerEvent(
  props: DividerProps
) {

  /**
   * 点击事件处理
   * @param e - 「鼠标事件」原生事件对象
   */
  const handleClick = (e: MouseEvent) => {
    props.onClick?.(e)
  }

  return {
    handleClick
  }
}

// #endregion
// ==================================================
