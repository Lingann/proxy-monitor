
import { FormItemContext, ValidationResult } from '../types';

export function useFormValidation(fields: FormItemContext[]) {
  
  const validate = async (callback?: (isValid: boolean, invalidFields?: Record<string, ValidationResult[]>) => void): Promise<boolean> => {
    let isValid = true;
    const invalidFields: Record<string, ValidationResult[]> = {};

    for (const field of fields) {
      const result = await field.validate();
      if (!result.isValid) {
        isValid = false;
        if (!invalidFields[field.prop]) {
          invalidFields[field.prop] = [];
        }
        invalidFields[field.prop].push(result);
      }
    }

    if (callback) {
      callback(isValid, isValid ? undefined : invalidFields);
    }
    
    return isValid;
  };

  const validateField = async (prop: string, cb?: (isValid: boolean, message?: string) => void) => {
    const field = fields.find(f => f.prop === prop);
    if (field) {
      const result = await field.validate();
      if (cb) {
        cb(result.isValid, result.message);
      }
    }
  };

  const clearValidate = (props?: string | string[]) => {
    let targetProps: string[] = [];
    if (Array.isArray(props)) {
      targetProps = props;
    } else if (typeof props === 'string') {
      targetProps = [props];
    } else {
      targetProps = fields.map(f => f.prop);
    }

    fields.forEach(field => {
      if (targetProps.includes(field.prop)) {
        field.clearValidate();
      }
    });
  };

  return {
    validate,
    validateField,
    clearValidate,
  };
}
