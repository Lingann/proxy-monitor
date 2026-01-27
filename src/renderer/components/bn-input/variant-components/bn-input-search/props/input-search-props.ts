/**
 * ******************************************************
 * @file                     bn-input-search-props.ts
 * @description             「搜索输入框属性定义」
 * 支持双模式：扁平化 Props（推荐）+ config 对象（向后兼容）
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../../../utils/create-vue-props'
import type { Component, ExtractPropTypes, PropType, VNode } from 'vue'
import { inputProps } from '../../../props/input-props'
import type { SearchOption, SearchInputConfig } from '../types'

/* ================================================== */
/* 区域：Props 定义 */
/* ================================================== */

export const inputSearchProps = createVueProps('bn-input-search', {
  /* 继承基础输入框 Props */
  ...inputProps(),

  /* ========== 扁平化 Props（推荐使用） ========== */

  /** 绑定值 */
  modelValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: ''
  },

  /** 搜索选项列表 */
  options: {
    type: Array as PropType<SearchOption[]>,
    default: () => []
  },

  /** 是否启用下拉框 */
  enableDropdown: {
    type: Boolean,
    default: false
  },

  /** 最大显示选项数 */
  maxItems: {
    type: Number,
    default: 5
  },

  /** Fuse.js 搜索字段 */
  searchKeys: {
    type: Array as PropType<string[]>,
    default: () => ['label']
  },

  /** Fuse.js 配置选项 */
  fuseOptions: {
    type: Object,
    default: () => ({})
  },

  /** 下拉框 z-index */
  zIndex: {
    type: Number,
    default: 1000
  },

  /** 搜索按钮文本 */
  searchText: {
    type: String,
    default: ''
  },

  /** 是否显示搜索按钮 */
  showSearchButton: {
    type: Boolean,
    default: false
  },

  /** 是否在输入时触发搜索 */
  searchOnInput: {
    type: Boolean,
    default: false
  },

  /* ========== 配置对象（向后兼容） ========== */

  /** 配置对象（优先级低于扁平化 Props） */
  config: {
    type: Object as PropType<SearchInputConfig>,
    default: () => ({})
  },

  /* ========== 事件回调 ========== */

  /** 搜索事件 */
  onSearch: Function as PropType<(query: string) => void>,

  /** 值变更事件 */
  onChange: Function as PropType<(value: string | number | null, option?: SearchOption) => void>,

  /** 选项选择事件 */
  onSelect: Function as PropType<(value: string | number | null, option?: SearchOption) => void>
})

/* ================================================== */
/* 区域结束：Props 定义 */
/* ================================================== */

export type inputSearchProps = Partial<ExtractPropTypes<ReturnType<typeof inputSearchProps>>>
