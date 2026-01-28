import { defineComponent, reactive } from 'vue';
import { BnFormItem } from '../../../../../components/bn-form';
import { BnInput } from '../../../../../components/bn-input';
import styles from './form-item-required.module.scss';

export default defineComponent({
    name: 'FormItemRequired',
    setup() {
        const formData = reactive({
            username: ''
        });

        return () => (
            <div class={styles.container}>
                <BnFormItem label="用户名" required>
                    <BnInput
                        modelValue={formData.username}
                        onUpdate:modelValue={(v: string | number | null) => formData.username = String(v || '')}
                        placeholder="请输入用户名"
                        block
                    />
                </BnFormItem>
            </div>
        );
    }
});
