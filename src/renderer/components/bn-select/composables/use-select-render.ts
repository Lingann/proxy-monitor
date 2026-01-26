/**
 * ******************************************************
 * @file                     use-select-render.ts
 * @description             「选择器渲染逻辑」
 * 处理选择器的渲染相关计算
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'
import type { Ref } from 'vue'

import type { SelectProps } from '../props/select-props'
import type { DropdownPosition } from '../types'

// ==================================================
// #region 渲染逻辑
// ==================================================

/**
 * 选择器渲染逻辑
 * @param props - 组件 Props
 * @param isOpen - 是否打开
 * @param dropdownPosition - 下拉框位置
 * @returns 渲染相关的计算属性
 */
export function useSelectRender(
  props: SelectProps,
  isOpen: Ref<boolean>,
  dropdownPosition: Ref<DropdownPosition>
) {

  /**
   * 选中的选项
   */
  const selectedOption = computed(() => {
    if (!props.modelValue) return null

    return props.options?.find(opt => opt.value === props.modelValue) || null
  })

  /**
   * 容器类名
   */
  const containerClasses = computed(() => [
    'bn-select',
    `bn-select--${props.size}`,
    {
      'bn-select--open': isOpen.value,
      'bn-select--disabled': props.disabled,
      'bn-select--error': props.error
    }
  ])

  /**
   * 下拉框类名
   */
  const dropdownClasses = computed(() => [
    'bn-select__dropdown',
    `bn-select__dropdown--${dropdownPosition.value}`
  ])

  /**
   * 容器样式
   */
  const containerStyles = computed(() => ({}))

  /**
   * 下拉框样式
   */
  const dropdownStyles = computed(() => ({
    '--max-display-items': props.maxItems,
    'z-index': props.zIndex
  }))

  return {
    selectedOption,
    containerClasses,
    dropdownClasses,
    containerStyles,
    dropdownStyles
  }
}

// #endregion
// ==================================================
