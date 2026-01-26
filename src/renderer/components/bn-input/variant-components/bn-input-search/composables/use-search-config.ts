/**
 * ******************************************************
 * @file                     use-search-config.ts
 * @description             「搜索输入框配置合并」
 * 合并扁平化 Props 和 config 对象，处理优先级
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'
import type { BnSearchInputProps } from '../props/bn-input-search-props'
import type { SearchInputConfig } from '../types'

/* ================================================== */
/* 区域：配置合并 */
/* ================================================== */

export function useSearchConfig(
  props: BnSearchInputProps,
  t: (key: string) => string
) {
  /* 合并配置：扁平化 Props > config 对象 > 默认值 */
  const mergedConfig = computed<SearchInputConfig>(() => ({
    options: props.options || props.config?.options || [],
    enableDropdown: props.enableDropdown ?? props.config?.enableDropdown ?? false,
    maxItems: props.maxItems || props.config?.maxItems || 5,
    searchKeys: props.searchKeys || props.config?.searchKeys || ['label'],
    fuseOptions: props.fuseOptions || props.config?.fuseOptions || {},
    zIndex: props.zIndex || props.config?.zIndex || 1000,
    placeholder: props.placeholder || props.config?.placeholder || t('common.search_placeholder'),
    size: props.size || props.config?.size || 'medium',
    disabled: props.disabled ?? props.config?.disabled ?? false,
    clearable: props.clearable ?? props.config?.clearable ?? true,
    prefixIcon: props.prefixIcon || props.config?.prefixIcon,
    width: props.config?.width || '100%'
  }))

  return { mergedConfig }
}

/* ================================================== */
/* 区域结束：配置合并 */
/* ================================================== */
