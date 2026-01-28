import type { Ref } from 'vue'

import type { ValidatableField } from '../types'

/* 处理表单提交与重置事件 */
export function useFormEvents(
  validate: () => Promise<boolean>,
  fields: Ref<ValidatableField[]>,
  onSubmit?: (e?: Event) => void,
  onReset?: (e?: Event) => void
) {
  /* 提交表单 */
  const handleSubmit = async (e?: Event) => {
    e?.preventDefault()

    const isValid = await validate()

    if (isValid) {
      onSubmit?.(e)
    }
  }

  /* 重置表单校验状态 */
  const handleReset = (e?: Event) => {
    e?.preventDefault()

    fields.value.forEach(field => {
      field.clearValidate()
    })

    onReset?.(e)
  }

  return {
    handleSubmit,
    handleReset
  }
}
