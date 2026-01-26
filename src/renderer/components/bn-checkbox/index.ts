/**
 * ******************************************************
 * @file                     index.ts
 * @description             「复选框组件入口」
 * 导出复选框组件及相关类型
 * @author                  blancnova-web
 * ******************************************************
 */

import { BnCheckbox } from './bn-checkbox'
import { BnCheckboxGroup } from './bn-checkbox-group'

// 导出组件
export {
  BnCheckbox,
  BnCheckboxGroup
}

// 导出类型
export * from './types'

// 默认导出组件
export default {
  BnCheckbox,
  BnCheckboxGroup
}
