
import { computed, Ref } from 'vue';
import { CommonSelectProps, SelectConfig } from '../types';

export function useSelectRender(
  props: CommonSelectProps,
  mergedConfig: Ref<SelectConfig>,
  isOpen: Ref<boolean>,
  isValid: Ref<boolean>,
  dropdownPosition: Ref<'top' | 'bottom'>
) {
  const selectedOption = computed(() => {
    return mergedConfig.value.options?.find(o => o.value === props.modelValue);
  });

  const containerClasses = computed(() => [
    'common-select',
    `is-${mergedConfig.value.size || 'medium'}`,
    {
      'is-open': isOpen.value,
      'is-disabled': mergedConfig.value.disabled,
      'is-error': !isValid.value,
      'has-value': props.modelValue !== null && props.modelValue !== undefined
    }
  ]);

  const dropdownClasses = computed(() => [
    'common-select__dropdown', 
    `is-${dropdownPosition.value}`
  ]);

  const containerStyles = computed(() => ({
    width: typeof mergedConfig.value.width === 'number' ? `${mergedConfig.value.width}px` : mergedConfig.value.width,
    zIndex: mergedConfig.value.zIndex
  }));

  const dropdownStyles = computed(() => ({
    maxHeight: `${(mergedConfig.value.maxItems || 5) * 32}px`
  }));

  return {
    selectedOption,
    containerClasses,
    dropdownClasses,
    containerStyles,
    dropdownStyles
  };
}
