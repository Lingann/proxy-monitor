/**
 * ******************************************************
 * @file                     use-form-item-validation.ts
 * @description             「表单项校验逻辑」
 * 处理表单项的校验规则和校验执行
 * @author                  blancnova-web
 * ******************************************************
 */

import { onMounted, onUnmounted, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type {
  FormContext,
  FormItemContext,
  FormItemRule,
  FormRuleMessageType,
  FormTrigger,
  ValidationResult
} from '../../types'
import type { BnFormItemProps } from '../../props'
import { transformRulesToZod, type RuleMessageResolver } from '../../utils/zod-adapter'

/* 处理 FormItem 的校验逻辑 */
export function useFormItemValidation(
  props: BnFormItemProps,
  formContext: FormContext | undefined,
  fieldValue: Ref<unknown>,
  validateState: Ref<'valid' | 'error' | 'validating' | ''>,
  validateMessage: Ref<string>
) {
  const { t } = useI18n()

  const fieldLabel = props.label || props.prop || ''

  const resolveMessage: RuleMessageResolver = (
    rule: FormItemRule,
    messageType: FormRuleMessageType,
    params?: Record<string, number>
  ) => {
    if (rule.message) return rule.message

    if (messageType === 'min') return t('form.validation.min', { min: params?.min })

    if (messageType === 'max') return t('form.validation.max', { max: params?.max })

    if (messageType === 'len') return t('form.validation.len', { len: params?.len })

    if (messageType === 'pattern') return t('form.validation.pattern')

    if (messageType === 'email') return t('form.validation.email')

    if (messageType === 'url') return t('form.validation.url')

    if (messageType === 'number') return t('form.validation.number')

    if (messageType === 'string') return t('form.validation.string')

    if (messageType === 'validator') return t('form.validation.validator')

    if (messageType === 'required') return t('form.validation.required')

    return fieldLabel ? t('form.validation.default_with_field', { field: fieldLabel }) : t('form.validation.default')
  }

  const normalizeRules = (ruleInput?: FormItemRule | FormItemRule[]): FormItemRule[] => {
    if (!ruleInput) return []

    return Array.isArray(ruleInput) ? ruleInput : [ruleInput]
  }

  const getRules = (): FormItemRule[] => {
    const localRules = normalizeRules(props.rules)
    const formRules = props.prop ? normalizeRules(formContext?.rules.value?.[props.prop]) : []

    const mergedRules = [...localRules, ...formRules]

    if (props.required) {
      mergedRules.push({
        required: true,
        message: fieldLabel ? t('form.validation.required_with_field', { field: fieldLabel }) : t('form.validation.required')
      })
    }

    return mergedRules
  }

  const isTriggerMatched = (rule: FormItemRule, trigger?: FormTrigger): boolean => {
    if (!trigger) return true

    if (!rule.trigger) return true

    if (Array.isArray(rule.trigger)) return rule.trigger.includes(trigger)

    return rule.trigger === trigger
  }

  const validate = async (trigger?: FormTrigger): Promise<ValidationResult> => {
    const rules = getRules().filter(rule => isTriggerMatched(rule, trigger))

    if (!rules.length) return { isValid: true }

    validateState.value = 'validating'

    const zodSchema = transformRulesToZod(rules, resolveMessage)

    const result = await zodSchema.safeParseAsync(fieldValue.value)

    if (result.success) {
      validateState.value = 'valid'
      validateMessage.value = ''

      return { isValid: true }
    }

    const firstError = result.error.errors[0]

    validateState.value = 'error'
    validateMessage.value = firstError?.message || resolveMessage(rules[0], 'default')

    return { isValid: false, message: validateMessage.value }
  }

  const resetField = () => {
    validateState.value = ''
    validateMessage.value = ''
  }

  const clearValidate = () => {
    validateState.value = ''
    validateMessage.value = ''
  }

  const context: FormItemContext = {
    prop: props.prop || '',
    validate,
    resetField,
    clearValidate
  };

  onMounted(() => {
    if (props.prop && formContext) {
      formContext.registerField(context);
    }
  });

  onUnmounted(() => {
    if (props.prop && formContext) {
      formContext.unregisterField(context);
    }
  });

  /* 监听值变化，自动校验 */
  watch(fieldValue, () => {
    const rules = getRules()

    if (rules.some(rule => isTriggerMatched(rule, 'change'))) validate('change')
  })

  return {
    validate,
    resetField,
    clearValidate,
    getRules
  };
}
