import type { TriggerProps } from '../props'

export function useTriggerEvent(props: TriggerProps) {
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) return

    props.onClick?.(event)
  }

  return {
    handleClick
  }
}
