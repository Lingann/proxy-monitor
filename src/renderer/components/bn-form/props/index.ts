/**
 * ******************************************************
 * @file                     index.ts
 * @description             「表单组件 Props 定义」
 * 定义 BnForm 和 BnFormItem 的 props
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ExtractPropTypes, PropType } from 'vue'

import type { FormItemRule, FormRules } from '../types'

/* BnForm Props 定义函数 */
export function bnFormProps() {
  return {
    /* 表单数据模型 */
    model: {
      type: Object as PropType<Record<string, any>>,
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

/* BnFormItem Props 定义函数 */
export function bnFormItemProps() {
  return {
    /* 标签文本 */
    label: {
      type: String,
      default: ''
    },

    /* 字段名 */
    prop: {
      type: String,
      default: ''
    },

    /* 是否必填 */
    required: {
      type: Boolean,
      default: false
    },

    /* 校验规则 */
    rules: {
      type: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
      default: undefined
    },

    /* 是否显示错误信息 */
    showMessage: {
      type: Boolean,
      default: true
    },

    /* 标签宽度 */
    labelWidth: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  } as const
}

/* 导出 BnFormItem Props 类型 */
export type BnFormItemProps = ExtractPropTypes<ReturnType<typeof bnFormItemProps>>
