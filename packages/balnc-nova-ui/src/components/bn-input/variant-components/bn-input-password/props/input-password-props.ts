/**
 * ******************************************************
 * @file                     bn-input-password-props.ts
 * @description             「密码输入框属性定义」
 * 定义密码输入框的属性
 * @author                  blancnova-web
 * ******************************************************
 */

import { createVueProps } from '../../../../../utils/create-vue-props'
import type { ExtractPropTypes } from 'vue'

import { inputProps } from '../../../props/input-props'

// ==================================================
// #region 密码输入框属性定义
// ==================================================

/**
 * 创建密码输入框属性
 * @returns 「密码输入框属性定义」包含默认值的属性定义
 */
export const inputPasswordProps = createVueProps('bn-input-password', {
  ...inputProps(),
  visibilityToggle: {
    type: Boolean,
    default: true
  }
})

// #endregion
// ==================================================

export type InputPasswordProps = Partial<ExtractPropTypes<ReturnType<typeof inputPasswordProps>>>
