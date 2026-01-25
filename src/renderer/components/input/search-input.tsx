/**
 * ******************************************************
 * @file                     search-input.tsx
 * @description             「搜索输入框组件」
 * 预设搜索图标和搜索按钮的输入框组件
 * @author                  blancnova-web
 * ******************************************************
 */

import { SearchOutlined } from '@ant-design/icons-vue'
import { defineComponent, h } from 'vue'

import { useInputEvent } from './composables/use-input-event'
import { BnInput } from './input'
import { searchInputProps } from './props/search-input-props'

// ==================================================
// #region 组件定义
// ==================================================

export const BnSearchInput = defineComponent({
  name: 'BnSearchInput',
  inheritAttrs: false,
  props: searchInputProps(),
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear', 'search'],
  setup(props, { emit, attrs }) {
    // 使用基础事件处理
    const {
      handleInput: baseHandleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear
    } = useInputEvent(emit)

    // 扩展输入处理，增加搜索功能
    const handleInput = (value: string) => {
      baseHandleInput(value)

      // 如果启用了输入时搜索，则触发搜索事件
      if (props.searchOnInput) {
        emit('search', value)
      }
    }

    // 处理搜索按钮点击
    const handleSearch = () => {
      emit('search', props.modelValue)
    }

    // 渲染函数
    const renderPrefixIcon = () => (
      <span class="bn-input__prefix">
        {h(SearchOutlined)}
      </span>
    )

    const renderSuffixIcon = () => {
      if (!props.showSearchButton) return null

      return (
        <span class="bn-input__suffix">
          <button
            class="bn-input__search-button"
            disabled={props.disabled}
            onClick={handleSearch}
          >
            {props.searchText}
          </button>
        </span>
      )
    }

    return () => (
      <BnInput
        {...props}
        {...attrs}
        class={['bn-input-search', attrs.class]}
        placeholder={props.placeholder || '请输入搜索内容'}
        v-slots={{
          prefix: renderPrefixIcon,
          suffix: renderSuffixIcon
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        onClear={handleClear}
        onFocus={handleFocus}
        onUpdate:modelValue={handleInput}
      />
    )
  }
})

// #endregion
// ==================================================

export default BnSearchInput
