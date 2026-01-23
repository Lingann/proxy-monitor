import { ref, computed } from 'vue';
import { FormItemConfig, FormContext } from '../../types';
import { getPropValue } from '../../utils';

/**
 * 管理 FormItem 的状态 (校验状态、字段值)
 */
export function useFormItemState(props: FormItemConfig, formContext: FormContext | undefined) {
  const validateState = ref<'valid' | 'error' | 'validating' | ''>('');
  const validateMessage = ref('');

  const fieldValue = computed(() => {
    if (props.prop && formContext?.model) {
      return getPropValue(formContext.model, props.prop);
    }
    return undefined;
  });

  return {
    validateState,
    validateMessage,
    fieldValue
  };
}
