import { computed } from 'vue';
import { SearchInputConfig, CommonSearchInputProps } from '../types';

export function useSearchInputConfig(props: CommonSearchInputProps) {
  /* 合并默认配置 */
  const mergedConfig = computed<SearchInputConfig>(() => ({
    width: '100%',
    size: 'medium',
    maxItems: 5,
    searchKeys: ['label'],
    clearable: true,
    enableDropdown: false,
    disabled: false,
    ...props.config
  }));

  return {
    mergedConfig
  };
}
