import { defineComponent } from 'vue';
import styles from './component-library.module.scss';
import { useDemoState } from './composables/use-demo-state';
import CommonForm from '../../components/form/common-form';
import CommonFormItem from '../../components/form/sub-components/common-form-item';
import { BnInput } from '../../components/input';
import CommonSelect from '../../components/common-select/common-select';

export default defineComponent({
    name: 'ComponentLibraryView',
    setup() {
        const { formData, rules, output, formRef } = useDemoState();

        const handleValidate = async () => {
            if (!formRef.value) return;
            try {
                const valid = await formRef.value.validate();
                output.value = `Validation result: ${valid ? 'Success' : 'Failed'}`;
            } catch (e) {
                output.value = `Validation error: ${e}`;
            }
        };

        const handleReset = () => {
            if (!formRef.value) return;
            formRef.value.resetFields();
            output.value = 'Form reset';
        };

        const handleGetValues = () => {
            output.value = JSON.stringify(formData, null, 2);
        };

        const handleSetValues = () => {
            formData.username = 'admin';
            formData.email = 'admin@example.com';
            formData.role = 'admin';
            output.value = 'Values set to admin defaults';
        };

        return () => (
            <div class={styles.container}>
                <div class={styles.section}>
                    <h3>Common Form Demo</h3>
                    <div class={styles.demoForm}>
                        <CommonForm ref={formRef} model={formData} rules={rules}>
                            <CommonFormItem prop="username" label="Username">
                                <BnInput
                                    modelValue={formData.username}
                                    onUpdate:modelValue={(v: string | number | null) => formData.username = String(v || '')}
                                    placeholder="Enter username"
                                    block
                                />
                            </CommonFormItem>
                            <CommonFormItem prop="email" label="Email">
                                <BnInput
                                    modelValue={formData.email}
                                    onUpdate:modelValue={(v: string | number | null) => formData.email = String(v || '')}
                                    placeholder="Enter email"
                                    block
                                />
                            </CommonFormItem>
                            <CommonFormItem prop="role" label="Role">
                                <CommonSelect
                                    modelValue={formData.role}
                                    onUpdateModelValue={(v: string | number | null) => formData.role = String(v || '')}
                                    config={{
                                        placeholder: 'Select role',
                                        options: [
                                            { label: 'Admin', value: 'admin' },
                                            { label: 'User', value: 'user' },
                                            { label: 'Guest', value: 'guest' }
                                        ]
                                    }}
                                />
                            </CommonFormItem>
                        </CommonForm>
                    </div>

                    <div class={styles.actions}>
                        <button class={[styles.btn, styles.primary]} onClick={handleValidate}>Validate</button>
                        <button class={styles.btn} onClick={handleReset}>Reset</button>
                        <button class={styles.btn} onClick={handleGetValues}>Get Values</button>
                        <button class={styles.btn} onClick={handleSetValues}>Set Values</button>
                    </div>

                    <div class={styles.output}>
                        {output.value || '// Output will appear here'}
                    </div>
                </div>
            </div>
        );
    }
});
