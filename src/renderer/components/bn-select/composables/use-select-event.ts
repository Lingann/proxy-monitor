/* ****************************************************** */
/* 文件: use-select-event.ts */
/* 描述: 选择器事件处理 */
/* 处理选择器的各种事件 */
/* 作者: blancnova-web */
/* ****************************************************** */

import type { SelectProps } from '../props/select-props'
import type { SelectOption } from '../types'

/* 事件处理参数 */
export interface UseSelectEventParams {
  props: SelectProps

  close: () => void
}

/* 更新事件类型 */
export type SelectUpdateEmit = (event: 'update:modelValue', value: string | number | null) => void

/* 选择器事件处理 */
export function useSelectEvent(params: UseSelectEventParams, emit: SelectUpdateEmit) {
  const { props, close } = params

  /* 处理选项选择 */
  const handleSelect = (option: SelectOption) => {
    if (props.disabled) return

    if (option.disabled) return

    /* 触发更新事件 */
    emit('update:modelValue', option.value)

    props.onChange?.(option.value, option)

    /* 关闭下拉框 */
    close()
  }

  /* 处理清空 */
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()

    if (props.disabled) return

    /* 触发更新事件 */
    emit('update:modelValue', null)

    props.onClear?.()
  }

  /* 处理获得焦点 */
  const handleFocus = (e: FocusEvent) => {
    props.onFocus?.(e)
  }

  /* 处理失去焦点 */
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
