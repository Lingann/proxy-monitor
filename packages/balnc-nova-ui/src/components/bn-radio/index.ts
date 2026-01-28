/**
 * ******************************************************
 * @file                     index.ts
 * @description             「单选框组件入口」
 * 导出 Radio 和 RadioGroup 组件及相关类型
 * @author                  blancnova-web
 * ******************************************************
 */

import { BnRadio } from './bn-radio'
import { BnRadioGroup } from './bn-radio-group'

// Export components
export {
  BnRadio,
  BnRadioGroup
}

// Export types
export type {
  RadioProps
} from './props/radio-props'

export type {
  RadioGroupProps
} from './props/radio-group-props'

export type {
  RadioValueType,
  RadioSize,
  RadioButtonStyle,
  RadioOptionType,
  RadioOptionRenderType,
  RadioChangeEvent,
  RadioGroupChangeEvent,
  RadioEmit,
  RadioGroupEmit
} from './types'

// Default exports (optional, based on project convention)
// export default { BnRadio, BnRadioGroup };
