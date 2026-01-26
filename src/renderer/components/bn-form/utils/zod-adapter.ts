import { z } from 'zod'

import type {
  FormItemRule,
  FormItemRuleValidator,
  FormRuleMessageType,
  LegacyFormItemRuleValidator,
  ValidationResult
} from '../types'

export interface RuleMessageResolver {
  (rule: FormItemRule, messageType: FormRuleMessageType, params?: Record<string, number>): string
}

/* 判断值是否为空 */
const isEmptyValue = (value: unknown): boolean => {
  if (value === undefined || value === null) return true

  if (typeof value === 'string') return value.trim().length === 0

  if (Array.isArray(value)) return value.length === 0

  return false
}

/* 获取值长度 */
const getValueLength = (value: unknown): number | null => {
  if (typeof value === 'string') return value.length

  if (Array.isArray(value)) return value.length

  return null
}

/* 获取数值 */
const getNumberValue = (value: unknown): number | null => {
  if (typeof value !== 'number') return null

  if (Number.isNaN(value)) return null

  return value
}

/* 判断是否为校验结果对象 */
const isValidationResult = (value: unknown): value is ValidationResult => {
  if (!value || typeof value !== 'object') return false

  return 'isValid' in value
}

/* 执行自定义校验器 */
const resolveValidatorResult = async (
  rule: FormItemRule,
  value: unknown
): Promise<ValidationResult | string | boolean | undefined> => {
  if (!rule.validator) return true

  const validator = rule.validator
  const validatorResult = await Promise.resolve(
    validator.length > 1
      ? (validator as FormItemRuleValidator)(rule, value)
      : (validator as LegacyFormItemRuleValidator)(value)
  ).catch((error: unknown) => {
    if (typeof error === 'string') return error

    return false
  })

  // 类型守卫：将 void 转换为 undefined
  if (validatorResult === undefined) {
    return undefined
  }

  return validatorResult
}

/* 将规则转换为 Zod Schema */
export const transformRulesToZod = (
  rules: FormItemRule[],
  resolveMessage: RuleMessageResolver
) => {
  return z.any().superRefine(async (value, ctx) => {
    for (const rule of rules) {
      const isEmpty = isEmptyValue(value)

      if (rule.required && isEmpty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: resolveMessage(rule, 'required')
        })

        return
      }

      if (isEmpty) continue

      const valueLength = getValueLength(value)
      const numberValue = getNumberValue(value)

      if (typeof rule.len === 'number') {
        if (numberValue !== null && numberValue !== rule.len) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'len', { len: rule.len })
          })

          return
        }

        if (valueLength !== null && valueLength !== rule.len) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'len', { len: rule.len })
          })

          return
        }
      }

      if (typeof rule.min === 'number') {
        if (numberValue !== null && numberValue < rule.min) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'min', { min: rule.min })
          })

          return
        }

        if (valueLength !== null && valueLength < rule.min) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'min', { min: rule.min })
          })

          return
        }
      }

      if (typeof rule.max === 'number') {
        if (numberValue !== null && numberValue > rule.max) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'max', { max: rule.max })
          })

          return
        }

        if (valueLength !== null && valueLength > rule.max) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'max', { max: rule.max })
          })

          return
        }
      }

      if (rule.pattern) {
        const regex = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern

        if (typeof value === 'string' && !regex.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'pattern')
          })

          return
        }
      }

      if (rule.type === 'email' && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'email')
          })

          return
        }
      }

      if (rule.type === 'url' && typeof value === 'string') {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i

        if (!urlRegex.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: resolveMessage(rule, 'url')
          })

          return
        }
      }

      if (rule.type === 'number' && numberValue === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: resolveMessage(rule, 'number')
        })

        return
      }

      if (rule.type === 'string' && typeof value !== 'string') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: resolveMessage(rule, 'string')
        })

        return
      }

      if (rule.validator) {
        const validatorResult = await resolveValidatorResult(rule, value)

        if (typeof validatorResult === 'string') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: validatorResult
          })

          return
        }

        if (typeof validatorResult === 'boolean') {
          if (!validatorResult) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: resolveMessage(rule, 'validator')
            })

            return
          }
        }

        if (isValidationResult(validatorResult) && !validatorResult.isValid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: validatorResult.message || resolveMessage(rule, 'validator')
          })

          return
        }
      }
    }
  })
}
