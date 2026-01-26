/**
 * ******************************************************
 * @file                     form-props.ts
 * @description             「表单组件 Props 定义」
 * 定义 BnForm 的 props
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ExtractPropTypes, PropType } from 'vue'

import type { FormRules } from '../types'

/* BnForm Props 定义函数 */
export function bnFormProps() {
  return {
    /* 表单数据模型 */
    model: {
      type: Object as PropType<Record<string, unknown>>,
      required: true
    },

    /* 表单校验规则 */
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },

    /* 标签宽度 */
    labelWidth: {
      type: [String, Number] as PropType<string | number>,
      default: '80px'
    },

    /* 标签对齐方式 */
    labelPosition: {
      type: String as PropType<'left' | 'right' | 'top'>,
      default: 'right'
    },

    /* 表单尺寸 */
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },

    /* 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },

    /* 是否显示校验错误信息 */
    showMessage: {
      type: Boolean,
      default: true
    },

    /* 提交事件回调 */
    onSubmit: {
      type: Function as PropType<(e?: Event) => void>,
      default: undefined
    },

    /* 重置事件回调 */
    onReset: {
      type: Function as PropType<(e?: Event) => void>,
      default: undefined
    }
  } as const
}

/* 导出 BnForm Props 类型 */
export type BnFormProps = ExtractPropTypes<ReturnType<typeof bnFormProps>>
