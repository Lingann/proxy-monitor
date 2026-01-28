import './styles/index.scss'

import { defineComponent, isVNode, ref } from 'vue'

import { createTriggerProps, type TriggerIcon, type TriggerProps } from './props'
import { useTriggerClasses } from './composables/use-trigger-classes'
import { useTriggerEvent } from './composables/use-trigger-event'

export const BnTrigger = defineComponent<TriggerProps>({
  name: 'BnTrigger',
  props: createTriggerProps(),
  setup(props, { slots }) {
    const triggerRef = ref<HTMLElement | null>(null)

    const { triggerClass } = useTriggerClasses(props)

    const { handleClick } = useTriggerEvent(props)

    const renderIcon = (icon?: TriggerIcon) => {
      if (!icon) return null

      if (typeof icon === 'string') return <i class={icon} />

      if (isVNode(icon)) return icon

      return null
    }

    const renderPrefix = () => {
      if (slots.prefix) {
        return (
          <span class="bn-trigger__prefix">
            {slots.prefix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.prefixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-trigger__prefix">
          {iconNode}
        </span>
      )
    }

    const renderSuffix = () => {
      if (slots.suffix) {
        return (
          <span class="bn-trigger__suffix">
            {slots.suffix()}
          </span>
        )
      }

      const iconNode = renderIcon(props.suffixIcon)

      if (!iconNode) return null

      return (
        <span class="bn-trigger__suffix">
          {iconNode}
        </span>
      )
    }

    const renderDefault = () => {
      if (!slots.default) return null

      return (
        <span class="bn-trigger__label">
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

export default BnTrigger
