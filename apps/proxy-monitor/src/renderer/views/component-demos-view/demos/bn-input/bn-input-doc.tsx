import { defineComponent } from 'vue';
import styles from './bn-input-doc.module.scss';
import DemoContainer from '../../components/demo-container';
import { BnInput } from '@balnc-nova-ui/core';
import { BasicInput } from './examples/basic-input';
import { InputPlaceholder } from './examples/input-placeholder';
import { InputDisabled } from './examples/input-disabled';

export default defineComponent({
    name: 'BnInputDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnInput 输入框组件</h1>
                <p class={styles.description}>
                    BnInput 是一个基础的输入框组件，支持文本输入、占位符、禁用状态等功能。
                </p>

                <DemoContainer 
                    title="基础输入框"
                    description="最基础的输入框使用示例。"
                    code={`<BnInput v-model={value} placeholder="请输入内容" />`}
                >
                    <BasicInput />
                </DemoContainer>

                <DemoContainer 
                    title="占位符"
                    description="通过 placeholder 属性设置占位符文本。"
                    code={`<BnInput v-model={value} placeholder="请输入用户名" />`}
                >
                    <InputPlaceholder />
                </DemoContainer>

                <DemoContainer 
                    title="禁用状态"
                    description="通过 disabled 属性设置禁用状态。"
                    code={`<BnInput v-model={value} disabled />`}
                >
                    <InputDisabled />
                </DemoContainer>
            </div>
        );
    }
});

