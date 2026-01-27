import type { FormItemRule } from './types'

/* 规范化校验规则输入 */
export const normalizeRules = (ruleInput?: FormItemRule | FormItemRule[]): FormItemRule[] => {
  if (!ruleInput) return []

  return Array.isArray(ruleInput) ? ruleInput : [ruleInput]
}
