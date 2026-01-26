/* ****************************************************** */
/* 文件: use-select-render.ts */
/* 描述: 选择器渲染逻辑 */
/* 处理选择器的渲染相关计算 */
/* 作者: blancnova-web */
/* ****************************************************** */

import { computed } from 'vue'

import type { Ref } from 'vue'

import type { SelectProps } from '../props/select-props'
import type { DropdownPosition } from '../types'

/* 渲染逻辑 */

/* 选择器渲染逻辑 */
export function useSelectRender(
  props: SelectProps,
  isOpenRef: Ref<boolean>,
  dropdownPositionRef: Ref<DropdownPosition>
) {

  /* 选中的选项 */
  const selectedOptionRef = computed(() => {
    if (!props.modelValue) return null

    return props.options?.find(opt => opt.value === props.modelValue) || null
  })

  /* 容器类名 */
  const containerClassesRef = computed(() => [
    'bn-select',
    `bn-select--${props.size}`,
    {
      'bn-select--open': isOpenRef.value,
      'bn-select--disabled': props.disabled,
      'bn-select--error': props.error
    }
  ])

  /* 下拉框类名 */
  const dropdownClassesRef = computed(() => [
    'bn-select__dropdown',
    `bn-select__dropdown--${dropdownPositionRef.value}`
  ])

  /* 容器样式 */
  const containerStylesRef = computed(() => ({}))

  /* 下拉框样式 */
  const dropdownStylesRef = computed(() => ({
    '--max-display-items': props.maxItems,
    'z-index': props.zIndex
  }))

  return {
    selectedOptionRef,

    containerClassesRef,

    dropdownClassesRef,

    containerStylesRef,

    dropdownStylesRef
  }
}
