import { defineComponent, reactive, ref } from 'vue';
import { BnForm } from '../../../../../components/bn-form';
import { BnFormItem } from '../../../../../components/bn-form';
import { BnInput } from '../../../../../components/bn-input';
import { BnSelect } from '../../../../../components/bn-select';
import styles from './form-validation.module.scss';

export default defineComponent({
    name: 'FormValidation',
    setup() {
        const formData = reactive({
            username: '',
            email: '',
            role: ''
        });

        const formRef = ref<any>(null);

        const rules = {
            username: [
                { required: true, message: '用户名必填', trigger: 'blur' },
                { min: 3, message: '至少3个字符', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '邮箱必填', trigger: 'blur' },
                { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
            ],
            role: [
                { required: true, message: '角色必选', trigger: 'change' }
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
                console.log('验证结果:', valid);
            } catch (e) {
                console.error('验证失败:', e);
            }
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
                    <BnFormItem prop="role" label="角色">
                        <BnSelect
                            modelValue={formData.role}
                            onUpdate:modelValue={(v: string | number | null) => formData.role = String(v || '')}
                            placeholder="请选择角色"
                            options={options}
                        />
                    </BnFormItem>
                </BnForm>
                <button class={styles.button} onClick={handleValidate}>验证表单</button>
            </div>
        );
    }
});
