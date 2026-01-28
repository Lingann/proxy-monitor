import { defineComponent, type PropType } from 'vue';
import styles from './demo-sidebar.module.scss';

export interface MenuItem {
    id: string;
    label: string;
    type: 'group' | 'item';
    children?: MenuItem[];
}

export interface DemoSidebarProps {
    menuData: MenuItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default defineComponent({
    name: 'DemoSidebar',
    props: {
        menuData: {
            type: Array as PropType<MenuItem[]>,
            required: true
        },
        activeId: {
            type: String,
            required: true
        },
        onSelect: {
            type: Function as PropType<(id: string) => void>,
            required: true
        }
    },
    setup(props) {
        const renderMenuItems = (items: MenuItem[]) => {
            return items.map(item => {
                if (item.type === 'group') {
                    return (
                        <div key={item.id} class={styles.group}>
                            <div class={styles.groupLabel}>{item.label}</div>
                            {item.children && (
                                <div class={styles.groupItems}>
                                    {renderMenuItems(item.children)}
                                </div>
                            )}
                        </div>
                    );
                } else {
                    const isActive = props.activeId === item.id;
                    return (
                        <div 
                            key={item.id} 
                            class={[styles.menuItem, isActive && styles.active]}
                            onClick={() => props.onSelect(item.id)}
                        >
                            {item.label}
                        </div>
                    );
                }
            });
        };

        return () => (
            <div class={styles.sidebar}>
                <div class={styles.header}>Component Library</div>
                <div class={styles.menu}>
                    {renderMenuItems(props.menuData)}
                </div>
            </div>
        );
    }
});
