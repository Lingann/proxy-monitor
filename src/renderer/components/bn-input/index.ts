/**
 * ******************************************************
 * @file                     index.ts
 * @description             「输入框组件导出」
 * 导出所有输入框相关组件
 * @author                  blancnova-web
 * ******************************************************
 */

import BnInput from './input'
import { BnPasswordInput } from './variant-components/bn-password-input'
import { BnSearchInput } from './variant-components/bn-search-input'

export type * from './props'
export type * from './variant-components/bn-search-input/types'

export {
  BnInput,
  BnPasswordInput,
  BnSearchInput
}
export default { BnInput, BnPasswordInput, BnSearchInput }
