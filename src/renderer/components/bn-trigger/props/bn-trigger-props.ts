import { createVueProps } from '../../../utils/create-vue-props'

import type { ExtractPropTypes, PropType, VNode } from 'vue'

export type TriggerColor = 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'nature' | 'white' | 'black'

export type TriggerVariant = 'soft' | 'solid'

export type TriggerSize = 'small' | 'medium' | 'large'

export type TriggerShape = 'circle' | 'square' | 'capsule'

export type TriggerIcon = string | VNode

export const createTriggerProps = createVueProps('trigger', {
  color: {
    type: String as PropType<TriggerColor>,
    default: 'nature'
  },

  variant: {
    type: String as PropType<TriggerVariant>,
    default: 'soft'
  },

  size: {
    type: String as PropType<TriggerSize>,
    default: 'medium'
  },

  shape: {
    type: String as PropType<TriggerShape>,
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
    type: [String, Object] as PropType<TriggerIcon>,
    default: undefined
  },

  suffixIcon: {
    type: [String, Object] as PropType<TriggerIcon>,
    default: undefined
  },

  onClick: Function as PropType<(event: MouseEvent) => void>
} as const)

export type TriggerProps = Partial<ExtractPropTypes<ReturnType<typeof createTriggerProps>>>
