import { computed, defineComponent, reactive, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnForm } from '../../../../../../components/bn-form'
import { BnFormItem } from '../../../../../../components/bn-form'
import { BnInput } from '../../../../../../components/bn-input'
import { BnSelect } from '../../../../../../components/bn-select'

import styles from './styles/form-validation.module.scss'

/* 表单方法暴露类型 */
type BnFormExpose = {
  validate: () => Promise<boolean>
}

/* 表单校验示例组件 */
export const FormValidation = defineComponent({
  name: 'FormValidation',

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

    /* 表单实例 */
    const formRef = ref<BnFormExpose | null>(null)

    /* 表单校验规则 */
    const rulesRef = computed(() => ({
      username: [
        { required: true, message: t('component_demos.bn_form.validation.rules.username_required'), trigger: 'blur' },
        { min: 3, message: t('component_demos.bn_form.validation.rules.username_min'), trigger: 'blur' }
      ],
      email: [
        { required: true, message: t('component_demos.bn_form.validation.rules.email_required'), trigger: 'blur' },
        { type: 'email', message: t('component_demos.bn_form.validation.rules.email_invalid'), trigger: 'blur' }
      ],
      role: [
        { required: true, message: t('component_demos.bn_form.validation.rules.role_required'), trigger: 'change' }
      ]
    }))

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

    /* 触发表单校验 */
    const handleValidate = () => {
      if (!formRef.value) return

      formRef.value
        .validate()
        .then((valid) => {
          console.log(t('component_demos.bn_form.validation.result_log'), valid)
        })
        .catch((error) => {
          console.error(t('component_demos.bn_form.validation.error_log'), error)
        })
    }

    return () => (
      <div class={styles.container}>
        <BnForm ref={formRef} model={formDataRef} rules={rulesRef.value}>
          <BnFormItem prop="username" label={t('component_demos.bn_form.labels.username')}>
            <BnInput
              modelValue={formDataRef.username}
              onUpdate:modelValue={handleUsernameUpdate}
              placeholder={t('component_demos.bn_form.placeholders.username')}
              block
            />
          </BnFormItem>
          <BnFormItem prop="email" label={t('component_demos.bn_form.labels.email')}>
            <BnInput
              modelValue={formDataRef.email}
              onUpdate:modelValue={handleEmailUpdate}
              placeholder={t('component_demos.bn_form.placeholders.email')}
              block
            />
          </BnFormItem>
          <BnFormItem prop="role" label={t('component_demos.bn_form.labels.role')}>
            <BnSelect
              modelValue={formDataRef.role}
              onUpdate:modelValue={handleRoleUpdate}
              placeholder={t('component_demos.bn_form.placeholders.role')}
              options={roleOptionsRef.value}
            />
          </BnFormItem>
        </BnForm>
        <button class={styles.button} onClick={handleValidate}>
          {t('component_demos.bn_form.validation.button_validate')}
        </button>
      </div>
    )
  }
})
