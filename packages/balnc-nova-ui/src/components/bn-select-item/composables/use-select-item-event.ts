import type { SelectItemProps } from '../props'

export function useSelectItemEvent(props: SelectItemProps) {
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) return

    props.onClick?.(event)
  }

  return {
    handleClick
  }
}
