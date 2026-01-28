import { defineComponent } from 'vue';
import styles from './bn-form-doc.module.scss';
import { DemoContainer } from '../../components/demo-container';
import { BnForm } from '../../../components/bn-form';
import { BnFormItem } from '../../../components/bn-form';
import { BnInput } from '../../../components/bn-input';
import { BnSelect } from '../../../components/bn-select';
import { BasicForm } from './examples/basic-form';
import { FormValidation } from './examples/form-validation';
import { FormActions } from './examples/form-actions';

export default defineComponent({
    name: 'BnFormDoc',
    setup() {
        return () => (
            <div class={styles.container}>
                <h1 class={styles.title}>BnForm 表单组件</h1>
                <p class={styles.description}>
                    BnForm 是一个功能强大的表单容器组件，提供数据验证、表单重置、数据获取等功能。
                </p>

                <DemoContainer 
                    title="基础表单"
                    description="最基础的表单使用示例，包含输入框和选择器。"
                    code={`<BnForm model={formData}>
  <BnFormItem label="用户名">
    <BnInput v-model={formData.username} />
  </BnFormItem>
  <BnFormItem label="角色">
    <BnSelect v-model={formData.role} options={options} />
  </BnFormItem>
</BnForm>`}
                >
                    <BasicForm />
                </DemoContainer>

                <DemoContainer 
                    title="表单验证"
                    description="通过 rules 属性配置表单验证规则。"
                    code={`const rules = {
  username: [
    { required: true, message: '用户名必填', trigger: 'blur' },
    { min: 3, message: '至少3个字符', trigger: 'blur' }
  ]
};

<BnForm model={formData} rules={rules}>
  <BnFormItem prop="username" label="用户名">
    <BnInput v-model={formData.username} />
  </BnFormItem>
</BnForm>`}
                >
                    <FormValidation />
                </DemoContainer>

                <DemoContainer 
                    title="表单操作"
                    description="支持验证、重置、获取和设置表单数据。"
                    code={`const formRef = ref();

const handleValidate = async () => {
  const valid = await formRef.value.validate();
};

const handleReset = () => {
  formRef.value.resetFields();
};

const handleGetValues = () => {
  const values = formData;
};

const handleSetValues = () => {
  formData.username = 'admin';
};`}
                >
                    <FormActions />
                </DemoContainer>
            </div>
        );
    }
});

