import { defineComponent } from 'vue';
import styles from './bn-button-trigger-doc.module.scss';
import { DemoContainer } from '../../components/demo-container';
import { BnButtonTrigger } from '../../../../components/bn-button-trigger';
import BasicTrigger from './examples/basic-trigger';
import TriggerClick from './examples/trigger-click';
import TriggerHover from './examples/trigger-hover';

export default defineComponent({
    name: 'BnButtonTriggerDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnButtonTrigger 触发器组件</h1>
                <p class={styles.description}>
                    BnButtonTrigger 是一个触发器组件，用于触发弹出层，支持点击、悬停等触发方式。
                </p>

                <DemoContainer 
                    title="基础触发器"
                    description="最基础的触发器使用示例。"
                    code={`<BnButtonTrigger>
  <template #trigger>
    <button>点击触发</button>
  </template>
  <div>弹出内容</div>
</BnButtonTrigger>`}
                >
                    <BasicTrigger />
                </DemoContainer>

                <DemoContainer 
                    title="点击触发"
                    description="通过 trigger="click" 设置点击触发。"
                    code={`<BnButtonTrigger trigger="click">
  <template #trigger>
    <button>点击触发</button>
  </template>
  <div>弹出内容</div>
</BnButtonTrigger>`}
                >
                    <TriggerClick />
                </DemoContainer>

                <DemoContainer 
                    title="悬停触发"
                    description="通过 trigger="hover" 设置悬停触发。"
                    code={`<BnButtonTrigger trigger="hover">
  <template #trigger>
    <button>悬停触发</button>
  </template>
  <div>弹出内容</div>
</BnButtonTrigger>`}
                >
                    <TriggerHover />
                </DemoContainer>
            </div>
        );
    }
});

