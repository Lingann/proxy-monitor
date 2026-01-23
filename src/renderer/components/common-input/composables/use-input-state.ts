import { ref } from 'vue';

export function useInputState() {
  const inputRef = ref<HTMLInputElement | null>(null);
  const isFocused = ref(false);

  /* 聚焦方法 */
  const focus = () => inputRef.value?.focus();
  
  /* 失焦方法 */
  const blur = () => inputRef.value?.blur();

  return {
    inputRef,
    isFocused,
    focus,
    blur
  };
}
