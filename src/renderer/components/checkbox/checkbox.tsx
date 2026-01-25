/**
 * ******************************************************
 * @file                     checkbox.tsx
 * @description             「复选框组件」
 * 定义复选框组件的实现
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import type { SetupContext } from 'vue'
import { computed, defineComponent, inject } from 'vue'

import { useCheckbox } from './composables'
import { CHECKBOX_GROUP_KEY, type CheckboxGroupContext } from './composables/use-checkbox-group'
import { type CheckboxProps, checkboxProps } from './props'
import type { CheckboxChangeEvent, CheckboxValueType } from './types'

/**
 * 复选框组件
 * @description 基于 Ant Design 规范实现的复选框组件
 */
export const BnCheckbox = defineComponent({
  name: 'BnCheckbox',

  props: checkboxProps(),

  setup(props: CheckboxProps, { slots }: SetupContext) {
    /* 获取复选框组上下文 */
    const checkboxGroupContext = inject<CheckboxGroupContext | null>(CHECKBOX_GROUP_KEY, null)
    const isInGroup = computed(() => checkboxGroupContext !== null && props.value !== undefined)

    /* 获取独立复选框的逻辑 */
    const standalone = useCheckbox(props)

    /* --- 状态计算 --- */

    /* 最终禁用状态：优先考虑 Group 的 disabled */
    const finalIsDisabled = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.disabled?.value || props.disabled
        : standalone.isDisabled.value
    )

    /* 最终选中状态：优先考虑 Group 的 checkedValue */
    const finalIsChecked = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.checkedValue.value?.includes(props.value as CheckboxValueType) ?? false
        : standalone.isChecked.value
    )

    /* 最终尺寸：优先考虑 Group 的 size */
    const finalSize = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.size || props.size
        : props.size
    )

    /* 最终 name 属性：仅在 Group 中有意义 */
    const finalName = computed(() =>
      isInGroup.value ? checkboxGroupContext?.name : undefined
    )

    /* --- 样式计算 --- */
    const checkboxClass = computed(() => {
      /* Indeterminate 状态优先于 checked 状态显示，并且仅在未选中时应用 */
      const isActuallyIndeterminate = props.indeterminate && !finalIsChecked.value

      return [
        'bn-checkbox',
        !isActuallyIndeterminate && finalIsChecked.value && 'bn-checkbox--checked',
        finalIsDisabled.value && 'bn-checkbox--disabled',
        isActuallyIndeterminate && 'bn-checkbox--indeterminate',
        finalSize.value && `bn-checkbox--${finalSize.value}`
      ]
    })

    /* --- 事件处理 --- */
    const handleChange = (e: Event) => {
      if (finalIsDisabled.value) return

      const target = e.target as HTMLInputElement
      const checked = target.checked

      /* 创建 change 事件对象 */
      const changeEvent: CheckboxChangeEvent = {
        target: {
          checked,
          value: props.value
        },
        stopPropagation: () => e.stopPropagation(),
        preventDefault: () => e.preventDefault(),
        nativeEvent: e
      }

      /* 在 Group 中且 props.value 有效时，更新 Group 状态 */
      if (isInGroup.value && checkboxGroupContext && props.value !== undefined) {
        checkboxGroupContext.registerValue(props.value, checked)

        props.onChange?.(changeEvent)
      } else {
        /* 独立状态：调用 standalone 的 handleChange */
        standalone.handleChange(e)
      }
    }

    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(e)
    }

    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.(e)
    }

    return () => (
      <label class={checkboxClass.value}>
        <span class="bn-checkbox__inner" />
        <input
          /* 常规 props */
          autoFocus={props.autoFocus}
          checked={finalIsChecked.value}
          disabled={finalIsDisabled.value}
          name={finalName.value}
          type="checkbox"
          value={props.value as CheckboxValueType}
          /* 事件处理函数 */
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {slots.default && (
          <span class="bn-checkbox__label">
            {slots.default()}
          </span>
        )}
      </label>
    )
  }
})
