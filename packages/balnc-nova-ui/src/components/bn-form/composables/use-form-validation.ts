import type { Ref } from 'vue'

import type { ValidatableField, ValidationResult } from '../types'

/* 处理表单校验流程 */
export function useFormValidation(fields: Ref<ValidatableField[]>) {
  /* 校验全部字段 */
  const validate = async (
    callback?: (isValid: boolean, invalidFields?: Record<string, ValidationResult[]>) => void
  ): Promise<boolean> => {
    let isValid = true

    const invalidFields: Record<string, ValidationResult[]> = {}

    for (const field of fields.value) {
      const result = await field.validate()

      if (!result.isValid) {
        isValid = false

        if (!invalidFields[field.prop]) {
          invalidFields[field.prop] = []
        }

        invalidFields[field.prop].push(result)
      }
    }

    if (callback) {
      callback(isValid, isValid ? undefined : invalidFields)
    }

    return isValid
  }

  /* 校验指定字段 */
  const validateField = async (prop: string, cb?: (isValid: boolean, message?: string) => void) => {
    const field = fields.value.find(item => item.prop === prop)

    if (!field) {
      console.warn(`未找到需要校验的字段: ${prop}`)

      return
    }

    const result = await field.validate()

    if (cb) {
      cb(result.isValid, result.message)
    }
  }

  /* 清理指定字段的校验状态 */
  const clearValidate = (props?: string | string[]) => {
    let targetProps: string[] = []

    if (Array.isArray(props)) {
      targetProps = props
    } else if (typeof props === 'string') {
      targetProps = [props]
    } else {
      targetProps = fields.value.map(field => field.prop)
    }

    fields.value.forEach(field => {
      if (targetProps.includes(field.prop)) {
        field.clearValidate()
      }
    })
  }

  return {
    validate,
    validateField,
    clearValidate
  }
}
