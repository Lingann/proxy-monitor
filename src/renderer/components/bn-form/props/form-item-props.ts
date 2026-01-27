/**
 * ******************************************************
 * @file                     form-item-props.ts
 * @description             「表单组件 Props 定义」
 * 定义 BnFormItem 的 props
 * @author                  blancnova-web
 * ******************************************************
 */
import { createVueProps } from '../../../utils/create-vue-props'

import type { ExtractPropTypes, PropType } from 'vue'

import type { FormItemRule } from '../types'

/* BnFormItem Props 定义函数 */
export const bnFormItemProps = createVueProps('BnFormItem', {
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
})

/* 导出 BnFormItem Props 类型 */
export type BnFormItemProps = ExtractPropTypes<ReturnType<typeof bnFormItemProps>>
