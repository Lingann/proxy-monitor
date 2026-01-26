/**
 * ******************************************************
 * @file                     use-input-event.ts
 * @description             「输入框事件处理组合式函数」
 * 提供输入框的事件处理逻辑
 * @author                  blancnova-web
 * ******************************************************
 */

import { ref } from 'vue'

import type { InputProps } from '../props/input-props'

// ==================================================
// #region 事件处理组合式函数
// ==================================================

/**
 * 创建输入框事件处理函数
 * @param props - 「组件属性」包含事件回调和配置
 * @param maxLength - 「最大长度」输入框允许的最大字符数
 * @returns 「事件处理函数集合」包含所有输入框相关事件处理函数
 * @complexity O(1) - 常量级函数创建
 */
export const useInputEvent = (
  props: InputProps,
  maxLength?: number
) => {
  /* 焦点状态 */
  const focused = ref(false)

  /**
   * 处理输入事件
   * @param value - 「输入值」用户输入的内容
   */
  const handleInput = (value: string) => {
    /* 如果没有最大长度限制，直接更新 */
    if (!maxLength) {
      props.onUpdateModelValue?.(value)
      props.onInput?.(value)
      return
    }

    /* 如果新值长度超过最大长度，截断到最大长度 */
    if (value.length > maxLength) {
      const truncatedValue = value.slice(0, maxLength)

      props.onUpdateModelValue?.(truncatedValue)
      props.onInput?.(truncatedValue)
      return
    }

    /* 正常更新 */
    props.onUpdateModelValue?.(value)
    props.onInput?.(value)
  }

  /**
   * 处理变更事件
   * @param event - 「变更事件对象」原生change事件
   */
  const handleChange = (event: Event) => {
    props.onChange?.(event)
  }

  /**
   * 处理焦点事件
   * @param event - 「焦点事件对象」原生focus事件
   */
  const handleFocus = (event: FocusEvent) => {
    focused.value = true

    props.onFocus?.(event)
  }

  /**
   * 处理失焦事件
   * @param event - 「失焦事件对象」原生blur事件
   * @param trim - 「是否去除首尾空格」是否在失焦时自动去除首尾空格
   * @param currentValue - 「当前值」输入框的当前值
   */
  const handleBlur = (event: FocusEvent, trim?: boolean, currentValue?: string) => {
    focused.value = false

    /* 如果启用trim，则在失去焦点时去除首尾空格 */
    if (trim && currentValue) {
      const trimmedValue = currentValue.trim()

      if (trimmedValue !== currentValue) {
        props.onUpdateModelValue?.(trimmedValue)
        props.onChange?.(event)
      }
    }

    props.onBlur?.(event)
  }

  /**
   * 处理清除事件
   */
  const handleClear = () => {
    props.onClear?.()
    props.onUpdateModelValue?.('')
  }

  return {
    focused,
    handleInput,
    handleChange,
    handleFocus,
    handleBlur,
    handleClear
  }
}

// #endregion
// ==================================================
