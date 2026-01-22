import { CommonFormItem } from './common-form-item.js';

export class CommonForm {
    private container: HTMLElement;
    private items: Map<string, CommonFormItem> = new Map();

    constructor(container: HTMLElement) {
        this.container = container;
        this.container.classList.add('common-form');
    }

    public addItem(item: CommonFormItem): void {
        const prop = item.getProp();
        if (prop) {
            this.items.set(prop, item);
        }
    }

    public async validate(): Promise<boolean> {
        let isValid = true;
        const promises: Promise<any>[] = [];

        for (const item of this.items.values()) {
            const control = item.getControl();
            if (control) {
                promises.push(control.validate().then(result => {
                    const valid = typeof result === 'boolean' ? result : result.isValid;
                    if (!valid) {
                        isValid = false;
                    }
                }));
            }
        }

        await Promise.all(promises);
        return isValid;
    }

    public getValues(): Record<string, any> {
        const values: Record<string, any> = {};
        for (const [prop, item] of this.items.entries()) {
            const control = item.getControl();
            if (control) {
                values[prop] = control.getValue();
            }
        }
        return values;
    }

    public setValues(values: Record<string, any>): void {
        for (const [prop, value] of Object.entries(values)) {
            const item = this.items.get(prop);
            if (item) {
                const control = item.getControl();
                if (control) {
                    control.setValue(value);
                }
            }
        }
    }

    public reset(): void {
        for (const item of this.items.values()) {
            const control = item.getControl();
            if (control) {
                if (control.clear) {
                    control.clear();
                } else {
                    control.setValue('');
                }
                
                if (control.clearError) {
                    control.clearError();
                }
            }
        }
    }
}
