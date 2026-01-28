import { computed, type ComputedRef } from 'vue'

import type { ButtonTriggerProps } from '../props'

interface UseButtonTriggerClassesReturn {
  triggerClass: ComputedRef<string>
}

export function useButtonTriggerClasses(props: ButtonTriggerProps): UseButtonTriggerClassesReturn {
  const triggerClass = computed(() => {
    const classList: string[] = ['bn-button-trigger']

    if (props.variant) classList.push(`bn-button-trigger--variant-${props.variant}`)

    if (props.color) classList.push(`bn-button-trigger--color-${props.color}`)

    if (props.size) classList.push(`bn-button-trigger--size-${props.size}`)

    if (props.shape) classList.push(`bn-button-trigger--shape-${props.shape}`)

    if (props.bordered) classList.push('bn-button-trigger--bordered')

    if (props.disabled) classList.push('bn-button-trigger--disabled')

    if (props.selected) classList.push('bn-button-trigger--selected')

    return classList.filter(Boolean).join(' ')
  })

  return {
    triggerClass
  }
}
