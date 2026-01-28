import { defineComponent } from 'vue';
import styles from './bn-select-item-doc.module.scss';
import { DemoContainer } from '../../components/demo-container';
import { BnSelectItem } from '../../../../components/bn-select-item';
import { BasicItem } from './examples/basic-item';
import { ItemClick } from './examples/item-click';
import { ItemHover } from './examples/item-hover';

export default defineComponent({
    name: 'BnSelectItemDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnSelectItem 选择项组件</h1>
                <p class={styles.description}>
                    BnSelectItem 是一个选择项组件，用于选择下拉项，支持点击、悬停等触发方式。
                </p>

                <DemoContainer 
                    title="基础选择项"
                    description="最基础的选择项使用示例。"
                    code={`<BnSelectItem>
  <template #trigger>
    <button>点击选择</button>
  </template>
  <div>选择内容</div>
</BnSelectItem>`}
                >
                    <BasicItem />
                </DemoContainer>

                <DemoContainer 
                    title="点击选择"
                    description={"通过 trigger=\"click\" 设置点击选择。"}
                    code={`<BnSelectItem trigger="click">
  <template #trigger>
    <button>点击选择</button>
  </template>
  <div>选择内容</div>
</BnSelectItem>`}
                >
                    <ItemClick />
                </DemoContainer>

                <DemoContainer 
                    title="悬停选择"
                    description={"通过 trigger=\"hover\" 设置悬停选择。"}
                    code={`<BnSelectItem trigger="hover">
  <template #trigger>
    <button>悬停选择</button>
  </template>
  <div>选择内容</div>
</BnSelectItem>`}
                >
                    <ItemHover />
                </DemoContainer>
            </div>
        );
    }
});
