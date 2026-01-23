
import { ref, Ref } from 'vue';
import { SelectConfig } from '../types';

export function useSelectState(mergedConfig: Ref<SelectConfig>) {
  const containerRef = ref<HTMLElement | null>(null);
  const dropdownRef = ref<HTMLElement | null>(null);
  const isOpen = ref(false);
  const dropdownPosition = ref<'top' | 'bottom'>('bottom');

  const open = () => {
    if (isOpen.value || mergedConfig.value.disabled) return;
    
    // Calculate position
    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200; // Approx max height
      
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        dropdownPosition.value = 'top';
      } else {
        dropdownPosition.value = 'bottom';
      }
    }
    
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    if (mergedConfig.value.disabled) return;
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  };

  return {
    containerRef,
    dropdownRef,
    isOpen,
    dropdownPosition,
    open,
    close,
    toggle
  };
}
