
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CommonSelectProps, SelectConfig, ValidateTrigger } from '../types';

export function useSelectConfig(props: CommonSelectProps) {
  const { t } = useI18n();

  const mergedConfig = computed<SelectConfig>(() => ({
    options: [],
    maxItems: 5,
    placeholder: t('common.please_select'),
    size: 'medium',
    disabled: false,
    clearable: false,
    ...props.config
  }));

  const triggers = computed<ValidateTrigger[]>(() => {
    const t = props.config?.validator?.trigger;
    if (!t) return ['change'];
    return Array.isArray(t) ? t : [t];
  });

  return {
    mergedConfig,
    triggers
  };
}
