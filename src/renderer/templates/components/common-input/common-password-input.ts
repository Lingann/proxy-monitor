import { CommonInput } from './common-input.js';
import { InputConfig } from './common-input-types.js';
import { PASSWORD_ICON, EYE_ICON, EYE_OFF_ICON } from '../common-icons/index.js';

export class CommonPasswordInput extends CommonInput {
  constructor(config: InputConfig) {
    super({
      type: 'password',
      prefixIcon: PASSWORD_ICON,
      suffixIcon: EYE_ICON, // Default: Eye icon (click to show)
      ...config
    });
    
    this.initPasswordToggle();
  }

  private initPasswordToggle(): void {
    // Find the suffix icon element
    const suffixIcon = this.wrapper.querySelector('.common-input__icon--suffix') as HTMLElement;
    
    if (suffixIcon) {
      // Make it interactive
      suffixIcon.style.cursor = 'pointer';
      suffixIcon.style.pointerEvents = 'auto';

      suffixIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.togglePasswordVisibility(suffixIcon);
      });
    }
  }

  private togglePasswordVisibility(iconElement: HTMLElement): void {
    const currentType = this.input.type;
    
    if (currentType === 'password') {
      // Switch to text (show password)
      this.input.type = 'text';
      iconElement.innerHTML = EYE_OFF_ICON; // Show slashed eye (click to hide)
    } else {
      // Switch to password (hide password)
      this.input.type = 'password';
      iconElement.innerHTML = EYE_ICON; // Show open eye (click to show)
    }
    
    // Ensure input keeps focus
    this.input.focus();
  }
}
