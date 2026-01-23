
import { FormItemContext } from '../types';

export function useFormEvents(
  validate: () => Promise<boolean>,
  fields: FormItemContext[],
  emit: (event: 'submit' | 'reset', ...args: any[]) => void
) {
  
  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    const isValid = await validate();
    if (isValid) {
      emit('submit');
    }
  };

  const handleReset = (e?: Event) => {
    e?.preventDefault();
    fields.forEach(field => {
      field.resetField();
    });
    emit('reset');
  };

  return {
    handleSubmit,
    handleReset,
  };
}
