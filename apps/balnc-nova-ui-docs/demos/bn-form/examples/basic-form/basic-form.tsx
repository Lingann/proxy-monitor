import { computed, defineComponent, reactive } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnForm } from '../../../../../../components/bn-form'
import { BnFormItem } from '../../../../../../components/bn-form'
import { BnInput } from '../../../../../../components/bn-input'
import { BnSelect } from '../../../../../../components/bn-select'

import styles from './styles/basic-form.module.scss'

/* 基础表单示例组件 */
export const BasicForm = defineComponent({
  name: 'BasicForm',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    /* 表单数据 */
    const formDataRef = reactive({
      username: '',
      email: '',
      role: ''
    })

    /* 角色选项 */
    const roleOptionsRef = computed(() => [
      { label: t('component_demos.bn_form.roles.admin'), value: 'admin' },
      { label: t('component_demos.bn_form.roles.user'), value: 'user' },
      { label: t('component_demos.bn_form.roles.guest'), value: 'guest' }
    ])

    /* 更新用户名 */
    const handleUsernameUpdate = (value: string | number | null) => formDataRef.username = String(value || '')

    /* 更新邮箱 */
    const handleEmailUpdate = (value: string | number | null) => formDataRef.email = String(value || '')

    /* 更新角色 */
    const handleRoleUpdate = (value: string | number | null) => formDataRef.role = String(value || '')

    return () => (
      <div class={styles.container}>
        <BnForm model={formDataRef}>
          <BnFormItem label={t('component_demos.bn_form.labels.username')}>
            <BnInput
              modelValue={formDataRef.username}
              onUpdate:modelValue={handleUsernameUpdate}
              placeholder={t('component_demos.bn_form.placeholders.username')}
              block
            />
          </BnFormItem>
          <BnFormItem label={t('component_demos.bn_form.labels.email')}>
            <BnInput
              modelValue={formDataRef.email}
              onUpdate:modelValue={handleEmailUpdate}
              placeholder={t('component_demos.bn_form.placeholders.email')}
              block
            />
          </BnFormItem>
          <BnFormItem label={t('component_demos.bn_form.labels.role')}>
            <BnSelect
              modelValue={formDataRef.role}
              onUpdate:modelValue={handleRoleUpdate}
              placeholder={t('component_demos.bn_form.placeholders.role')}
              options={roleOptionsRef.value}
            />
          </BnFormItem>
        </BnForm>
      </div>
    )
  }
})
