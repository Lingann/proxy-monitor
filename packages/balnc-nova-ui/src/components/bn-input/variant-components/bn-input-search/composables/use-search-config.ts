/**
 * ******************************************************
 * @file                     use-search-config.ts
 * @description             「搜索输入框配置处理」
 * 基于扁平化 Props 处理默认值
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'
import type { inputSearchProps } from '../props/input-search-props'

/* ================================================== */
/* 区域：配置处理 */
/* ================================================== */

export function useSearchConfig(
  props: inputSearchProps,
  t: (key: string) => string
) {
  const mergedConfig = computed(() => ({
    options: props.options ?? [],
    enableDropdown: props.enableDropdown ?? false,
    maxItems: props.maxItems ?? 5,
    searchKeys: props.searchKeys ?? ['label'],
    fuseOptions: props.fuseOptions ?? {},
    zIndex: props.zIndex ?? 1000,
    placeholder: props.placeholder || t('common.search_placeholder'),
    size: props.size ?? 'medium',
    disabled: props.disabled ?? false,
    clearable: props.clearable ?? true,
    prefixIcon: props.prefixIcon,
    width: '100%'
  }))

  return { mergedConfig }
}

/* ================================================== */
/* 区域结束：配置处理 */
/* ================================================== */
