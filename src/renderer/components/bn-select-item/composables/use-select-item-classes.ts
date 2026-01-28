import { computed, type ComputedRef } from 'vue'

import type { SelectItemProps } from '../props'

interface UseSelectItemClassesReturn {
  triggerClass: ComputedRef<string>
}

export function useSelectItemClasses(props: SelectItemProps): UseSelectItemClassesReturn {
  const triggerClass = computed(() => {
    const classList: string[] = ['bn-select-item']

    if (props.variant) classList.push(`bn-select-item--variant-${props.variant}`)

    if (props.color) classList.push(`bn-select-item--color-${props.color}`)

    if (props.size) classList.push(`bn-select-item--size-${props.size}`)

    if (props.shape) classList.push(`bn-select-item--shape-${props.shape}`)

    if (props.bordered) classList.push('bn-select-item--bordered')

    if (props.disabled) classList.push('bn-select-item--disabled')

    if (props.selected) classList.push('bn-select-item--selected')

    return classList.filter(Boolean).join(' ')
  })

  return {
    triggerClass
  }
}
