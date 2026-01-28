import { defineComponent, reactive } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnFormItem } from '../../../../../../components/bn-form'
import { BnInput } from '../../../../../../components/bn-input'

import styles from './styles/form-item-label.module.scss'

/* 表单项标签示例组件 */
export const FormItemLabel = defineComponent({
  name: 'FormItemLabel',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    /* 表单数据 */
    const formDataRef = reactive({
      email: ''
    })

    /* 更新邮箱地址 */
    const handleEmailUpdate = (value: string | number | null) => formDataRef.email = String(value || '')

    return () => (
      <div class={styles.container}>
        <BnFormItem label={t('component_demos.bn_form_item.labels.email_address')}>
          <BnInput
            modelValue={formDataRef.email}
            onUpdate:modelValue={handleEmailUpdate}
            placeholder={t('component_demos.bn_form_item.placeholders.email_address')}
            block
          />
        </BnFormItem>
      </div>
    )
  }
})
