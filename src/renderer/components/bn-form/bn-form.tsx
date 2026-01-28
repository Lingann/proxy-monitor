/**
 * ******************************************************
 * @file                     bn-form.tsx
 * @description             「表单组件」
 * 基于 bn 体系的表单组件
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import type { SetupContext } from 'vue'
import { defineComponent, provide, toRef } from 'vue'

import { useFormEvents } from './composables/use-form-events'
import { useFormRegistry } from './composables/use-form-registry'
import { useFormRender } from './composables/use-form-render'
import { useFormValidation } from './composables/use-form-validation'
import { bnFormProps, type BnFormProps } from './props/form-props'
import { FormContextKey } from './types'

export const BnForm = defineComponent({
  name: 'BnForm',

  props: bnFormProps(),

  setup(props: BnFormProps, { slots, expose }: SetupContext) {
    /* 1. Config */
    const labelWidth = toRef(props, 'labelWidth')

    const labelPosition = toRef(props, 'labelPosition')

    const size = toRef(props, 'size')

    const disabled = toRef(props, 'disabled')

    const showMessage = toRef(props, 'showMessage')

    /* 2. Registry */
    const { fields, registerField, unregisterField } = useFormRegistry()

    /* 3. Validation */
    const { validate, validateField, clearValidate } = useFormValidation(fields)

    /* 4. Events */
    const { handleSubmit, handleReset } = useFormEvents(
      validate,
      fields,
      props.onSubmit,
      props.onReset
    )

    /* 5. Render */
    const { formClasses } = useFormRender(labelPosition, size)

    /* Provide Context */
    provide(FormContextKey, {
      model: props.model,
      rules: toRef(props, 'rules'),
      labelWidth,
      labelPosition,
      size,
      disabled,
      showMessage,
      registerField,
      unregisterField,
      validateField
    })

    /* Expose methods */
    expose({
      validate,
      validateField,
      clearValidate,
      resetFields: handleReset,
      submit: handleSubmit
    })

    return () => (
      <form class={formClasses.value} onSubmit={handleSubmit} onReset={handleReset}>
        {slots.default?.()}
      </form>
    )
  }
})
