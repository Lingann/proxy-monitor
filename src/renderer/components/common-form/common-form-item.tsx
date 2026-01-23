
import { defineComponent, inject, ref, computed, onMounted, onUnmounted, PropType, watch } from 'vue';
import { FormContextKey, FormItemConfig, FormItemRule, ValidationResult } from './types';
import { getPropValue } from './utils';

export default defineComponent({
  name: 'CommonFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
      default: undefined
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { slots }) {
    const formContext = inject(FormContextKey);
    
    if (!formContext) {
      console.warn('CommonFormItem must be used inside CommonForm');
      return () => null;
    }

    const validateState = ref<'valid' | 'error' | 'validating' | ''>('');
    const validateMessage = ref('');

    const fieldValue = computed(() => {
      if (props.prop && formContext.model) {
        return getPropValue(formContext.model, props.prop);
      }
      return undefined;
    });

    const getRules = (): FormItemRule[] => {
      let rules: FormItemRule[] = [];
      
      // 1. 组件 props 传入的 rules
      if (props.rules) {
        rules = rules.concat(props.rules);
      }
      
      // 2. Form rules
      if (props.prop && formContext.rules.value && formContext.rules.value[props.prop]) {
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
      // 重置值需要在 Form 层或通过 prop 修改，这里 CommonFormItem 主要负责 UI 状态重置
      // 如果需要重置值，可能需要 FormContext 提供 resetValue 方法，或者依赖父组件修改 model
      // 这里的 resetField 主要指清除校验状态
    };

    const clearValidate = () => {
      validateState.value = '';
      validateMessage.value = '';
    };

    const context = {
      prop: props.prop,
      validate,
      resetField,
      clearValidate
    };

    onMounted(() => {
      if (props.prop) {
        formContext.registerField(context);
      }
    });

    onUnmounted(() => {
      if (props.prop) {
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

    // 计算 Label 样式
    const labelStyle = computed(() => {
      const width = props.labelWidth || formContext.config.value.labelWidth;
      if (width) {
        return { width: typeof width === 'number' ? `${width}px` : width };
      }
      return {};
    });

    const isRequired = computed(() => {
        return getRules().some(r => r.required);
    });

    return () => {
      const { showMessage } = props;
      const formShowMessage = formContext.config.value.showMessage;
      const shouldShowError = (showMessage && formShowMessage && validateState.value === 'error');

      return (
        <div class={['common-form-item', { 'is-error': validateState.value === 'error', 'is-required': isRequired.value }]}>
          {props.label && (
            <label class="common-form-item__label" style={labelStyle.value}>
              {props.label}
            </label>
          )}
          <div class="common-form-item__content">
            {slots.default?.()}
            {shouldShowError && (
              <div class="common-form-item__error">
                {validateMessage.value}
              </div>
            )}
          </div>
        </div>
      );
    };
  }
});
