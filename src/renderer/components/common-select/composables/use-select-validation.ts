
import { ref, Ref } from 'vue';
import { SelectConfig } from '../types';

export function useSelectValidation(
  getValue: () => string | number | null,
  mergedConfig: Ref<SelectConfig>
) {
  const isValid = ref(true);
  const errorMessage = ref('');

  const validate = async () => {
    if (!mergedConfig.value.validator) return true;
    
    try {
      const result = await mergedConfig.value.validator.validate(getValue());
      isValid.value = result.isValid;
      errorMessage.value = result.message || '';
      return result.isValid;
    } catch (e) {
      console.error('Validation error:', e);
      return false;
    }
  };

  const setError = (msg: string) => {
    isValid.value = false;
    errorMessage.value = msg;
  };

  const clearError = () => {
    isValid.value = true;
    errorMessage.value = '';
  };

  return {
    isValid,
    errorMessage,
    validate,
    setError,
    clearError
  };
}
