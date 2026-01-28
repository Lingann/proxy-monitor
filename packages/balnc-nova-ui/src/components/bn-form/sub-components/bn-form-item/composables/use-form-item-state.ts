/**
 * ******************************************************
 * @file                     use-form-item-state.ts
 * @description             「表单项状态逻辑」
 * 管理表单项的字段值
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed } from 'vue'

import type { FormContext } from '../../../types'
import type { BnFormItemProps } from '../props/form-item-props'
import { getPropValue } from '../../../utils'

/* 管理 FormItem 的字段值 */
export function useFormItemState(
  props: BnFormItemProps,
  formContext: FormContext | undefined
) {
  const fieldValue = computed<unknown>(() => {
    if (props.prop && formContext?.model) {
      return getPropValue(formContext.model, props.prop)
    }

    return undefined
  })

  return {
    fieldValue
  }
}
