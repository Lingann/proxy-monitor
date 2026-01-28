/**
 * ******************************************************
 * @file                     use-search-fuzzy.ts
 * @description             「Fuse.js 模糊搜索」
 * 初始化 Fuse 实例、执行搜索、过滤和排序结果
 * @author                  blancnova-web
 * ******************************************************
 */

import { ref, watch, Ref } from 'vue'
import Fuse from 'fuse.js'
import type { SearchOption } from '../types'

// ==================================================
// #region 模糊搜索
// ==================================================

export function useSearchFuzzy(
  options: Ref<SearchOption[]>,
  searchKeys: Ref<string[]>,
  fuseOptions: Ref<any>,
  maxItems: Ref<number>
) {
  const filteredOptions = ref<SearchOption[]>([])
  let fuse: Fuse<SearchOption> | null = null

  /* 初始化 Fuse */
  const initFuse = () => {
    if (options.value && options.value.length > 0) {
      fuse = new Fuse(options.value, {
        keys: searchKeys.value,
        threshold: 0.4,
        ...fuseOptions.value
      })
    }
  }

  /* 监听选项变化 */
  watch([options, searchKeys, fuseOptions], () => {
    initFuse()
  }, { immediate: true })

  /* 执行搜索 */
  const search = (query: string) => {
    const trimmed = query.trim()

    if (!trimmed) {
      // 空查询，显示所有选项（限制数量）
      filteredOptions.value = options.value.slice(0, maxItems.value)
    } else if (fuse) {
      // 模糊搜索
      const results = fuse.search(trimmed)
      filteredOptions.value = results
        .map(r => r.item)
        .slice(0, maxItems.value)
    } else {
      filteredOptions.value = []
    }
  }

  return {
    filteredOptions,
    search
  }
}

// #endregion
// ==================================================
