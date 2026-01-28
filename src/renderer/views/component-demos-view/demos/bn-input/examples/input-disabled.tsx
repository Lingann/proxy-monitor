import { defineComponent, ref } from 'vue';
import { BnInput } from '../../../../../components/bn-input';
import styles from './input-disabled.module.scss';

export default defineComponent({
    name: 'InputDisabled',
    setup() {
        const value = ref('禁用的输入框');

        return () => (
            <div class={styles.container}>
                <BnInput
                    modelValue={value.value}
                    onUpdate:modelValue={(v: string | number | null) => value.value = String(v || '')}
                    disabled
                    block
                />
            </div>
        );
    }
});
