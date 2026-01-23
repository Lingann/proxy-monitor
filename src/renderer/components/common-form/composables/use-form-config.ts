
import { computed } from 'vue';
import { FormProps, FormConfig } from '../types';

const defaultConfig: FormConfig = {
  labelWidth: '80px',
  labelPosition: 'right',
  size: 'medium',
  disabled: false,
  showMessage: true,
};

export function useFormConfig(props: FormProps) {
  const config = computed(() => {
    return { ...defaultConfig, ...props.config };
  });

  return {
    config,
  };
}
