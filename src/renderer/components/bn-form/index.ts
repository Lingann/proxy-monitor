/**
 * ******************************************************
 * @file                     index.ts
 * @description             「表单组件导出」
 * 统一导出 BnForm 和 BnFormItem 组件
 * @author                  blancnova-web
 * ******************************************************
 */

export { BnForm } from './bn-form'
export { BnFormItem } from './sub-components/bn-form-item'

export * from './props'
export * from './types'
export { useFormItem } from './composables/item/use-form-item'

/* 向后兼容的别名导出 */
export { BnForm as CommonForm } from './bn-form'
export { BnFormItem as CommonFormItem } from './sub-components/bn-form-item'
