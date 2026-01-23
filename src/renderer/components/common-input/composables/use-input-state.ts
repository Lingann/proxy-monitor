import { ref } from 'vue';

export function useInputState() {
  const inputRef = ref<HTMLInputElement | null>(null);
  const isFocused = ref(false);

  const focus = () => inputRef.value?.focus();
  const blur = () => inputRef.value?.blur();

  return {
    inputRef,
    isFocused,
    focus,
    blur
  };
}
