import { defineComponent, reactive } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnFormItem } from '../../../../../../components/bn-form'
import { BnInput } from '../../../../../../components/bn-input'

import styles from './styles/basic-form-item.module.scss'

/* 基础表单项示例组件 */
export const BasicFormItem = defineComponent({
  name: 'BasicFormItem',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    /* 表单数据 */
    const formDataRef = reactive({
      username: ''
    })

    /* 更新用户名 */
    const handleUsernameUpdate = (value: string | number | null) => formDataRef.username = String(value || '')

    return () => (
      <div class={styles.container}>
        <BnFormItem label={t('component_demos.bn_form_item.labels.username')}>
          <BnInput
            modelValue={formDataRef.username}
            onUpdate:modelValue={handleUsernameUpdate}
            placeholder={t('component_demos.bn_form_item.placeholders.username')}
            block
          />
        </BnFormItem>
      </div>
    )
  }
})
