import { inject } from 'vue';
import { FormContextKey } from '../../types';

/**
 * 获取 Form Context
 */
export function useFormItemConfig() {
  const formContext = inject(FormContextKey);

  if (!formContext) {
    console.warn('CommonFormItem must be used inside CommonForm');
  }

  return {
    formContext
  };
}
