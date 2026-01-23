import { computed, Ref } from 'vue';
import { FormItemConfig, FormContext, FormItemRule } from '../../types';

/**
 * 处理 FormItem 的渲染逻辑 (样式、类名、显示控制)
 */
export function useFormItemRender(
  props: FormItemConfig,
  formContext: FormContext | undefined,
  validateState: Ref<string>,
  getRules: () => FormItemRule[]
) {
  const labelStyle = computed(() => {
    const width = props.labelWidth || formContext?.config.value.labelWidth;
    if (width) {
      return { width: typeof width === 'number' ? `${width}px` : width };
    }
    return {};
  });

  const isRequired = computed(() => {
    return getRules().some(r => r.required);
  });
  
  const shouldShowError = computed(() => {
      const { showMessage } = props;
      const formShowMessage = formContext?.config.value.showMessage;
      // 默认 true, 除非显式 false
      return (showMessage !== false && formShowMessage !== false && validateState.value === 'error');
  });

  return {
    labelStyle,
    isRequired,
    shouldShowError
  };
}
