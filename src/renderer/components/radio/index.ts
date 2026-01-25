/**
 * ******************************************************
 * @file                     index.ts
 * @description             「单选框组件入口」
 * 导出 Radio 和 RadioGroup 组件及相关类型
 * @author                  blancnova-web
 * ******************************************************
 */

import { BnRadio } from './radio'
import { BnRadioGroup } from './radio-group'

// Export components
export {
  BnRadio,
  BnRadioGroup
}

// Export types
export type {
  RadioProps,
  RadioGroupProps
} from './props'

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
