import type { ButtonTriggerProps } from '../props'

export function useButtonTriggerEvent(props: ButtonTriggerProps) {
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) return

    props.onClick?.(event)
  }

  return {
    handleClick
  }
}
