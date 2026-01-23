
import { ref } from 'vue';
import { FormItemContext } from '../types';

export function useFormRegistry() {
  const fields = ref<FormItemContext[]>([]);

  const registerField = (field: FormItemContext) => {
    if (field.prop) {
      fields.value.push(field);
    }
  };

  const unregisterField = (field: FormItemContext) => {
    if (field.prop) {
      fields.value.splice(fields.value.indexOf(field), 1);
    }
  };

  return {
    fields,
    registerField,
    unregisterField,
  };
}
