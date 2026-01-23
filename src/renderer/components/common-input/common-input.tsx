import { defineComponent, PropType } from 'vue';
import { X } from 'lucide-vue-next';
import { InputConfig } from './types';
import { useInputValidation } from './composables/use-input-validation';
import { useInputConfig } from './composables/use-input-config';
import { useInputState } from './composables/use-input-state';
import { useInputEvents } from './composables/use-input-events';
import { useInputRender } from './composables/use-input-render';
import { renderIcon } from './utils';
import './common-input.scss';

export default defineComponent({
  name: 'CommonInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    config: {
      type: Object as PropType<InputConfig>,
      default: () => ({})
    },
    onUpdateModelValue: Function as PropType<(val: string) => void>,
    onChange: Function as PropType<(val: string) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onEnter: Function as PropType<(val: string) => void>,
    onClear: Function as PropType<() => void>
  },
  setup(props, { expose, slots }) {
    /* 1. 配置和触发器 */
    const { mergedConfig, triggers } = useInputConfig(props);

    /* 2. 组件状态 (Ref & Focus) */
    const { inputRef, isFocused, focus, blur } = useInputState();

    /* 3. 验证逻辑 */
    const { 
      isValid, 
      errorMessage, 
      validate, 
      setError, 
      clearError 
    } = useInputValidation(() => props.modelValue, mergedConfig);

    /* 4. 事件处理 */
    const {
      handleInput,
      handleFocus,
      handleBlur,
      handleKeydown,
      handleClear
    } = useInputEvents({
      props,
      mergedConfig,
      triggers,
      validate,
      isFocused,
      focusInput: focus
    });

    /* 5. 渲染逻辑 */
    const {
      containerClasses,
      showPrefix,
      showSuffix,
      showClear,
      showError
    } = useInputRender(props, mergedConfig, isFocused, isValid, errorMessage, slots);

    /* 暴露公共方法 */
    expose({ focus, blur, validate, setError, clearError });

    return () => (
      <div class={containerClasses.value}>
        <div class="common-input__wrapper">
          {/* 前缀图标: Prop 或 Slot */}
          {showPrefix.value && (
            <div class="common-input__icon common-input__icon--prefix">
              {slots.prefix ? slots.prefix() : renderIcon(mergedConfig.value.prefixIcon)}
            </div>
          )}
          
          <input
            ref={inputRef}
            type={mergedConfig.value.type}
            class="common-input__input"
            value={props.modelValue}
            placeholder={mergedConfig.value.placeholder}
            disabled={mergedConfig.value.disabled}
            maxlength={mergedConfig.value.maxLength}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeydown={handleKeydown}
          />

          {/* 清除按钮 */}
          {showClear.value && (
            <div class="common-input__icon common-input__icon--clear" onClick={handleClear}>
              <X size={14} />
            </div>
          )}
          
          {/* 后缀图标: Prop 或 Slot */}
          {showSuffix.value && (
            <div class="common-input__icon common-input__icon--suffix">
              {slots.suffix ? slots.suffix() : renderIcon(mergedConfig.value.suffixIcon)}
            </div>
          )}
        </div>
        
        {/* 错误消息 */}
        {showError.value && (
          <div class="common-input__error">{errorMessage.value}</div>
        )}
      </div>
    );
  }
});
