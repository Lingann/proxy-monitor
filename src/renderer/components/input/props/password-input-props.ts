/**
 * ******************************************************
 * @file                     password-input-props.ts
 * @description             「密码输入框属性定义」
 * 定义密码输入框的属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '@blanc-nova/vue-utils'
import type { ExtractPropTypes } from 'vue'

import { inputProps } from './input-props'

// ==================================================
// #region 密码输入框属性定义
// ==================================================

/**
 * 创建密码输入框属性
 * @returns 「密码输入框属性定义」包含默认值的属性定义
 */
export const passwordInputProps = createVueProps('password-input', {
  ...inputProps(),
  visibilityToggle: {
    type: Boolean,
    default: true
  }
})

// #endregion
// ==================================================

export type PasswordInputProps = Partial<ExtractPropTypes<ReturnType<typeof passwordInputProps>>>
