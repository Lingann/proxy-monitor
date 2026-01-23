import { ref, Ref } from 'vue';
import { InputConfig } from '../types';

export function useInputValidation(
  getValue: () => string,
  config: Ref<InputConfig>
) {
  const isValid = ref(true);
  const errorMessage = ref('');

  const validate = async (): Promise<boolean> => {
    if (!config.value.validator) {
      return true;
    }

    try {
      const result = await config.value.validator.validate(getValue());
      isValid.value = result.isValid;
      errorMessage.value = result.message || '';
      return result.isValid;
    } catch (error) {
      console.error('Validation failed:', error);
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
