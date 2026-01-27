import { ref } from 'vue'

import type { ValidatableField } from '../types'

/* 管理表单字段注册表 */
export function useFormRegistry() {
  const fields = ref<ValidatableField[]>([])

  /* 注册字段 */
  const registerField = (field: ValidatableField) => {
    if (!field.prop) {
      console.warn('BnForm: registerField 缺少 prop，已忽略')

      return
    }

    if (fields.value.some(item => item.prop === field.prop)) {
      console.warn(`BnForm: 字段已注册，已忽略重复注册 (${field.prop})`)

      return
    }

    fields.value.push(field)
  }

  /* 注销字段 */
  const unregisterField = (field: ValidatableField) => {
    if (!field.prop) {
      console.warn('BnForm: unregisterField 缺少 prop，已忽略')

      return
    }

    const index = fields.value.findIndex(item => item.prop === field.prop)

    if (index === -1) {
      console.warn(`BnForm: 字段未注册，无法注销 (${field.prop})`)

      return
    }

    fields.value.splice(index, 1)
  }

  return {
    fields,
    registerField,
    unregisterField
  }
}
