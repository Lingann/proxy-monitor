import { defineComponent } from 'vue';
import styles from './bn-form-item-doc.module.scss';
import DemoContainer from '../../components/demo-container';
import { BnForm } from '@balnc-nova-ui/core';
import { BnFormItem } from '@balnc-nova-ui/core';
import { BnInput } from '@balnc-nova-ui/core';
import { BasicFormItem } from './examples/basic-form-item';
import { FormItemLabel } from './examples/form-item-label';
import { FormItemRequired } from './examples/form-item-required';

export default defineComponent({
    name: 'BnFormItemDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnFormItem 表单项组件</h1>
                <p class={styles.description}>
                    BnFormItem 是表单中的表单项组件，用于包装表单控件，提供标签、验证规则等功能。
                </p>

                <DemoContainer 
                    title="基础表单项"
                    description="最基础的表单项使用示例。"
                    code={`<BnFormItem label="用户名">
  <BnInput v-model={formData.username} />
</BnFormItem>`}
                >
                    <BasicFormItem />
                </DemoContainer>

                <DemoContainer 
                    title="自定义标签"
                    description="通过 label 属性设置表单项标签。"
                    code={`<BnFormItem label="邮箱地址">
  <BnInput v-model={formData.email} />
</BnFormItem>`}
                >
                    <FormItemLabel />
                </DemoContainer>

                <DemoContainer 
                    title="必填项"
                    description="通过 required 属性标记必填项。"
                    code={`<BnFormItem label="用户名" required>
  <BnInput v-model={formData.username} />
</BnFormItem>`}
                >
                    <FormItemRequired />
                </DemoContainer>
            </div>
        );
    }
});

