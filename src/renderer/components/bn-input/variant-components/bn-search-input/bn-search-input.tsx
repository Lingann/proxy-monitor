/**
 * ******************************************************
 * @file                     bn-search-input.tsx
 * @description             「搜索输入框组件」
 * 支持下拉选项、模糊搜索、键盘导航的搜索输入框
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/bn-search-input.scss'

import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'

import { BnInput } from '../../input'
import { bnSearchInputProps } from './props/bn-search-input-props'
import { useSearchConfig } from './composables/use-search-config'
import { useSearchDropdown } from './composables/use-search-dropdown'
import { useSearchFuzzy } from './composables/use-search-fuzzy'
import { useSearchKeyboard } from './composables/use-search-keyboard'
import { renderIcon } from './utils'
import type { SearchOption } from './types'

// ==================================================
// #region 组件定义
// ==================================================

export const BnSearchInput = defineComponent({
  name: 'BnSearchInput',
  inheritAttrs: false,
  props: bnSearchInputProps(),

  setup(props, { attrs, expose }) {
    const { t } = useI18n()

    /* ========== Refs ========== */
    const containerRef = ref<HTMLElement | null>(null)
    const inputRef = ref<HTMLInputElement | null>(null)
    const query = ref('')

    /* ========== 配置合并 ========== */
    const { mergedConfig } = useSearchConfig(props)

    /* ========== 下拉框状态 ========== */
    const {
      isOpen,
      activeIndex,
      open,
      close,
      setActiveIndex
    } = useSearchDropdown(
      containerRef,
      computed(() => mergedConfig.value.enableDropdown)
    )

    /* ========== 模糊搜索 ========== */
    const {
      filteredOptions,
      search
    } = useSearchFuzzy(
      computed(() => mergedConfig.value.options),
      computed(() => mergedConfig.value.searchKeys),
      computed(() => mergedConfig.value.fuseOptions),
      computed(() => mergedConfig.value.maxItems)
    )

    /* ========== 监听 modelValue 变化，同步 query ========== */
    watch(() => props.modelValue, (newVal) => {
      if (!newVal && newVal !== 0) {
        query.value = ''
        return
      }
      const opt = mergedConfig.value.options?.find(o => o.value === newVal)
      if (opt) {
        query.value = opt.label
      } else {
        query.value = String(newVal)
      }
    }, { immediate: true })

    /* ========== 事件处理 ========== */

    /* 选择选项 */
    const selectOption = (opt: SearchOption) => {
      query.value = opt.label
      props.onUpdateModelValue?.(opt.value)
      props.onChange?.(opt.value, opt)
      props.config?.onChange?.(opt.value, opt) // Legacy support
      props.onSelect?.(opt.value, opt)
      close()
    }

    /* 键盘导航 */
    const { handleKeydown } = useSearchKeyboard(
      isOpen,
      activeIndex,
      filteredOptions,
      selectOption,
      close
    )

    /* 处理输入 */
    const handleInput = (value: string) => {
      query.value = value
      props.onUpdateModelValue?.(value)
      props.onSearch?.(value)
      props.config?.onSearch?.(value) // Legacy support

      if (mergedConfig.value.enableDropdown) {
        search(value)
        open()
      }
    }

    /* 处理聚焦 */
    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(e)
      props.config?.onFocus?.(e) // Legacy support

      if (mergedConfig.value.enableDropdown) {
        if (!query.value) {
          search('')
        }
        open()
      }
    }

    /* 处理失焦 */
    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.(e)
      props.config?.onBlur?.(e) // Legacy support
    }

    /* 清除内容 */
    const clear = () => {
      query.value = ''
      props.onUpdateModelValue?.(null)
      props.onChange?.(null)
      props.onSearch?.('')
      props.config?.onSearch?.('') // Legacy support

      if (mergedConfig.value.enableDropdown) {
        search('')
      }
    }

    /* 暴露方法 */
    expose({ open, close, clear, search })

    /* ========== 渲染函数 ========== */

    /* 渲染前缀图标 */
    const renderPrefixIcon = () => {
      const icon = mergedConfig.value.prefixIcon
      if (icon) {
        return <span class="bn-input__prefix">{renderIcon(icon)}</span>
      }
      return <span class="bn-input__prefix"><Search size={16} /></span>
    }

    return () => (
      <div
        ref={containerRef}
        class={[
          'bn-search-input',
          `bn-search-input--${mergedConfig.value.size}`,
          {
            'bn-search-input--open': isOpen.value,
            'bn-search-input--disabled': mergedConfig.value.disabled
          }
        ]}
        style={{
          width: typeof mergedConfig.value.width === 'number'
            ? `${mergedConfig.value.width}px`
            : mergedConfig.value.width,
          zIndex: mergedConfig.value.zIndex
        }}
      >
        <BnInput
          {...props}
          {...attrs}
          modelValue={query.value}
          placeholder={mergedConfig.value.placeholder}
          disabled={mergedConfig.value.disabled}
          clearable={mergedConfig.value.clearable}
          size={mergedConfig.value.size}
          class={['bn-search-input__input', attrs.class]}
          v-slots={{
            prefix: renderPrefixIcon
          }}
          onUpdate:modelValue={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeydown={handleKeydown}
          onClear={clear}
        />

        {isOpen.value && mergedConfig.value.enableDropdown && (
          <div class="bn-search-input__dropdown">
            {filteredOptions.value.length > 0 ? (
              filteredOptions.value.map((opt, index) => (
                <div
                  key={opt.value}
                  class={[
                    'bn-search-input__option',
                    { 'bn-search-input__option--active': index === activeIndex.value }
                  ]}
                  onClick={() => selectOption(opt)}
                  onMouseenter={() => setActiveIndex(index)}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div class="bn-search-input__empty">{t('common.no_results')}</div>
            )}
          </div>
        )}
      </div>
    )
  }
})

// #endregion
// ==================================================

export default BnSearchInput

