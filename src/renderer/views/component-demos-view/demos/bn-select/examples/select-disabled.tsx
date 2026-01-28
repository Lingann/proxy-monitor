import { defineComponent, ref } from 'vue';
import { BnSelect } from '../../../../../components/bn-select';
import styles from './select-disabled.module.scss';

export default defineComponent({
    name: 'SelectDisabled',
    setup() {
        const value = ref('user');

        const options = [
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' }
        ];

        return () => (
            <div class={styles.container}>
                <BnSelect
                    modelValue={value.value}
                    onUpdate:modelValue={(v: string | number | null) => value.value = String(v || '')}
                    placeholder="请选择角色"
                    options={options}
                    disabled
                />
            </div>
        );
    }
});
