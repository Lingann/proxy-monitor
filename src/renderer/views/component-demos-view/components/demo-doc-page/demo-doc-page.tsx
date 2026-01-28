import { defineComponent, defineAsyncComponent, h } from 'vue';
import styles from './demo-doc-page.module.scss';

const demoPages: Record<string, any> = {
    'bn-form': defineAsyncComponent(() => import('../demos/bn-form/bn-form-doc')),
    'bn-form-item': defineAsyncComponent(() => import('../demos/bn-form-item/bn-form-item-doc')),
    'bn-input': defineAsyncComponent(() => import('../demos/bn-input/bn-input-doc')),
    'bn-select': defineAsyncComponent(() => import('../demos/bn-select/bn-select-doc')),
    'bn-select-item': defineAsyncComponent(() => import('../demos/bn-select-item/bn-select-item-doc'))
};

export interface DemoDocPageProps {
    componentId: string;
}

export default defineComponent({
    name: 'DemoDocPage',
    props: {
        componentId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        return () => (
            <div class={styles.container}>
                {demoPages[props.componentId] ? h(demoPages[props.componentId]) : (
                    <div class={styles.notFound}>
                        <h3>Component not found</h3>
                        <p>The component "{props.componentId}" does not have any demos yet.</p>
                    </div>
                )}
            </div>
        );
    }
});
