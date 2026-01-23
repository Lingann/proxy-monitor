
import { defineComponent, PropType, provide, toRef } from 'vue';
import { FormContextKey, FormRules, FormConfig } from './types';
import { useFormRegistry } from './composables/use-form-registry';
import { useFormConfig } from './composables/use-form-config';
import { useFormValidation } from './composables/use-form-validation';
import { useFormEvents } from './composables/use-form-events';
import { useFormRender } from './composables/use-form-render';
import './common-form.scss';

export default defineComponent({
  name: 'CommonForm',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    config: {
      type: Object as PropType<FormConfig>,
      default: () => ({})
    },
    onSubmit: {
      type: Function as PropType<(e?: Event) => void>,
      default: undefined
    },
    onReset: {
      type: Function as PropType<(e?: Event) => void>,
      default: undefined
    }
  },
  setup(props, { slots, expose }) {
    
    // 1. Config
    const { config } = useFormConfig(props);
    
    // 2. Registry
    const { fields, registerField, unregisterField } = useFormRegistry();

    // 3. Validation
    const { validate, validateField, clearValidate } = useFormValidation(fields.value);

    // 4. Events
    const { handleSubmit, handleReset } = useFormEvents(validate, fields.value, props.onSubmit, props.onReset);

    // 5. Render
    const { formClasses } = useFormRender(config);

    // Provide Context
    provide(FormContextKey, {
      model: props.model,
      rules: toRef(props, 'rules'),
      config,
      registerField,
      unregisterField,
      validateField
    });

    // Expose methods
    expose({
      validate,
      validateField,
      clearValidate,
      resetFields: handleReset,
      submit: handleSubmit
    });

    return () => (
      <form class={formClasses.value} onSubmit={handleSubmit} onReset={handleReset}>
        {slots.default?.()}
      </form>
    );
  }
});
