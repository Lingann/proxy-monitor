import { defineComponent, PropType } from 'vue';
import { FormItemRule } from '../types';
import { useFormItemConfig } from '../composables/item/use-form-item-config';
import { useFormItemState } from '../composables/item/use-form-item-state';
import { useFormItemValidation } from '../composables/item/use-form-item-validation';
import { useFormItemRender } from '../composables/item/use-form-item-render';

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
    // 1. Config & Context
    const { formContext } = useFormItemConfig();
    
    // 2. State
    const { validateState, validateMessage, fieldValue } = useFormItemState(props, formContext);

    // 3. Validation
    const { getRules } = useFormItemValidation(props, formContext, fieldValue, validateState, validateMessage);

    // 4. Render Logic
    const { labelStyle, isRequired, shouldShowError } = useFormItemRender(props, formContext, validateState, getRules);

    return () => (
      <div class={['common-form-item', { 'is-error': validateState.value === 'error', 'is-required': isRequired.value }]}>
        {props.label && (
          <label class="common-form-item__label" style={labelStyle.value}>
            {props.label}
          </label>
        )}
        <div class="common-form-item__content">
          {slots.default?.()}
          {shouldShowError.value && (
            <div class="common-form-item__error">
              {validateMessage.value}
            </div>
          )}
        </div>
      </div>
    );
  }
});
