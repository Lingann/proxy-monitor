/**
 * Common Input Utils
 */

/**
 * Validates if a string is empty
 * @param value string to check
 * @returns true if empty
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === '';
};

