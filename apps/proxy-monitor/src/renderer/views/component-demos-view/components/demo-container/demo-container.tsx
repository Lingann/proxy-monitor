import { defineComponent, ref, computed } from 'vue';
import styles from './demo-container.module.scss';

export interface DemoContainerProps {
    title: string;
    description?: string;
    code?: string;
}

export default defineComponent({
    name: 'DemoContainer',
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        code: {
            type: String,
            default: ''
        }
    },
    setup(props, { slots }) {
        const showCode = ref(false);

        const toggleCode = () => {
            showCode.value = !showCode.value;
        };

        return () => (
            <div class={styles.container}>
                <div class={styles.header}>
                    <div class={styles.titleSection}>
                        <h4 class={styles.title}>{props.title}</h4>
                        {props.description && <p class={styles.description}>{props.description}</p>}
                    </div>
                    {props.code && (
                        <button class={styles.codeButton} onClick={toggleCode}>
                            {showCode.value ? 'Hide Code' : 'Show Code'}
                        </button>
                    )}
                </div>
                <div class={styles.preview}>
                    {slots.default?.()}
                </div>
                {props.code && showCode.value && (
                    <div class={styles.codeBlock}>
                        <pre><code>{props.code}</code></pre>
                    </div>
                )}
            </div>
        );
    }
});
