/**
 * ******************************************************
 * @file                     bn-form-item.tsx
 * @description             「表单项组件」
 * 基于 bn 体系的表单项组件
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import type { SetupContext, VNode } from 'vue'
import {
  cloneVNode,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRef,
  watch
} from 'vue'

import { normalizeRules, useFieldValidation } from '../../../../shared/validation'
import { useFormItemConfig } from './composables/use-form-item-config'
import { useFormItemRender } from './composables/use-form-item-render'
import { useFormItemState } from './composables/use-form-item-state'
import { bnFormItemProps, type BnFormItemProps } from './props/form-item-props'
import type { FormItemRule, FormTrigger, ValidatableField, ValidationResult } from '../../types'
import { FormItemContextKey } from '../../types'

export const BnFormItem = defineComponent({
  name: 'BnFormItem',

  props: bnFormItemProps(),

  setup(props: BnFormItemProps, { slots }: SetupContext) {
    const { formContext } = useFormItemConfig()

    const { fieldValue } = useFormItemState(props, formContext)

    const fieldRef = ref<ValidatableField | null>(null)

    /* 判断子组件是否具备独立校验能力 */
    const isChildValidatable = computed(() => {
      const field = fieldRef.value

      return !!field && typeof field.validate === 'function' && typeof field.clearValidate === 'function'
    })

    const shouldValidate = computed(() => !isChildValidatable.value)

    const {
      validateState,
      validateMessage,
      validate,
      clearValidate,
      showError,
      getRules
    } = useFieldValidation({
      fieldValue,
      rules: toRef(props, 'rules'),
      formRules: formContext?.rules,
      prop: toRef(props, 'prop'),
      required: toRef(props, 'required'),
      label: toRef(props, 'label'),
      shouldValidate
    })

    watch(isChildValidatable, (value) => {
      if (!value) return

      clearValidate()
    })

    const { labelStyle, isRequired, shouldShowError: baseShouldShowError } = useFormItemRender(
      props,
      formContext,
      validateState,
      getRules
    )

    const shouldShowError = computed(() => !isChildValidatable.value && baseShouldShowError.value)

    const hasError = computed(() => !isChildValidatable.value && validateState.value === 'error')

    /* 触发当前表单项校验 */
    const validateField = async (trigger?: FormTrigger): Promise<ValidationResult> => {
      if (isChildValidatable.value && fieldRef.value?.validate) return fieldRef.value.validate(trigger)

      return validate(trigger)
    }

    /* 清理表单项校验状态 */
    const clearValidateField = () => {
      if (isChildValidatable.value) {
        fieldRef.value?.clearValidate()

        return
      }

      clearValidate()
    }

    /* 显示指定错误信息 */
    const showErrorMessage = (message: string) => {
      if (isChildValidatable.value && fieldRef.value?.showError) {
        fieldRef.value.showError(message)

        return
      }

      showError(message)
    }

    const context: ValidatableField = {
      prop: props.prop || '',
      validate: validateField,
      clearValidate: clearValidateField,
      showError: showErrorMessage
    }

    onMounted(() => {
      if (props.prop && formContext) {
        formContext.registerField(context)
      }
    })

    onUnmounted(() => {
      if (props.prop && formContext) {
        formContext.unregisterField(context)
      }
    })

    /* 向子组件暴露校验触发函数 */
    const notifyBlur = () => validateField('blur')

    const notifyChange = () => validateField('change')

    provide(FormItemContextKey, {
      notifyBlur,
      notifyChange
    })

    /* 判断子组件是否声明 rules */
    const hasRulesProp = (node: VNode): boolean => {
      if (!node || typeof node.type !== 'object') return false

      const propsOption = (node.type as { props?: Record<string, unknown> }).props

      if (!propsOption || typeof propsOption !== 'object') return false

      return 'rules' in propsOption
    }

    /* 获取子组件规则并统一格式 */
    const getChildRules = (node: VNode): FormItemRule[] => {
      if (!node.props || typeof node.props !== 'object') return []

      const propsRules = (node.props as { rules?: FormItemRule | FormItemRule[] }).rules

      return normalizeRules(propsRules)
    }

    /* 渲染并注入子组件规则 */
    const renderFieldContent = () => {
      const children = slots.default?.() ?? []

      if (!children.length) return children

      const [firstChild, ...restChildren] = children

      const childProps: Record<string, unknown> = {
        ref: fieldRef
      }

      if (hasRulesProp(firstChild)) {
        const childRules = getChildRules(firstChild)

        childProps.rules = [...childRules, ...getRules()]
      }

      return [cloneVNode(firstChild, childProps), ...restChildren]
    }

    return () => (
      <div
        class={[
          'bn-form-item',
          {
            'bn-form-item--error': hasError.value,
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
          {renderFieldContent()}

          {shouldShowError.value && (
            <div class="bn-form-item__error">{validateMessage.value}</div>
          )}
        </div>
      </div>
    )
  }
})
