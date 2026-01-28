import { defineComponent } from 'vue';
import { BnButtonTrigger } from '../../../../../components/bn-button-trigger';
import styles from './trigger-click.module.scss';

export default defineComponent({
    name: 'TriggerClick',
    setup() {
        return () => (
            <div class={styles.container}>
                <BnButtonTrigger trigger="click">
                    {{
                        trigger: () => (
                            <button class={styles.button}>点击触发</button>
                        ),
                        default: () => (
                            <div class={styles.content}>点击触发的弹出内容</div>
                        )
                    }}
                </BnButtonTrigger>
            </div>
        );
    }
});
