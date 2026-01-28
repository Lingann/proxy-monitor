import { defineComponent, reactive, ref } from 'vue';
import { BnForm } from '../../../../../components/bn-form';
import { BnFormItem } from '../../../../../components/bn-form';
import { BnInput } from '../../../../../components/bn-input';
import { BnSelect } from '../../../../../components/bn-select';
import styles from './form-actions.module.scss';

export default defineComponent({
    name: 'FormActions',
    setup() {
        const formData = reactive({
            username: '',
            email: '',
            role: ''
        });

        const output = ref('');
        const formRef = ref<any>(null);

        const rules = {
            username: [
                { required: true, message: '用户名必填', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '邮箱必填', trigger: 'blur' }
            ]
        };

        const options = [
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' }
        ];

        const handleValidate = async () => {
            if (!formRef.value) return;
            try {
                const valid = await formRef.value.validate();
                output.value = `验证结果: ${valid ? '成功' : '失败'}`;
            } catch (e) {
                output.value = `验证错误: ${e}`;
            }
        };

        const handleReset = () => {
            if (!formRef.value) return;
            formRef.value.resetFields();
            output.value = '表单已重置';
        };

        const handleGetValues = () => {
            output.value = JSON.stringify(formData, null, 2);
        };

        const handleSetValues = () => {
            formData.username = 'admin';
            formData.email = 'admin@example.com';
            formData.role = 'admin';
            output.value = '已设置为管理员默认值';
        };

        return () => (
            <div class={styles.container}>
                <BnForm ref={formRef} model={formData} rules={rules}>
                    <BnFormItem prop="username" label="用户名">
                        <BnInput
                            modelValue={formData.username}
                            onUpdate:modelValue={(v: string | number | null) => formData.username = String(v || '')}
                            placeholder="请输入用户名"
                            block
                        />
                    </BnFormItem>
                    <BnFormItem prop="email" label="邮箱">
                        <BnInput
                            modelValue={formData.email}
                            onUpdate:modelValue={(v: string | number | null) => formData.email = String(v || '')}
                            placeholder="请输入邮箱"
                            block
                        />
                    </BnFormItem>
                    <BnFormItem label="角色">
                        <BnSelect
                            modelValue={formData.role}
                            onUpdate:modelValue={(v: string | number | null) => formData.role = String(v || '')}
                            placeholder="请选择角色"
                            options={options}
                        />
                    </BnFormItem>
                </BnForm>
                <div class={styles.actions}>
                    <button class={[styles.button, styles.primary]} onClick={handleValidate}>验证</button>
                    <button class={styles.button} onClick={handleReset}>重置</button>
                    <button class={styles.button} onClick={handleGetValues}>获取值</button>
                    <button class={styles.button} onClick={handleSetValues}>设置值</button>
                </div>
                <div class={styles.output}>
                    {output.value || '// 输出将显示在这里'}
                </div>
            </div>
        );
    }
});
