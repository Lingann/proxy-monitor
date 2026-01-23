
import { watch, onUnmounted, Ref } from 'vue';
import { CommonSelectProps, SelectOption, ValidateTrigger } from '../types';

interface UseSelectEventsParams {
  props: CommonSelectProps;
  isOpen: Ref<boolean>;
  close: () => void;
  containerRef: Ref<HTMLElement | null>;
  triggers: Ref<ValidateTrigger[]>;
  validate: () => Promise<boolean>;
}

export function useSelectEvents({
  props,
  isOpen,
  close,
  containerRef,
  triggers,
  validate
}: UseSelectEventsParams) {
  
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
      close();
      if (triggers.value.includes('blur')) {
        validate();
      }
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    
    props.onUpdateModelValue?.(option.value);
    props.onChange?.(option.value, option);
    close();
    
    if (triggers.value.includes('change')) {
      validate();
    }
  };

  // Watch isOpen to manage event listener
  watch(isOpen, (val) => {
    if (val) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return {
    handleSelect
  };
}
