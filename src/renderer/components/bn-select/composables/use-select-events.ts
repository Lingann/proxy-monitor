/**
 * ******************************************************
 * @file                     use-select-events.ts
 * @description             「选择器事件处理」
 * 处理选择器的各种事件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { Ref } from 'vue'

import type { SelectProps } from '../props/select-props'
import type { SelectOption } from '../types'

// ==================================================
// #region 事件处理
// ==================================================

/**
 * 选择器事件处理参数
 */
export interface UseSelectEventsParams {
  props: SelectProps
  isOpen: Ref<boolean>
  close: () => void
}

/**
 * 选择器事件处理
 * @param params - 事件处理参数
 * @returns 事件处理方法
 */
export function useSelectEvents(params: UseSelectEventsParams) {
  const { props, close } = params

  /**
   * 处理选项选择
   */
  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return

    /* 调用 Props 回调 */
    props.onUpdateModelValue?.(option.value)

    props.onChange?.(option.value, option)

    /* 关闭下拉框 */
    close()
  }

  /**
   * 处理清空
   */
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()

    /* 调用 Props 回调 */
    props.onUpdateModelValue?.(null)

    props.onClear?.()
  }

  /**
   * 处理获得焦点
   */
  const handleFocus = (e: FocusEvent) => {
    props.onFocus?.(e)
  }

  /**
   * 处理失去焦点
   */
  const handleBlur = (e: FocusEvent) => {
    props.onBlur?.(e)
  }

  return {
    handleSelect,
    handleClear,
    handleFocus,
    handleBlur
  }
}

// #endregion
// ==================================================
