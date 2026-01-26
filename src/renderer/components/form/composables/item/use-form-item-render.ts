/**
 * ******************************************************
 * @file                     use-form-item-render.ts
 * @description             「表单项渲染逻辑」
 * 处理表单项的样式、类名、显示控制
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, type Ref } from 'vue'

import type { FormContext, FormItemRule } from '../../types'
import type { BnFormItemProps } from '../../props'

/* 处理 FormItem 的渲染逻辑 */
export function useFormItemRender(
  props: BnFormItemProps,
  formContext: FormContext | undefined,
  validateState: Ref<string>,
  getRules: () => FormItemRule[]
) {
  const labelStyle = computed(() => {
    const width = props.labelWidth || formContext?.labelWidth.value

    if (width) {
      return { width: typeof width === 'number' ? `${width}px` : width }
    }

    return {}
  })

  const isRequired = computed(() => {
    return getRules().some((r) => r.required)
  })

  const shouldShowError = computed(() => {
    const { showMessage } = props
    const formShowMessage = formContext?.showMessage.value

    /* 默认 true, 除非显式 false */
    return showMessage !== false && formShowMessage !== false && validateState.value === 'error'
  })

  return {
    labelStyle,
    isRequired,
    shouldShowError
  }
}
