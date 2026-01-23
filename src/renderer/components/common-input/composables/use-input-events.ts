import { Ref, nextTick } from 'vue';
import { InputConfig, ValidateTrigger } from '../types';

interface InputEventProps {
  modelValue: string;
  onUpdateModelValue?: (val: string) => void;
  onChange?: (val: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onEnter?: (val: string) => void;
  onClear?: () => void;
}

interface UseInputEventsParams {
  props: InputEventProps;
  mergedConfig: Ref<InputConfig>;
  triggers: Ref<ValidateTrigger[]>;
  validate: () => Promise<boolean>;
  isFocused: Ref<boolean>;
  focusInput: () => void;
}

export function useInputEvents({
  props,
  mergedConfig,
  triggers,
  validate,
  isFocused,
  focusInput
}: UseInputEventsParams) {
  
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.onUpdateModelValue?.(val);
    props.onChange?.(val);
    
    if (triggers.value.includes('change')) {
      validate();
    }
  };

  const handleFocus = (e: FocusEvent) => {
    isFocused.value = true;
    props.onFocus?.(e);
    
    if (triggers.value.includes('focus')) {
      validate();
    }
  };

  const handleBlur = (e: FocusEvent) => {
    isFocused.value = false;
    
    /* 处理 trim */
    if (mergedConfig.value.trim) {
      const trimmed = props.modelValue.trim();
      
      if (trimmed !== props.modelValue) {
        props.onUpdateModelValue?.(trimmed);
        props.onChange?.(trimmed);
      }
    }
    
    props.onBlur?.(e);
    
    if (triggers.value.includes('blur')) {
      validate();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onEnter?.(props.modelValue);
    }
  };

  const handleClear = () => {
    props.onUpdateModelValue?.('');
    props.onChange?.('');
    props.onClear?.();
    
    /* 清除后聚焦输入框 */
    nextTick(() => {
      focusInput();
    });
  };

  return {
    handleInput,
    handleFocus,
    handleBlur,
    handleKeydown,
    handleClear
  };
}
