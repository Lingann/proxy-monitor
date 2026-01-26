import { inject } from 'vue'

import { FormItemContextKey } from '../../types'

/* 获取 FormItem 校验上下文 */
export const useFormItem = () => {
  const formItemContext = inject(FormItemContextKey, undefined)

  const notifyBlur = () => formItemContext?.validate('blur')

  const notifyChange = () => formItemContext?.validate('change')

  return {
    formItemContext,
    notifyBlur,
    notifyChange
  }
}
