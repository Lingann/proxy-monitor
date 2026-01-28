/**
 * ******************************************************
 * @file                     use-search-dropdown.ts
 * @description             「搜索下拉框状态管理」
 * 管理下拉框开关、点击外部关闭、活动索引
 * @author                  blancnova-web
 * ******************************************************
 */

import { ref, Ref, onUnmounted } from 'vue'

// ==================================================
// #region 下拉框状态管理
// ==================================================

export function useSearchDropdown(
  containerRef: Ref<HTMLElement | null>,
  enabled: Ref<boolean>
) {
  const isOpen = ref(false)
  const activeIndex = ref(-1)

  /* 打开下拉框 */
  const open = () => {
    if (!enabled.value) return
    isOpen.value = true
    document.addEventListener('click', handleClickOutside)
  }

  /* 关闭下拉框 */
  const close = () => {
    isOpen.value = false
    activeIndex.value = -1
    document.removeEventListener('click', handleClickOutside)
  }

  /* 点击外部关闭 */
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
      close()
    }
  }

  /* 设置活动索引 */
  const setActiveIndex = (index: number) => {
    activeIndex.value = index
  }

  /* 清理 */
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    isOpen,
    activeIndex,
    open,
    close,
    setActiveIndex
  }
}

// #endregion
// ==================================================
