import { InputConfig } from './common-input-types.js';
import { DEFAULT_CLEAR_ICON } from './common-input-utils.js';

/**
 * Creates the main container for the input component
 */
export const createContainer = (config: InputConfig): HTMLElement => {
  const container = document.createElement('div');
  container.className = `common-input ${config.size ? `is-${config.size}` : 'is-medium'}`;
  if (config.disabled) {
    container.classList.add('is-disabled');
  }
  return container;
};

/**
 * Creates the wrapper for input and icons
 */
export const createInputWrapper = (): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.className = 'common-input__wrapper';
  return wrapper;
};

/**
 * Creates the input element
 */
export const createInputElement = (config: InputConfig): HTMLInputElement => {
  const input = document.createElement('input');
  input.className = 'common-input__input';
  input.type = config.type || 'text';
  input.placeholder = config.placeholder || '';
  input.disabled = !!config.disabled;
  
  if (config.maxLength) {
    input.maxLength = config.maxLength;
  }

  if (config.defaultValue) {
    input.value = config.defaultValue;
  }

  return input;
};

/**
 * Creates an icon element
 * @param html The SVG HTML string
 * @param type 'prefix' | 'suffix' | 'clear'
 */
export const createIcon = (html: string, type: 'prefix' | 'suffix' | 'clear'): HTMLElement => {
  const icon = document.createElement('div');
  icon.className = `common-input__icon common-input__icon--${type}`;
  icon.innerHTML = html;
  return icon;
};

/**
 * Creates the clear button
 */
export const createClearButton = (): HTMLElement => {
  const button = createIcon(DEFAULT_CLEAR_ICON, 'clear');
  // Initial state is hidden
  button.style.display = 'none';
  return button;
};

/**
 * Creates the error message element
 */
export const createErrorElement = (): HTMLElement => {
  const error = document.createElement('div');
  error.className = 'common-input__error';
  return error;
};
