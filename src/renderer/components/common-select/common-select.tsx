
import { defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown } from 'lucide-vue-next';
import { SelectConfig, SelectOption } from './types';
import { useSelectConfig } from './composables/use-select-config';
import { useSelectState } from './composables/use-select-state';
import { useSelectValidation } from './composables/use-select-validation';
import { useSelectEvents } from './composables/use-select-events';
import { useSelectRender } from './composables/use-select-render';
import './common-select.scss';

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

    /* 1. 配置和触发器 */
    const { mergedConfig, triggers } = useSelectConfig(props);

    /* 2. 组件状态 (Ref & Open/Close) */
    const { 
      containerRef, 
      dropdownRef, 
      isOpen, 
      dropdownPosition, 
      open, 
      close, 
      toggle 
    } = useSelectState(mergedConfig);

    /* 3. 验证逻辑 */
    const { 
      isValid, 
      errorMessage, 
      validate, 
      setError, 
      clearError 
    } = useSelectValidation(() => props.modelValue, mergedConfig);

    /* 4. 事件处理 */
    const { handleSelect } = useSelectEvents({
      props,
      isOpen,
      close,
      containerRef,
      triggers,
      validate
    });

    /* 5. 渲染逻辑 */
    const {
      selectedOption,
      containerClasses,
      dropdownClasses,
      containerStyles,
      dropdownStyles
    } = useSelectRender(props, mergedConfig, isOpen, isValid, dropdownPosition);

    /* 暴露公共方法 */
    expose({ validate, setError, clearError, open, close });

    return () => (
      <div 
        ref={containerRef}
        class={containerClasses.value}
        style={containerStyles.value}
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
          class={dropdownClasses.value}
          style={dropdownStyles.value} 
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
