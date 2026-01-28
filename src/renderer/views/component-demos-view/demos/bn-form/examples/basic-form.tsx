import { defineComponent, reactive } from 'vue';
import { BnForm } from '../../../../../components/bn-form';
import { BnFormItem } from '../../../../../components/bn-form';
import { BnInput } from '../../../../../components/bn-input';
import { BnSelect } from '../../../../../components/bn-select';
import styles from './basic-form.module.scss';

export default defineComponent({
    name: 'BasicForm',
    setup() {
        const formData = reactive({
            username: '',
            email: '',
            role: ''
        });

        const options = [
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' }
        ];

        return () => (
            <div class={styles.container}>
                <BnForm model={formData}>
                    <BnFormItem label="用户名">
                        <BnInput
                            modelValue={formData.username}
                            onUpdate:modelValue={(v: string | number | null) => formData.username = String(v || '')}
                            placeholder="请输入用户名"
                            block
                        />
                    </BnFormItem>
                    <BnFormItem label="邮箱">
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
            </div>
        );
    }
});
