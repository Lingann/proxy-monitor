import { createVueProps } from '../../../utils/create-vue-props'

import type { ExtractPropTypes, PropType, VNode } from 'vue'

export type SelectItemColor = 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'nature' | 'white' | 'black'

export type SelectItemVariant = 'soft' | 'solid'

export type SelectItemSize = 'small' | 'medium' | 'large'

export type SelectItemShape = 'circle' | 'square' | 'capsule'

export type SelectItemIcon = string | VNode

export type SelectItemTrigger = 'click' | 'hover'

export const createSelectItemProps = createVueProps('select-item', {
  trigger: {
    type: String as PropType<SelectItemTrigger>,
    default: 'click'
  },

  color: {
    type: String as PropType<SelectItemColor>,
    default: 'nature'
  },

  variant: {
    type: String as PropType<SelectItemVariant>,
    default: 'soft'
  },

  size: {
    type: String as PropType<SelectItemSize>,
    default: 'medium'
  },

  shape: {
    type: String as PropType<SelectItemShape>,
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
    type: [String, Object] as PropType<SelectItemIcon>,
    default: undefined
  },

  suffixIcon: {
    type: [String, Object] as PropType<SelectItemIcon>,
    default: undefined
  },

  onClick: Function as PropType<(event: MouseEvent) => void>
} as const)

export type SelectItemProps = Partial<ExtractPropTypes<ReturnType<typeof createSelectItemProps>>>
