import { computed } from 'vue';
import { InputConfig, ValidateTrigger, CommonInputProps } from '../types';

export function useInputConfig(props: CommonInputProps) {
  /* 合并默认配置和传入配置 */
  const mergedConfig = computed<InputConfig>(() => ({
    size: 'medium',
    type: 'text',
    disabled: false,
    clearable: false,
    trim: false,
    ...props.config
  }));

  /* 获取触发器数组的辅助函数 */
  const triggers = computed<ValidateTrigger[]>(() => {
    const t = mergedConfig.value.validator?.trigger;

    if (!t) {
      return ['blur'];
    }

    return Array.isArray(t) ? t : [t];
  });

  return {
    mergedConfig,
    triggers
  };
}
