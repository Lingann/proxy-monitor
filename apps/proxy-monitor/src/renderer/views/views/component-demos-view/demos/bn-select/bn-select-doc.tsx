import { defineComponent } from 'vue';
import styles from './bn-select-doc.module.scss';
import { DemoContainer } from '../../components/demo-container';
import { BnSelect } from '../../../components/bn-select';
import { BasicSelect } from './examples/basic-select';
import { SelectDisabled } from './examples/select-disabled';
import { SelectClearable } from './examples/select-clearable';

export default defineComponent({
    name: 'BnSelectDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnSelect 选择器组件</h1>
                <p class={styles.description}>
                    BnSelect 是一个选择器组件，支持下拉选择、禁用状态、可清空等功能。
                </p>

                <DemoContainer 
                    title="基础选择器"
                    description="最基础的选择器使用示例。"
                    code={`const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
];

<BnSelect v-model={value} options={options} />`}
                >
                    <BasicSelect />
                </DemoContainer>

                <DemoContainer 
                    title="禁用状态"
                    description="通过 disabled 属性设置禁用状态。"
                    code={`<BnSelect v-model={value} options={options} disabled />`}
                >
                    <SelectDisabled />
                </DemoContainer>

                <DemoContainer 
                    title="可清空"
                    description="通过 clearable 属性设置可清空。"
                    code={`<BnSelect v-model={value} options={options} clearable />`}
                >
                    <SelectClearable />
                </DemoContainer>
            </div>
        );
    }
});

