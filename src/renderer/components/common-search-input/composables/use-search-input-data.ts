import { ref, watch, Ref } from 'vue';
import Fuse from 'fuse.js';
import { SearchInputConfig, SearchInputOption } from '../types';

export function useSearchInputData(mergedConfig: Ref<SearchInputConfig>) {
  const filteredOptions = ref<SearchInputOption[]>([]);
  let fuse: Fuse<SearchInputOption> | null = null;

  /* 初始化 Fuse 实例 */
  const initFuse = () => {
    if (mergedConfig.value.options) {
      fuse = new Fuse(mergedConfig.value.options, {
        keys: mergedConfig.value.searchKeys,
        threshold: 0.4,
        ...mergedConfig.value.fuseOptions
      });
    }
  };

  /* 监听选项变化，重新初始化 Fuse */
  watch(() => mergedConfig.value.options, () => {
    initFuse();
  }, { immediate: true });

  /* 执行搜索 */
  const search = (query: string) => {
    if (!mergedConfig.value.enableDropdown) return;

    const trimmed = query.trim();
    if (!trimmed) {
      filteredOptions.value = mergedConfig.value.options || [];
    } else if (fuse) {
      filteredOptions.value = fuse.search(trimmed).map(r => r.item);
    } else {
      filteredOptions.value = [];
    }
  };

  return {
    filteredOptions,
    search
  };
}
