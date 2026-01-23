import { ref, watch, Ref, onUnmounted } from 'vue';
import { CommonSearchInputProps, SearchInputConfig } from '../types';

export function useSearchInputState(
  props: CommonSearchInputProps,
  mergedConfig: Ref<SearchInputConfig>
) {
  const containerRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);
  const isOpen = ref(false);
  const query = ref('');
  const activeOptionIndex = ref(-1);

  /* 监听 modelValue 变化，同步 query */
  watch(() => props.modelValue, (newVal) => {
    if (!newVal && newVal !== 0) {
      query.value = '';
      return;
    }
    const opt = mergedConfig.value.options?.find(o => o.value === newVal);
    if (opt) {
      query.value = opt.label;
    } else {
      query.value = String(newVal);
    }
  }, { immediate: true });

  /* 打开下拉框 */
  const open = () => {
    if (isOpen.value || mergedConfig.value.disabled || !mergedConfig.value.enableDropdown) return;
    isOpen.value = true;
    document.addEventListener('click', handleClickOutside);
  };

  /* 关闭下拉框 */
  const close = () => {
    isOpen.value = false;
    activeOptionIndex.value = -1;
    document.removeEventListener('click', handleClickOutside);
  };

  /* 点击外部关闭 */
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
      close();
    }
  };

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return {
    containerRef,
    inputRef,
    isOpen,
    query,
    activeOptionIndex,
    open,
    close
  };
}
