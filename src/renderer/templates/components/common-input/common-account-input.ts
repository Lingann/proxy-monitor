import { CommonInput } from './common-input.js';
import { InputConfig } from './common-input-types.js';
import { ACCOUNT_ICON } from './common-input-utils.js';

export class CommonAccountInput extends CommonInput {
  constructor(config: InputConfig) {
    super({
      type: 'text',
      prefixIcon: ACCOUNT_ICON,
      clearable: true,
      ...config
    });
  }
}
