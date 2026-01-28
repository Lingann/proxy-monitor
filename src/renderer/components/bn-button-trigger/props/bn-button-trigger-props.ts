import { createVueProps } from '../../../utils/create-vue-props'

import type { ExtractPropTypes, PropType, VNode } from 'vue'

export type ButtonTriggerColor = 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'nature' | 'white' | 'black'

export type ButtonTriggerVariant = 'soft' | 'solid'

export type ButtonTriggerSize = 'small' | 'medium' | 'large'

export type ButtonTriggerShape = 'circle' | 'square' | 'capsule'

export type ButtonTriggerIcon = string | VNode

export const createButtonTriggerProps = createVueProps('button-trigger', {
  color: {
    type: String as PropType<ButtonTriggerColor>,
    default: 'nature'
  },

  variant: {
    type: String as PropType<ButtonTriggerVariant>,
    default: 'soft'
  },

  size: {
    type: String as PropType<ButtonTriggerSize>,
    default: 'medium'
  },

  shape: {
    type: String as PropType<ButtonTriggerShape>,
    default: 'square'
  },

  bordered: {
    type: Boolean,
    default: true
  },

  disabled: {
    type: Boolean,
    default: false
  },

  selected: {
    type: Boolean,
    default: false
  },

  prefixIcon: {
    type: [String, Object] as PropType<ButtonTriggerIcon>,
    default: undefined
  },

  suffixIcon: {
    type: [String, Object] as PropType<ButtonTriggerIcon>,
    default: undefined
  },

  onClick: Function as PropType<(event: MouseEvent) => void>
} as const)

export type ButtonTriggerProps = Partial<ExtractPropTypes<ReturnType<typeof createButtonTriggerProps>>>
