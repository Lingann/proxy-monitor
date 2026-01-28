/**
 * ******************************************************
 * @file                     use-form-item-config.ts
 * @description             「表单项配置逻辑」
 * 获取表单上下文
 * @author                  blancnova-web
 * ******************************************************
 */

import { inject } from 'vue'

import { FormContextKey } from '../../../types'

/* 获取 Form Context */
export function useFormItemConfig() {
  const formContext = inject(FormContextKey)

  if (!formContext) {
    console.warn('BnFormItem must be used inside BnForm')
  }

  return {
    formContext
  }
}
