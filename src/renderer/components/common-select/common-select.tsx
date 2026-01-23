import { defineComponent, ref, PropType, computed, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown } from 'lucide-vue-next';
import './common-select.scss';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectConfig {
  options?: SelectOption[];
  width?: string | number;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  maxItems?: number;
  zIndex?: number;
  validator?: {
    trigger?: 'blur' | 'change' | 'focus' | Array<'blur' | 'change' | 'focus'>;
    validate: (value: any) => Promise<{ isValid: boolean; message?: string }>;
  };
}

export default defineComponent({
  name: 'CommonSelect',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    config: {
      type: Object as PropType<SelectConfig>,
      default: () => ({})
    },
    onUpdateModelValue: Function as PropType<(val: string | number | null) => void>,
    onChange: Function as PropType<(value: string | number | null, option?: SelectOption) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const containerRef = ref<HTMLElement | null>(null);
    const dropdownRef = ref<HTMLElement | null>(null);
    const isOpen = ref(false);
    const isValid = ref(true);
    const errorMessage = ref('');
    const dropdownPosition = ref<'top' | 'bottom'>('bottom');

    const mergedConfig = computed(() => ({
      options: [],
      maxItems: 5,
      placeholder: t('common.please_select'),
      ...props.config
    }));

    const selectedOption = computed(() => {
      return mergedConfig.value.options?.find(o => o.value === props.modelValue);
    });

    const triggers = computed(() => {
      const t = props.config.validator?.trigger;
      if (!t) return ['change'];
      return Array.isArray(t) ? t : [t];
    });

    const toggle = () => {
      if (mergedConfig.value.disabled) return;
      if (isOpen.value) close();
      else open();
    };

    const open = () => {
      if (isOpen.value || mergedConfig.value.disabled) return;
      isOpen.value = true;
      
      // Calculate position
      if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        // const spaceAbove = rect.top; // Unused
        const dropdownHeight = 200; // Approx max height
        
        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
            dropdownPosition.value = 'top';
        } else {
            dropdownPosition.value = 'bottom';
        }
      }
      
      document.addEventListener('click', handleClickOutside);
    };

    const close = () => {
      isOpen.value = false;
      document.removeEventListener('click', handleClickOutside);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
        close();
        if (triggers.value.includes('blur')) {
            validate();
        }
      }
    };

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;
      props.onUpdateModelValue?.(option.value);
      props.onChange?.(option.value, option);
      close();
      
      if (triggers.value.includes('change')) {
        validate();
      }
    };

    const validate = async () => {
      if (!props.config.validator) return true;
      try {
        const result = await props.config.validator.validate(props.modelValue);
        isValid.value = result.isValid;
        errorMessage.value = result.message || '';
        return result.isValid;
      } catch (e) {
        return false;
      }
    };

    const setError = (msg: string) => {
      isValid.value = false;
      errorMessage.value = msg;
    };
    
    const clearError = () => {
      isValid.value = true;
      errorMessage.value = '';
    };

    expose({ validate, setError, clearError });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return () => (
      <div 
        ref={containerRef}
        class={[
          'common-select',
          `is-${mergedConfig.value.size || 'medium'}`,
          {
            'is-open': isOpen.value,
            'is-disabled': mergedConfig.value.disabled,
            'is-error': !isValid.value,
            'has-value': props.modelValue !== null && props.modelValue !== undefined
          }
        ]}
        style={{ 
            width: typeof mergedConfig.value.width === 'number' ? `${mergedConfig.value.width}px` : mergedConfig.value.width,
            zIndex: mergedConfig.value.zIndex 
        }}
      >
        <div 
          class="common-select__trigger" 
          onClick={toggle}
          tabindex={mergedConfig.value.disabled ? -1 : 0}
        >
          <span class={['common-select__value', { 'is-placeholder': !selectedOption.value }]}>
            {selectedOption.value ? selectedOption.value.label : mergedConfig.value.placeholder}
          </span>
          <span class="common-select__arrow">
            <ChevronDown size={16} />
          </span>
        </div>

        <div 
          ref={dropdownRef}
          class={['common-select__dropdown', `is-${dropdownPosition.value}`]}
          style={{ maxHeight: `${(mergedConfig.value.maxItems || 5) * 32}px` }} 
        >
          {mergedConfig.value.options?.length ? (
             mergedConfig.value.options.map(opt => (
                <div 
                  class={[
                    'common-select__option', 
                    { 
                        'is-selected': opt.value === props.modelValue,
                        'is-disabled': opt.disabled
                    }
                  ]}
                  onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt);
                  }}
                >
                  {opt.label}
                </div>
             ))
          ) : (
             <div class="common-select__option is-disabled">{t('common.no_options')}</div>
          )}
        </div>
        
        {!isValid.value && errorMessage.value && (
            <div class="common-select__error">{errorMessage.value}</div>
        )}
      </div>
    );
  }
});
