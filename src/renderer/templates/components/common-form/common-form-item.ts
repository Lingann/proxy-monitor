import { FormControl, FormItemConfig } from './common-form-types.js';
import { CommonForm } from './common-form.js';

export class CommonFormItem {
    private container: HTMLElement;
    private contentContainer!: HTMLElement;
    private control: FormControl | null = null;
    private config: FormItemConfig;
    private form: CommonForm;

    constructor(form: CommonForm, container: HTMLElement, config: FormItemConfig) {
        this.form = form;
        this.config = config;
        this.container = document.createElement('div');
        this.container.className = 'common-form-item';
        
        this.render();
        container.appendChild(this.container);
        
        // Register self to form if prop exists
        if (config.prop) {
            this.form.addItem(this);
        }
    }

    private render(): void {
        // Label
        if (this.config.label) {
            const label = document.createElement('label');
            label.className = 'common-form-item__label';
            if (this.config.required) {
                label.classList.add('is-required');
            }
            label.textContent = this.config.label;
            this.container.appendChild(label);
        }

        // Content
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'common-form-item__content';
        this.container.appendChild(this.contentContainer);
    }

    public getContentElement(): HTMLElement {
        return this.contentContainer;
    }

    public setControl(control: FormControl): void {
        this.control = control;
    }

    public getControl(): FormControl | null {
        return this.control;
    }

    public getProp(): string | undefined {
        return this.config.prop;
    }
}
