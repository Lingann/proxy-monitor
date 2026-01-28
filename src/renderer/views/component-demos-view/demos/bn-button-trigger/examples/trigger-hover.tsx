import { defineComponent } from 'vue';
import { BnButtonTrigger } from '../../../../../components/bn-button-trigger';
import styles from './trigger-hover.module.scss';

export default defineComponent({
    name: 'TriggerHover',
    setup() {
        return () => (
            <div class={styles.container}>
                <BnButtonTrigger trigger="hover">
                    {{
                        trigger: () => (
                            <button class={styles.button}>悬停触发</button>
                        ),
                        default: () => (
                            <div class={styles.content}>悬停触发的弹出内容</div>
                        )
                    }}
                </BnButtonTrigger>
            </div>
        );
    }
});
