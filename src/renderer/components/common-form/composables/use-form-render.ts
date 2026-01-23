
import { computed, Ref } from 'vue';
import { FormConfig } from '../types';

export function useFormRender(config: Ref<FormConfig>) {
  
  const formClasses = computed(() => {
    return [
      'common-form',
      `common-form--label-${config.value.labelPosition}`,
      `common-form--size-${config.value.size}`,
    ];
  });

  return {
    formClasses,
  };
}
