/**
 * ******************************************************
 * @file                     search-input-props.ts
 * @description             「搜索输入框属性定义」
 * 定义搜索输入框的属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '@blanc-nova/vue-utils'
import type { ExtractPropTypes } from 'vue'

import { inputProps } from './input-props'

// ==================================================
// #region 搜索输入框属性定义
// ==================================================

/**
 * 创建搜索输入框属性
 * @returns 「搜索输入框属性定义」包含默认值的属性定义
 */
export const searchInputProps = createVueProps('search-input', {
  ...inputProps(),
  searchText: {
    type: String,
    default: '搜索'
  },
  showSearchButton: {
    type: Boolean,
    default: true
  },
  searchOnInput: {
    type: Boolean,
    default: false
  }
})

// #endregion
// ==================================================

export type SearchInputProps = Partial<ExtractPropTypes<ReturnType<typeof searchInputProps>>>
