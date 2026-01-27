import { computed, ref, watch, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { transformRulesToZod, type RuleMessageResolver } from './zod-adapter'
import { normalizeRules } from './utils'
import type {
  FormItemRule,
  FormRules,
  FormRuleMessageType,
  FormTrigger,
  ValidationResult,
  ValidationState
} from './types'

export interface FieldValidationOptions {
  fieldValue: Ref<unknown>;
  rules?: Ref<FormItemRule | FormItemRule[] | undefined>;
  formRules?: Ref<FormRules | undefined>;
  prop?: Ref<string | undefined>;
  required?: Ref<boolean | undefined>;
  label?: Ref<string | undefined>;
  shouldValidate?: Ref<boolean>;
}

const isTriggerMatched = (rule: FormItemRule, trigger?: FormTrigger): boolean => {
  if (!trigger) return true

  if (!rule.trigger) return true

  if (Array.isArray(rule.trigger)) return rule.trigger.includes(trigger)

  return rule.trigger === trigger
}

export const useFieldValidation = (options: FieldValidationOptions) => {
  const { t } = useI18n()

  const validateState = ref<ValidationState>('')

  const validateMessage = ref('')

  const fieldLabel = computed(() => options.label?.value || options.prop?.value || '')

  const shouldValidate = computed(() => options.shouldValidate?.value !== false)

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

    return fieldLabel.value
      ? t('form.validation.default_with_field', { field: fieldLabel.value })
      : t('form.validation.default')
  }

  const getRules = (): FormItemRule[] => {
    const localRules = normalizeRules(options.rules?.value)

    const fieldProp = options.prop?.value
    const formRules = fieldProp ? normalizeRules(options.formRules?.value?.[fieldProp]) : []

    const mergedRules = [...localRules, ...formRules]

    if (options.required?.value) {
      mergedRules.push({
        required: true,
        message: fieldLabel.value
          ? t('form.validation.required_with_field', { field: fieldLabel.value })
          : t('form.validation.required')
      })
    }

    return mergedRules
  }

  const validate = async (trigger?: FormTrigger): Promise<ValidationResult> => {
    if (!shouldValidate.value) return { isValid: true }

    const rules = getRules().filter(rule => isTriggerMatched(rule, trigger))

    if (!rules.length) return { isValid: true }

    validateState.value = 'validating'

    const zodSchema = transformRulesToZod(rules, resolveMessage)

    const result = await zodSchema.safeParseAsync(options.fieldValue.value)

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

  const clearValidate = () => {
    validateState.value = ''
    validateMessage.value = ''
  }

  const showError = (message: string) => {
    validateState.value = 'error'
    validateMessage.value = message

    return { isValid: false, message }
  }

  watch(options.fieldValue, () => {
    if (!shouldValidate.value) return

    const rules = getRules()

    if (rules.some(rule => isTriggerMatched(rule, 'change'))) validate('change')
  })

  return {
    validateState,
    validateMessage,
    validate,
    clearValidate,
    showError,
    getRules
  }
}
