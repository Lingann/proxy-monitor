import './styles/index.scss'

import { defineComponent, isVNode, ref } from 'vue'

import { createButtonTriggerProps, type ButtonTriggerIcon, type ButtonTriggerProps } from './props'
import { useButtonTriggerClasses } from './composables/use-button-trigger-classes'
import { useButtonTriggerEvent } from './composables/use-button-trigger-event'

export const BnButtonTrigger = defineComponent<ButtonTriggerProps>({
  name: 'BnButtonTrigger',
  props: createButtonTriggerProps(),
  setup(props, { slots }) {
    const triggerRef = ref<HTMLElement | null>(null)

    const { triggerClass } = useButtonTriggerClasses(props)

    const { handleClick } = useButtonTriggerEvent(props)

    const renderIcon = (icon?: ButtonTriggerIcon) => {
      if (!icon) return null

      if (typeof icon === 'string') return <i class={icon} />

      if (isVNode(icon)) return icon

      return null
    }

    const renderPrefix = () => {
      if (slots.prefix) {
        return (
          <span class="bn-button-trigger__prefix">
            {slots.prefix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.prefixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-button-trigger__prefix">
          {iconNode}
        </span>
      )
    }

    const renderSuffix = () => {
      if (slots.suffix) {
        return (
          <span class="bn-button-trigger__suffix">
            {slots.suffix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.suffixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-button-trigger__suffix">
          {iconNode}
        </span>
      )
    }

    const renderDefault = () => {
      if (!slots.default) return null

      return (
        <span class="bn-button-trigger__label">
          {slots.default()}
        </span>
      )
    }

    return () => (
      <button
        ref={triggerRef}
        class={triggerClass.value}
        disabled={props.disabled}
        type="button"
        aria-pressed={props.selected}
        onClick={handleClick}
      >
        {renderPrefix()}

        {renderDefault()}

        {renderSuffix()}
      </button>
    )
  }
})

export default BnButtonTrigger
