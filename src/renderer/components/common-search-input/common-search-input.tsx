import { defineComponent, ref, PropType, computed, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-vue-next';
import './common-search-input.scss';

export interface SearchInputOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface SearchInputConfig {
  options?: SearchInputOption[];
  width?: string | number;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  enableDropdown?: boolean;
  maxItems?: number;
  searchKeys?: string[];
  fuseOptions?: any;
  prefixIcon?: any;
  zIndex?: number;
  onSearch?: (query: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string | number | null, option?: SearchInputOption) => void;
}

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
    onUpdateModelValue: Function as PropType<(val: string | number | null) => void>,
    onChange: Function as PropType<(value: string | number | null, option?: SearchInputOption) => void>,
    onSearch: Function as PropType<(query: string) => void>
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const containerRef = ref<HTMLElement | null>(null);
    const inputRef = ref<HTMLInputElement | null>(null);
    const isOpen = ref(false);
    const query = ref('');
    const filteredOptions = ref<SearchInputOption[]>([]);
    const activeOptionIndex = ref(-1);
    const dropdownPosition = ref<'top' | 'bottom'>('bottom');

    const mergedConfig = computed(() => ({
      width: '100%',
      size: 'medium',
      maxItems: 5,
      searchKeys: ['label'],
      clearable: true,
      enableDropdown: false,
      ...props.config
    }));

    let fuse: Fuse<SearchInputOption> | null = null;

    const initFuse = () => {
      if (mergedConfig.value.options) {
        fuse = new Fuse(mergedConfig.value.options, {
          keys: mergedConfig.value.searchKeys,
          threshold: 0.4,
          ...mergedConfig.value.fuseOptions
        });
      }
    };

    watch(() => props.config.options, () => {
      initFuse();
      if (isOpen.value) handleSearch(query.value);
    }, { immediate: true });

    watch(() => props.modelValue, (newVal) => {
        if (!newVal && newVal !== 0) {
            query.value = '';
            return;
        }
        const opt = mergedConfig.value.options?.find(o => o.value === newVal);
        if (opt) {
            query.value = opt.label;
        } else {
            query.value = String(newVal);
        }
    }, { immediate: true });

    const handleSearch = (val: string) => {
      query.value = val;
      props.onSearch?.(val);
      
      if (!mergedConfig.value.enableDropdown) return;

      const trimmed = val.trim();
      if (!trimmed) {
        filteredOptions.value = mergedConfig.value.options || [];
      } else if (fuse) {
        filteredOptions.value = fuse.search(trimmed).map(r => r.item);
      } else {
        filteredOptions.value = [];
      }

      if (filteredOptions.value.length > 0 || !trimmed) { 
         open();
      } else {
         open();
      }
    };

    const open = () => {
      if (isOpen.value || mergedConfig.value.disabled || !mergedConfig.value.enableDropdown) return;
      isOpen.value = true;
      document.addEventListener('click', handleClickOutside);
    };

    const close = () => {
      isOpen.value = false;
      activeOptionIndex.value = -1;
      document.removeEventListener('click', handleClickOutside);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
        close();
      }
    };

    const selectOption = (opt: SearchInputOption) => {
      query.value = opt.label;
      props.onUpdateModelValue?.(opt.value);
      props.onChange?.(opt.value, opt);
      close();
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (!isOpen.value) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (activeOptionIndex.value < filteredOptions.value.length - 1) {
                    activeOptionIndex.value++;
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (activeOptionIndex.value > 0) {
                    activeOptionIndex.value--;
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (activeOptionIndex.value >= 0 && filteredOptions.value[activeOptionIndex.value]) {
                    selectOption(filteredOptions.value[activeOptionIndex.value]);
                }
                break;
            case 'Escape':
                close();
                break;
        }
    };
    
    const clear = () => {
        query.value = '';
        props.onUpdateModelValue?.(null);
        props.onChange?.(null);
        props.onSearch?.('');
        inputRef.value?.focus();
        if (mergedConfig.value.enableDropdown) {
             filteredOptions.value = mergedConfig.value.options || [];
        }
    };

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });

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
            'is-focused': isOpen.value // Assuming open means focused/active
          }
        ]}
        style={{ 
            width: typeof mergedConfig.value.width === 'number' ? `${mergedConfig.value.width}px` : mergedConfig.value.width,
            zIndex: mergedConfig.value.zIndex 
        }}
      >
        <div class="common-search-input__wrapper">
          <div class="common-search-input__prefix">
            <Search size={16} />
          </div>
          <input
            ref={inputRef}
            type="text"
            class="common-search-input__field"
            value={query.value}
            placeholder={mergedConfig.value.placeholder}
            disabled={mergedConfig.value.disabled}
            onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
            onFocus={() => {
                if (mergedConfig.value.enableDropdown) {
                    // Refresh options on focus
                    if (!query.value) filteredOptions.value = mergedConfig.value.options || [];
                    open();
                }
            }}
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
