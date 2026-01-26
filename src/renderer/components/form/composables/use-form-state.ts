
import { computed } from 'vue';
import { FormProps } from '../types';

export function useFormState(props: FormProps) {
  // 这里可以扩展更多的表单级状态，例如 isSubmitting, isValid 等
  // 目前主要关注 model 的传递
  
  const model = computed(() => props.model);

  return {
    model,
  };
}
