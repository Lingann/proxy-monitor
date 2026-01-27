/**
 * ******************************************************
 * @file                     index.ts
 * @description             「输入框组件导出」
 * 导出所有输入框相关组件
 * @author                  blancnova-web
 * ******************************************************
 */

import BnInput from './input'
import { BnInputPassword } from './variant-components/bn-input-password'
import { BnInputSearch } from './variant-components/bn-input-search'

export type * from './props'
export type * from './variant-components/bn-input-search/types'

export {
  BnInput,
  BnInputPassword,
  BnInputSearch
}
export default { BnInput, BnInputPassword, BnInputSearch }
