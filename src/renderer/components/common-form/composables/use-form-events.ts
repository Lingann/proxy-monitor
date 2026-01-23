
import { FormItemContext } from '../types';

export function useFormEvents(
  validate: () => Promise<boolean>,
  fields: FormItemContext[],
  onSubmit?: (e?: Event) => void,
  onReset?: (e?: Event) => void
) {
  
  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    const isValid = await validate();
    if (isValid) {
      onSubmit?.(e);
    }
  };

  const handleReset = (e?: Event) => {
    e?.preventDefault();
    fields.forEach(field => {
      field.resetField();
    });
    onReset?.(e);
  };

  return {
    handleSubmit,
    handleReset,
  };
}
