/**
 * ******************************************************
 * @file                     bn-form-item.tsx
 * @description             「表单项组件」
 * 基于 bn 体系的表单项组件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { SetupContext } from 'vue'
import { defineComponent } from 'vue'

import { useFormItemConfig } from '../composables/item/use-form-item-config'
import { useFormItemRender } from '../composables/item/use-form-item-render'
import { useFormItemState } from '../composables/item/use-form-item-state'
import { useFormItemValidation } from '../composables/item/use-form-item-validation'
import { bnFormItemProps, type BnFormItemProps } from '../props'

export const BnFormItem = defineComponent({
  name: 'BnFormItem',

  props: bnFormItemProps(),

  setup(props: BnFormItemProps, { slots }: SetupContext) {
    /* 1. Config & Context */
    const { formContext } = useFormItemConfig()

    /* 2. State */
    const { validateState, validateMessage, fieldValue } = useFormItemState(props, formContext)

    /* 3. Validation */
    const { getRules } = useFormItemValidation(
      props,
      formContext,
      fieldValue,
      validateState,
      validateMessage
    )

    /* 4. Render Logic */
    const { labelStyle, isRequired, shouldShowError } = useFormItemRender(
      props,
      formContext,
      validateState,
      getRules
    )

    return () => (
      <div
        class={[
          'bn-form-item',
          {
            'bn-form-item--error': validateState.value === 'error',
            'bn-form-item--required': isRequired.value
          }
        ]}
      >
        {props.label && (
          <label class="bn-form-item__label" style={labelStyle.value}>
            {props.label}
          </label>
        )}

        <div class="bn-form-item__content">
          {slots.default?.()}

          {shouldShowError.value && (
            <div class="bn-form-item__error">{validateMessage.value}</div>
          )}
        </div>
      </div>
    )
  }
})
