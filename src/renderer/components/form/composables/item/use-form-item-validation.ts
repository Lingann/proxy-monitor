/**
 * ******************************************************
 * @file                     use-form-item-validation.ts
 * @description             「表单项校验逻辑」
 * 处理表单项的校验规则和校验执行
 * @author                  blancnova-web
 * ******************************************************
 */

import { onMounted, onUnmounted, type Ref, watch } from 'vue'

import type {
  FormContext,
  FormItemContext,
  FormItemRule,
  ValidationResult
} from '../../types'
import type { BnFormItemProps } from '../../props'

/* 处理 FormItem 的校验逻辑 */
export function useFormItemValidation(
  props: BnFormItemProps,
  formContext: FormContext | undefined,
  fieldValue: Ref<any>,
  validateState: Ref<string>,
  validateMessage: Ref<string>
) {
  const getRules = (): FormItemRule[] => {
    let rules: FormItemRule[] = [];
    
    // 1. 组件 props 传入的 rules
    if (props.rules) {
      rules = rules.concat(props.rules);
    }
    
    // 2. Form rules
    if (props.prop && formContext?.rules.value && formContext.rules.value[props.prop]) {
      const formRules = formContext.rules.value[props.prop];
      rules = rules.concat(formRules);
    }

    // 3. required prop
    if (props.required) {
      rules.push({ required: true, message: `${props.label || props.prop} is required` });
    }

    return rules;
  };

  const validate = async (trigger?: string): Promise<ValidationResult> => {
    const rules = getRules();
    if (!rules.length) {
      return { isValid: true };
    }

    const value = fieldValue.value;
    validateState.value = 'validating';

    for (const rule of rules) {
      // 过滤 trigger
      if (trigger && rule.trigger && rule.trigger !== trigger) {
        continue;
      }

      // 必填校验
      if (rule.required) {
        if (value === undefined || value === null || value === '') {
          validateState.value = 'error';
          validateMessage.value = rule.message || 'Required';
          return { isValid: false, message: validateMessage.value };
        }
      }

      // 长度校验 (min/max)
      if (typeof rule.min === 'number' || typeof rule.max === 'number') {
          const valStr = String(value || '');
          if (typeof rule.min === 'number' && valStr.length < rule.min) {
               validateState.value = 'error';
               validateMessage.value = rule.message || `Length should be at least ${rule.min}`;
               return { isValid: false, message: validateMessage.value };
          }
          if (typeof rule.max === 'number' && valStr.length > rule.max) {
               validateState.value = 'error';
               validateMessage.value = rule.message || `Length should be no more than ${rule.max}`;
               return { isValid: false, message: validateMessage.value };
          }
      }

      // 类型校验 (type=email)
      if (rule.type === 'email') {
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (value && !emailRegex.test(String(value))) {
               validateState.value = 'error';
               validateMessage.value = rule.message || 'Invalid email format';
               return { isValid: false, message: validateMessage.value };
           }
      }

      // 正则校验 (pattern)
      if (rule.pattern) {
           const regex = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern;
           if (value && !regex.test(String(value))) {
               validateState.value = 'error';
               validateMessage.value = rule.message || 'Pattern mismatch';
               return { isValid: false, message: validateMessage.value };
           }
      }

      // 自定义校验器
      if (rule.validator) {
        try {
          const result = await rule.validator(value);
          if (typeof result === 'boolean') {
            if (!result) {
               validateState.value = 'error';
               validateMessage.value = rule.message || 'Validation failed';
               return { isValid: false, message: validateMessage.value };
            }
          } else if (typeof result === 'object' && !result.isValid) {
            validateState.value = 'error';
            validateMessage.value = result.message || rule.message || 'Validation failed';
            return { isValid: false, message: validateMessage.value };
          }
        } catch (e) {
           validateState.value = 'error';
           validateMessage.value = rule.message || 'Validation error';
           return { isValid: false, message: validateMessage.value };
        }
      }
    }

    validateState.value = 'valid';
    validateMessage.value = '';
    return { isValid: true };
  };

  const resetField = () => {
    validateState.value = '';
    validateMessage.value = '';
  };

  const clearValidate = () => {
    validateState.value = '';
    validateMessage.value = '';
  };

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

  // 监听值变化，自动校验 (如果规则中有 trigger: 'change')
  watch(fieldValue, () => {
    const rules = getRules();
    if (rules.some(r => r.trigger === 'change' || !r.trigger)) {
      validate('change');
    }
  });

  return {
    validate,
    resetField,
    clearValidate,
    getRules
  };
}
