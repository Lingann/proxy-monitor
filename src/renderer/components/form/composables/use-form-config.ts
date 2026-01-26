/**
 * ******************************************************
 * @file                     use-form-config.ts
 * @description             「表单配置逻辑」
 * 管理表单的配置信息
 * @author                  blancnova-web
 * ******************************************************
 */

import { toRef } from 'vue'

import type { BnFormProps } from '../props'

export function useFormConfig(props: BnFormProps) {
  const labelWidth = toRef(props, 'labelWidth')
  const labelPosition = toRef(props, 'labelPosition')
  const size = toRef(props, 'size')
  const disabled = toRef(props, 'disabled')
  const showMessage = toRef(props, 'showMessage')

  return {
    labelWidth,
    labelPosition,
    size,
    disabled,
    showMessage
  }
}
