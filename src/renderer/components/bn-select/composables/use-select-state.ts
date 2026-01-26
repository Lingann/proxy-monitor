/**
 * ******************************************************
 * @file                     use-select-state.ts
 * @description             「选择器状态管理」
 * 管理选择器的打开/关闭状态和下拉框位置
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { SelectProps } from '../props/select-props'
import type { DropdownPosition } from '../types'

// ==================================================
// #region 状态管理
// ==================================================

/**
 * 选择器状态管理
 * @param props - 组件 Props
 * @returns 状态管理相关的响应式数据和方法
 */
export function useSelectState(props: SelectProps) {

  /* 容器引用 */
  const containerRef = ref<HTMLElement | null>(null)

  /* 下拉框引用 */
  const dropdownRef = ref<HTMLElement | null>(null)

  /* 是否打开 */
  const isOpen = ref(false)

  /* 下拉框位置 */
  const dropdownPosition = ref<DropdownPosition>('bottom')

  /**
   * 计算下拉框位置
   */
  const calculatePosition = () => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()

    const spaceBelow = window.innerHeight - rect.bottom

    const spaceAbove = rect.top

    const dropdownHeight = (props.maxItems || 5) * 36 + 8

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      dropdownPosition.value = 'top'
    } else {
      dropdownPosition.value = 'bottom'
    }
  }

  /**
   * 打开下拉框
   */
  const open = () => {
    if (props.disabled) return

    isOpen.value = true

    nextTick(() => {
      calculatePosition()
    })
  }

  /**
   * 关闭下拉框
   */
  const close = () => {
    isOpen.value = false
  }

  /**
   * 切换下拉框
   */
  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  /**
   * 点击外部关闭
   */
  const handleClickOutside = (e: MouseEvent) => {
    if (!containerRef.value) return

    if (!containerRef.value.contains(e.target as Node)) {
      close()
    }
  }

  /* 监听打开状态，添加/移除全局点击事件 */
  watch(isOpen, (newVal) => {
    if (newVal) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  /* 组件挂载时监听窗口大小变化 */
  onMounted(() => {
    window.addEventListener('resize', calculatePosition)
  })

  /* 组件卸载时清理事件监听 */
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)

    window.removeEventListener('resize', calculatePosition)
  })

  return {
    containerRef,
    dropdownRef,
    isOpen,
    dropdownPosition,
    open,
    close,
    toggle
  }
}

// #endregion
// ==================================================
