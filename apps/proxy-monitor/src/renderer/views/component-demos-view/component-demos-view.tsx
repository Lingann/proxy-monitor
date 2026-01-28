import { defineComponent, ref } from 'vue';
import styles from './component-demos-view.module.scss';
import DemoSidebar from './components/demo-sidebar';
import DemoDocPage from './components/demo-doc-page';

interface MenuItem {
    id: string;
    label: string;
    type: 'group' | 'item';
    children?: MenuItem[];
}

const menuData: MenuItem[] = [
    {
        id: 'form',
        label: 'Form Components',
        type: 'group',
        children: [
            { id: 'bn-form', label: 'BnForm', type: 'item' },
            { id: 'bn-form-item', label: 'BnFormItem', type: 'item' },
            { id: 'bn-input', label: 'BnInput', type: 'item' },
            { id: 'bn-select', label: 'BnSelect', type: 'item' }
        ]
    },
    {
        id: 'select',
        label: 'Select Components',
        type: 'group',
        children: [
            { id: 'bn-select', label: 'BnSelect', type: 'item' },
            { id: 'bn-select-item', label: 'BnSelectItem', type: 'item' }
        ]
    }
];

export default defineComponent({
    name: 'ComponentDemosView',
    setup() {
        const activeComponent = ref('bn-form');

        const handleMenuSelect = (id: string) => {
            activeComponent.value = id;
        };

        return () => (
            <div class={styles.container}>
                <div class={styles.sidebar}>
                    <DemoSidebar 
                        menuData={menuData}
                        activeId={activeComponent.value}
                        onSelect={handleMenuSelect}
                    />
                </div>
                <div class={styles.content}>
                    <DemoDocPage componentId={activeComponent.value} />
                </div>
            </div>
        );
    }
});
