/**
 * ******************************************************
 * @file                     use-form-render.ts
 * @description             「表单渲染逻辑」
 * 计算表单的样式类名
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, type Ref } from 'vue'

export function useFormRender(
  labelPosition: Ref<'left' | 'right' | 'top' | undefined>,
  size: Ref<'small' | 'medium' | 'large' | undefined>
) {
  const formClasses = computed(() => {
    return [
      'bn-form',
      `bn-form--label-${labelPosition.value}`,
      `bn-form--size-${size.value}`
    ]
  })

  return {
    formClasses
  }
}
