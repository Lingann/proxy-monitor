import { defineComponent } from 'vue';
import { BnButtonTrigger } from '../../../../../components/bn-button-trigger';
import styles from './basic-trigger.module.scss';

export default defineComponent({
    name: 'BasicTrigger',
    setup() {
        return () => (
            <div class={styles.container}>
                <BnButtonTrigger>
                    {{
                        trigger: () => (
                            <button class={styles.button}>点击触发</button>
                        ),
                        default: () => (
                            <div class={styles.content}>弹出内容</div>
                        )
                    }}
                </BnButtonTrigger>
            </div>
        );
    }
});
