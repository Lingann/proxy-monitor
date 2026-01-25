/**
 * ******************************************************
 * @file                     index.ts
 * @description             「单选框 Props 导出」
 * @author                  blancnova-web
 * ******************************************************
 */
import type { ExtractPropTypes } from 'vue'

import { createRadioProps } from './radio'
import { createRadioGroupProps } from './radio-group'

export {
  createRadioProps,
  createRadioGroupProps
}

export type RadioProps = Partial<ExtractPropTypes<ReturnType<typeof createRadioProps>>>
export type RadioGroupProps = Partial<ExtractPropTypes<ReturnType<typeof createRadioGroupProps>>>
