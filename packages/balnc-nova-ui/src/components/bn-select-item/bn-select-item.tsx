import './styles/index.scss'

import { defineComponent, isVNode, ref } from 'vue'

import { createSelectItemProps, type SelectItemIcon, type SelectItemProps } from './props'
import { useSelectItemClasses } from './composables/use-select-item-classes'
import { useSelectItemEvent } from './composables/use-select-item-event'

export const BnSelectItem = defineComponent<SelectItemProps>({
  name: 'BnSelectItem',
  props: createSelectItemProps(),
  setup(props, { slots }) {
    const triggerRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const { triggerClass } = useSelectItemClasses(props)

    const { handleClick } = useSelectItemEvent(props)

    const renderIcon = (icon?: SelectItemIcon) => {
      if (!icon) return null

      if (typeof icon === 'string') return <i class={icon} />

      if (isVNode(icon)) return icon

      return null
    }

    const renderPrefix = () => {
      if (slots.prefix) {
        return (
          <span class="bn-select-item__prefix">
            {slots.prefix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.prefixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-select-item__prefix">
          {iconNode}
        </span>
      )
    }

    const renderSuffix = () => {
      if (slots.suffix) {
        return (
          <span class="bn-select-item__suffix">
            {slots.suffix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.suffixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-select-item__suffix">
          {iconNode}
        </span>
      )
    }

    const renderDefault = () => {
      if (!slots.default) return null

      return (
        <span class="bn-select-item__label">
          {slots.default()}
        </span>
      )
    }

    const handleMouseEnter = () => {
      if (props.trigger === 'hover' && contentRef.value) {
        contentRef.value.style.display = 'block'
      }
    }

    const handleMouseLeave = () => {
      if (props.trigger === 'hover' && contentRef.value) {
        contentRef.value.style.display = 'none'
      }
    }

    const handleTriggerClick = (event: MouseEvent) => {
      if (props.trigger === 'click' && contentRef.value) {
        const isVisible = contentRef.value.style.display !== 'none'
        contentRef.value.style.display = isVisible ? 'none' : 'block'
      }
      handleClick(event)
    }

    return () => (
      <div
        class="bn-select-item-wrapper"
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
      >
        <button
          ref={triggerRef}
          class={triggerClass.value}
          disabled={props.disabled}
          type="button"
          aria-pressed={props.selected}
          onClick={handleTriggerClick}
        >
          {renderPrefix()}
          {renderDefault()}
          {renderSuffix()}
        </button>
        {slots.trigger && (
          <div
            ref={contentRef}
            class="bn-select-item__content"
            style={{ display: props.trigger === 'hover' ? 'none' : undefined }}
          >
            {slots.trigger()}
          </div>
        )}
      </div>
    )
  }
})

export default BnSelectItem
