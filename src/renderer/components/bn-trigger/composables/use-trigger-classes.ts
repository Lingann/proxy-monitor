import { computed, type ComputedRef } from 'vue'

import type { TriggerProps } from '../props'

interface UseTriggerClassesReturn {
  triggerClass: ComputedRef<string>
}

export function useTriggerClasses(props: TriggerProps): UseTriggerClassesReturn {
  const triggerClass = computed(() => {
    const classList: string[] = ['bn-trigger']

    if (props.variant) classList.push(`bn-trigger--variant-${props.variant}`)

    if (props.color) classList.push(`bn-trigger--color-${props.color}`)

    if (props.size) classList.push(`bn-trigger--size-${props.size}`)

    if (props.shape) classList.push(`bn-trigger--shape-${props.shape}`)

    if (props.bordered) classList.push('bn-trigger--bordered')

    if (props.disabled) classList.push('bn-trigger--disabled')

    if (props.selected) classList.push('bn-trigger--selected')

    return classList.filter(Boolean).join(' ')
  })

  return {
    triggerClass
  }
}
