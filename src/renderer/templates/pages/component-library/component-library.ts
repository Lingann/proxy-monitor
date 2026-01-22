import { CommonForm, CommonFormItem } from '../../components/common-form/index.js';
import { CommonInput } from '../../components/common-input/index.js';
import { CommonSelect } from '../../components/common-select/index.js';

export function initComponentLibrary() {
    const container = document.getElementById('demo-form-container');
    if (!container) return;

    // Clear container to prevent duplicate init if called multiple times
    container.innerHTML = '';

    const form = new CommonForm(container);

    // 1. Username Input
    const usernameItem = new CommonFormItem(form, container, {
        label: 'Username',
        prop: 'username',
        required: true
    });
    
    const usernameInput = new CommonInput({
        container: usernameItem.getContentElement(),
        placeholder: 'Enter username',
        clearable: true,
        validator: {
            trigger: ['blur', 'change'],
            validate: async (value: string) => {
                if (!value) return { isValid: false, message: 'Username is required' };
                if (value.length < 3) return { isValid: false, message: 'Must be at least 3 chars' };
                return { isValid: true };
            }
        }
    });
    usernameItem.setControl(usernameInput);

    // 2. Email Input
    const emailItem = new CommonFormItem(form, container, {
        label: 'Email',
        prop: 'email',
        required: true
    });

    const emailInput = new CommonInput({
        container: emailItem.getContentElement(),
        placeholder: 'Enter email',
        type: 'email',
        clearable: true,
        validator: {
            trigger: ['blur'],
            validate: async (value: string) => {
                if (!value) return { isValid: false, message: 'Email is required' };
                if (!value.includes('@')) return { isValid: false, message: 'Invalid email format' };
                return { isValid: true };
            }
        }
    });
    emailItem.setControl(emailInput);

    // 3. Role Select
    const roleItem = new CommonFormItem(form, container, {
        label: 'Role',
        prop: 'role',
        required: true
    });

    const roleSelect = new CommonSelect(roleItem.getContentElement(), {
        placeholder: 'Select role',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'Guest', value: 'guest' }
        ],
        validator: {
            trigger: ['change'],
            validate: async (value: string | number | null) => {
                if (!value) return { isValid: false, message: 'Role is required' };
                return { isValid: true };
            }
        }
    });
    roleItem.setControl(roleSelect);

    // Buttons
    document.getElementById('validate-btn')?.addEventListener('click', async () => {
        const isValid = await form.validate();
        showOutput(`Validation Result: ${isValid}`);
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => {
        form.reset();
        showOutput('Form Reset');
    });

    document.getElementById('get-values-btn')?.addEventListener('click', () => {
        const values = form.getValues();
        showOutput(JSON.stringify(values, null, 2));
    });

    document.getElementById('set-values-btn')?.addEventListener('click', () => {
        form.setValues({
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin'
        });
        showOutput('Values Set');
    });

    function showOutput(text: string) {
        const el = document.getElementById('form-output');
        if (el) {
            el.style.display = 'block';
            el.textContent = text;
        }
    }
}
