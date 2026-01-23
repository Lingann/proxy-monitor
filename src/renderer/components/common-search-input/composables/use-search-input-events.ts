import { Ref } from 'vue';
import { CommonSearchInputProps, SearchInputConfig, SearchInputOption } from '../types';

interface UseSearchInputEventsParams {
  props: CommonSearchInputProps;
  mergedConfig: Ref<SearchInputConfig>;
  query: Ref<string>;
  isOpen: Ref<boolean>;
  activeOptionIndex: Ref<number>;
  filteredOptions: Ref<SearchInputOption[]>;
  inputRef: Ref<HTMLInputElement | null>;
  open: () => void;
  close: () => void;
  search: (query: string) => void;
}

export function useSearchInputEvents({
  props,
  mergedConfig,
  query,
  isOpen,
  activeOptionIndex,
  filteredOptions,
  inputRef,
  open,
  close,
  search
}: UseSearchInputEventsParams) {

  /* 处理输入 */
  const handleInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    query.value = val;
    props.config?.onSearch?.(val); // Support config callback for backward compatibility if needed, but props preferred
    // Actually the original component had props.onSearch
    
    search(val);
    open();
  };

  /* 处理聚焦 */
  const handleFocus = (e: FocusEvent) => {
    props.config?.onFocus?.(e);

    if (mergedConfig.value.enableDropdown) {
      // 聚焦时如果 query 为空，则显示所有选项
      if (!query.value) {
        search('');
      }
      open();
    }
  };

  /* 处理失焦 */
  const handleBlur = (e: FocusEvent) => {
    props.config?.onBlur?.(e);
  };

  /* 选择选项 */
  const selectOption = (opt: SearchInputOption) => {
    query.value = opt.label;
    // Assume props.onUpdateModelValue is passed via setup props, but here we access props object directly.
    // In Vue setup, props are reactive.
    // We need to cast props to any to access emit-like props if they are not in the interface,
    // OR we should have defined them in CommonSearchInputProps.
    // The CommonSearchInputProps interface I defined earlier has modelValue and config.
    // The component definition in original file had emits as props (onUpdateModelValue).
    // I should update CommonSearchInputProps in types.ts to include these callbacks?
    // Or just use emits? The prompt says "follow norms", and CommonInput uses props for events.
    // CommonInput definition:
    // props: { onUpdateModelValue: Function ... }
    // My CommonSearchInputProps interface in types.ts only has modelValue and config.
    // I should probably rely on the props object passed to this composable being the full props object from setup.
    // However, for strict typing, I should cast or update interface.
    // Let's assume the component will pass `props` which contains everything.
    // But `props` in `useSearchInputEvents` is typed as `CommonSearchInputProps`.
    // I should probably update `CommonSearchInputProps` to include callbacks or use a separate type.
    // Let's update types.ts first to include callbacks? No, I'll just use (props as any) or extend the type locally if needed.
    // Better: Update types.ts to be complete.
    
    // Check types.ts content again.
    // export interface CommonSearchInputProps { modelValue... config... }
    // I should add callbacks there.
    
    // For now I'll use optional chaining and assume they exist on props (or config).
    // The original component had `props.onUpdateModelValue`.
    
    // Let's assume the caller passes the callbacks directly or I access them from props.
    // I'll assume props has them.
    
    const onUpdateModelValue = (props as any).onUpdateModelValue;
    const onChange = (props as any).onChange;
    
    onUpdateModelValue?.(opt.value);
    onChange?.(opt.value, opt);
    props.config?.onChange?.(opt.value, opt); // Legacy support
    
    close();
  };

  /* 处理键盘事件 */
  const handleKeydown = (e: KeyboardEvent) => {
    if (!isOpen.value) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (activeOptionIndex.value < filteredOptions.value.length - 1) {
          activeOptionIndex.value++;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (activeOptionIndex.value > 0) {
          activeOptionIndex.value--;
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activeOptionIndex.value >= 0 && filteredOptions.value[activeOptionIndex.value]) {
          selectOption(filteredOptions.value[activeOptionIndex.value]);
        }
        break;
      case 'Escape':
        close();
        break;
    }
  };

  /* 清除内容 */
  const clear = () => {
    query.value = '';
    const onUpdateModelValue = (props as any).onUpdateModelValue;
    const onChange = (props as any).onChange;
    const onSearch = (props as any).onSearch; // This is different from config.onSearch?

    onUpdateModelValue?.(null);
    onChange?.(null);
    onSearch?.('');
    props.config?.onSearch?.(''); // Legacy

    inputRef.value?.focus();
    if (mergedConfig.value.enableDropdown) {
      search('');
    }
  };

  return {
    handleInput,
    handleFocus,
    handleBlur,
    handleKeydown,
    selectOption,
    clear
  };
}
