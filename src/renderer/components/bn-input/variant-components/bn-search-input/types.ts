/**
 * ******************************************************
 * @file                     types.ts
 * @description             「搜索输入框类型定义」
 * 定义搜索输入框的接口和类型
 * @author                  blancnova-web
 * ******************************************************
 */

import { Component, VNode } from 'vue'

// ==================================================
// #region 类型定义
// ==================================================

/** 搜索选项接口 */
export interface SearchOption {
  label: string
  value: string | number
  [key: string]: any
}

/** 配置对象接口（向后兼容） */
export interface SearchInputConfig {
  options?: SearchOption[]
  width?: string | number
  size?: 'small' | 'medium' | 'large'
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  enableDropdown?: boolean
  maxItems?: number
  searchKeys?: string[]
  fuseOptions?: any
  prefixIcon?: Component | VNode
  zIndex?: number
  /* Legacy callbacks support in config */
  onSearch?: (query: string) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onChange?: (value: string | number | null, option?: SearchOption) => void
}

// #endregion
// ==================================================
