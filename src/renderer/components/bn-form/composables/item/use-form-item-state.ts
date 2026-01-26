/**
 * ******************************************************
 * @file                     use-form-item-state.ts
 * @description             「表单项状态逻辑」
 * 管理表单项的校验状态和字段值
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, ref } from 'vue'

import type { FormContext } from '../../types'
import type { BnFormItemProps } from '../../props'
import { getPropValue } from '../../utils'

/* 管理 FormItem 的状态 */
export function useFormItemState(
  props: BnFormItemProps,
  formContext: FormContext | undefined
) {
  const validateState = ref<'valid' | 'error' | 'validating' | ''>('')
  const validateMessage = ref('')

  const fieldValue = computed<unknown>(() => {
    if (props.prop && formContext?.model) {
      return getPropValue(formContext.model, props.prop)
    }

    return undefined
  })

  return {
    validateState,
    validateMessage,
    fieldValue
  }
}
