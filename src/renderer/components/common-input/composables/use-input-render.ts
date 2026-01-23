import { computed, Ref, SetupContext } from 'vue';
import { InputConfig, CommonInputProps } from '../types';

export function useInputRender(
  props: CommonInputProps,
  mergedConfig: Ref<InputConfig>,
  isFocused: Ref<boolean>,
  isValid: Ref<boolean>,
  errorMessage: Ref<string>,
  slots: SetupContext['slots']
) {
  const containerClasses = computed(() => [
    'common-input',
    `is-${mergedConfig.value.size}`,
    {
      'is-focused': isFocused.value,
      'is-disabled': mergedConfig.value.disabled,
      'is-error': !isValid.value,
    }
  ]);

  const showPrefix = computed(() => !!(mergedConfig.value.prefixIcon || slots.prefix));
  
  const showSuffix = computed(() => !!(mergedConfig.value.suffixIcon || slots.suffix));
  
  const showClear = computed(() => !!(
    mergedConfig.value.clearable && 
    props.modelValue && 
    !mergedConfig.value.disabled
  ));
  
  const showError = computed(() => !isValid.value && !!errorMessage.value);

  return {
    containerClasses,
    showPrefix,
    showSuffix,
    showClear,
    showError
  };
}
