import { computed } from 'vue';
import { InputConfig, ValidateTrigger, CommonInputProps } from '../types';

export function useInputConfig(props: CommonInputProps) {
  // Merge default config with provided config
  const mergedConfig = computed<InputConfig>(() => ({
    size: 'medium',
    type: 'text',
    disabled: false,
    clearable: false,
    trim: false,
    ...props.config
  }));

  // Helper to get triggers array
  const triggers = computed<ValidateTrigger[]>(() => {
    const t = mergedConfig.value.validator?.trigger;
    if (!t) return ['blur'];
    return Array.isArray(t) ? t : [t];
  });

  return {
    mergedConfig,
    triggers
  };
}
