/**
 * ******************************************************
 * @file                     use-search-keyboard.ts
 * @description             「搜索输入框键盘导航」
 * 处理上下箭头键、Enter 键选择、Esc 键关闭
 * @author                  blancnova-web
 * ******************************************************
 */

import { Ref } from 'vue'
import type { SearchOption } from '../types'

// ==================================================
// #region 键盘导航
// ==================================================

export function useSearchKeyboard(
  isOpen: Ref<boolean>,
  activeIndex: Ref<number>,
  filteredOptions: Ref<SearchOption[]>,
  onSelect: (option: SearchOption) => void,
  onClose: () => void
) {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!isOpen.value) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (activeIndex.value < filteredOptions.value.length - 1) {
          activeIndex.value++
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (activeIndex.value > 0) {
          activeIndex.value--
        }
        break

      case 'Enter':
        e.preventDefault()
        if (activeIndex.value >= 0 && filteredOptions.value[activeIndex.value]) {
          onSelect(filteredOptions.value[activeIndex.value])
        }
        break

      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }

  return {
    handleKeydown
  }
}

// #endregion
// ==================================================
