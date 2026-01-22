import { SelectOption, ValidatorFunction, ValidationResult } from './common-select-types.js';

/**
 * Validates the value using the provided validator function.
 */
export function validateValue(value: string | number | null, validator?: ValidatorFunction): ValidationResult {
  if (!validator) return { valid: true };
  return validator(value);
}

/**
 * Finds an option by value.
 */
export function findOption(options: SelectOption[], value: string | number | null): SelectOption | undefined {
  if (value === null || value === undefined) return undefined;
  return options.find(opt => opt.value === value);
}

/**
 * Calculates whether the dropdown should open upwards or downwards.
 * @param triggerRect The bounding client rect of the trigger element
 * @param dropdownHeight The estimated or actual height of the dropdown
 * @param windowHeight The window inner height
 * @returns 'top' | 'bottom'
 */
export function calculateDropdownPosition(
  triggerRect: DOMRect, 
  dropdownHeight: number, 
  windowHeight: number
): 'top' | 'bottom' {
  const spaceBelow = windowHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  
  // Default to bottom if there is enough space (e.g., 200px buffer or actual height)
  // If we don't know the height yet, we assume a reasonable max height (e.g. 250px)
  const targetHeight = dropdownHeight || 250;

  if (spaceBelow >= targetHeight) {
    return 'bottom';
  }
  
  if (spaceAbove >= targetHeight) {
    return 'top';
  }
  
  // If neither fits fully, pick the larger one
  return spaceBelow >= spaceAbove ? 'bottom' : 'top';
}
