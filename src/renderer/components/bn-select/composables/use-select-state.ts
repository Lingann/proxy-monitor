/* ****************************************************** */
/* 文件: use-select-state.ts */
/* 描述: 选择器状态管理 */
/* 管理选择器的打开与关闭状态和下拉框位置 */
/* 作者: blancnova-web */
/* ****************************************************** */

import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { SelectProps } from '../props/select-props'
import type { DropdownPosition } from '../types'

/* 状态管理 */

/* 选择器状态管理 */
export function useSelectState(props: SelectProps) {

  /* 容器引用 */
  const containerRef = ref<HTMLElement | null>(null)

  /* 下拉框引用 */
  const dropdownRef = ref<HTMLElement | null>(null)

  /* 是否打开 */
  const isOpenRef = ref(false)

  /* 下拉框位置 */
  const dropdownPositionRef = ref<DropdownPosition>('bottom')

  /* 计算下拉框位置 */
  const calculatePosition = () => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()

    const spaceBelow = window.innerHeight - rect.bottom

    const spaceAbove = rect.top

    const dropdownHeight = (props.maxItems || 5) * 36 + 8

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) dropdownPositionRef.value = 'top'

    if (spaceBelow >= dropdownHeight || spaceAbove <= spaceBelow) dropdownPositionRef.value = 'bottom'
  }

  /* 打开下拉框 */
  const open = () => {
    if (props.disabled) return

    isOpenRef.value = true

    nextTick(calculatePosition)
  }

  /* 关闭下拉框 */
  const close = () => {
    isOpenRef.value = false
  }

  /* 切换下拉框 */
  const toggle = () => {
    if (isOpenRef.value) return close()

    open()
  }

  /* 点击外部关闭 */
  const handleClickOutside = (e: MouseEvent) => {
    if (!containerRef.value) return

    if (containerRef.value.contains(e.target as Node)) return

    close()
  }

  /* 监听打开状态，添加或移除全局点击事件 */
  watch(isOpenRef, (newVal) => {
    if (newVal) return document.addEventListener('click', handleClickOutside)

    document.removeEventListener('click', handleClickOutside)
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

    isOpenRef,

    dropdownPositionRef,

    open,

    close,

    toggle
  }
}
