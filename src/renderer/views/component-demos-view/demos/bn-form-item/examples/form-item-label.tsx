import { defineComponent, reactive } from 'vue';
import { BnFormItem } from '../../../../../components/bn-form';
import { BnInput } from '../../../../../components/bn-input';
import styles from './form-item-label.module.scss';

export default defineComponent({
    name: 'FormItemLabel',
    setup() {
        const formData = reactive({
            email: ''
        });

        return () => (
            <div class={styles.container}>
                <BnFormItem label="邮箱地址">
                    <BnInput
                        modelValue={formData.email}
                        onUpdate:modelValue={(v: string | number | null) => formData.email = String(v || '')}
                        placeholder="请输入邮箱地址"
                        block
                    />
                </BnFormItem>
            </div>
        );
    }
});
