import { defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Search, X } from 'lucide-vue-next';
import { SearchInputConfig, SearchInputOption, CommonSearchInputProps } from './types';
import { useSearchInputConfig } from './composables/use-search-input-config';
import { useSearchInputState } from './composables/use-search-input-state';
import { useSearchInputData } from './composables/use-search-input-data';
import { useSearchInputEvents } from './composables/use-search-input-events';
import { renderIcon } from './utils';
import './common-search-input.scss';

export default defineComponent({
  name: 'CommonSearchInput',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    config: {
      type: Object as PropType<SearchInputConfig>,
      default: () => ({})
    },
    'onUpdate:ModelValue': Function as PropType<(val: string | number | null) => void>,
    onChange: Function as PropType<(value: string | number | null, option?: SearchInputOption) => void>,
    onSearch: Function as PropType<(query: string) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>
  },
  setup(props, { expose }) {
    const { t } = useI18n();

    /* 1. 配置 */
    const { mergedConfig } = useSearchInputConfig(props as CommonSearchInputProps);

    /* 2. 状态 */
    const {
      containerRef,
      inputRef,
      isOpen,
      query,
      activeOptionIndex,
      open,
      close
    } = useSearchInputState(props as CommonSearchInputProps, mergedConfig);

    /* 3. 数据 (Fuse.js) */
    const {
      filteredOptions,
      search
    } = useSearchInputData(mergedConfig);

    /* 4. 事件 */
    const {
      handleInput,
      handleFocus,
      handleBlur,
      handleKeydown,
      selectOption,
      clear
    } = useSearchInputEvents({
      props: props as CommonSearchInputProps,
      mergedConfig,
      query,
      isOpen,
      activeOptionIndex,
      filteredOptions,
      inputRef,
      open,
      close,
      search
    });

    /* 暴露方法 */
    expose({ open, close, clear, search });

    return () => (
      <div 
        ref={containerRef}
        class={[
          'common-search-input',
          `is-${mergedConfig.value.size}`,
          {
            'is-open': isOpen.value,
            'is-disabled': mergedConfig.value.disabled,
            'has-value': !!query.value,
            'is-focused': isOpen.value
          }
        ]}
        style={{ 
          width: typeof mergedConfig.value.width === 'number' ? `${mergedConfig.value.width}px` : mergedConfig.value.width,
          zIndex: mergedConfig.value.zIndex 
        }}
      >
        <div class="common-search-input__wrapper">
          <div class="common-search-input__prefix">
            {mergedConfig.value.prefixIcon ? renderIcon(mergedConfig.value.prefixIcon) : <Search size={16} />}
          </div>
          <input
            ref={inputRef}
            type="text"
            class="common-search-input__field"
            value={query.value}
            placeholder={mergedConfig.value.placeholder}
            disabled={mergedConfig.value.disabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeydown={handleKeydown}
          />
          {mergedConfig.value.clearable && query.value && !mergedConfig.value.disabled && (
             <div class="common-search-input__clear" onClick={clear}>
                <X size={14} />
             </div>
          )}
        </div>

        {isOpen.value && (
            <div class="common-search-input__dropdown">
                {filteredOptions.value.length > 0 ? (
                    filteredOptions.value.map((opt, index) => (
                        <div 
                           class={['common-search-input__option', { 'is-active': index === activeOptionIndex.value }]}
                           onClick={() => selectOption(opt)}
                           onMouseenter={() => activeOptionIndex.value = index}
                        >
                           {opt.label} 
                        </div>
                    ))
                ) : (
                    <div class="common-search-input__empty">{t('common.no_results')}</div>
                )}
            </div>
        )}
      </div>
    );
  }
});
