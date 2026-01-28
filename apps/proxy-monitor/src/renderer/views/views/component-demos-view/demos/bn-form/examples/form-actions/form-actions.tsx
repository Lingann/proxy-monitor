import { computed, defineComponent, reactive, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnForm } from '../../../../../../components/bn-form'
import { BnFormItem } from '../../../../../../components/bn-form'
import { BnInput } from '../../../../../../components/bn-input'
import { BnSelect } from '../../../../../../components/bn-select'

import styles from './styles/form-actions.module.scss'

/* 表单方法暴露类型 */
type BnFormExpose = {
  validate: () => Promise<boolean>
  resetFields: () => void
}

/* 表单操作示例组件 */
export const FormActions = defineComponent({
  name: 'FormActions',

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

    /* 输出内容 */
    const outputRef = ref('')

    /* 表单实例 */
    const formRef = ref<BnFormExpose | null>(null)

    /* 表单校验规则 */
    const rulesRef = computed(() => ({
      username: [
        { required: true, message: t('component_demos.bn_form.actions.rules.username_required'), trigger: 'blur' }
      ],
      email: [
        { required: true, message: t('component_demos.bn_form.actions.rules.email_required'), trigger: 'blur' }
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
          /* 校验结果文本 */
          const resultText = valid
            ? t('component_demos.bn_form.actions.validate_success')
            : t('component_demos.bn_form.actions.validate_failure')

          outputRef.value = t('component_demos.bn_form.actions.validate_result', { result: resultText })
        })
        .catch((error) => {
          outputRef.value = t('component_demos.bn_form.actions.validate_error', { error: String(error) })
        })
    }

    /* 重置表单 */
    const handleReset = () => {
      if (!formRef.value) return

      formRef.value.resetFields()

      outputRef.value = t('component_demos.bn_form.actions.reset_done')
    }

    /* 获取表单值 */
    const handleGetValues = () => {
      outputRef.value = JSON.stringify(formDataRef, null, 2)
    }

    /* 设置表单值 */
    const handleSetValues = () => {
      formDataRef.username = 'admin'
      formDataRef.email = 'admin@example.com'
      formDataRef.role = 'admin'

      outputRef.value = t('component_demos.bn_form.actions.set_defaults')
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
          <BnFormItem label={t('component_demos.bn_form.labels.role')}>
            <BnSelect
              modelValue={formDataRef.role}
              onUpdate:modelValue={handleRoleUpdate}
              placeholder={t('component_demos.bn_form.placeholders.role')}
              options={roleOptionsRef.value}
            />
          </BnFormItem>
        </BnForm>
        <div class={styles.actions}>
          <button class={[styles.button, styles.primary]} onClick={handleValidate}>
            {t('component_demos.bn_form.actions.button_validate')}
          </button>
          <button class={styles.button} onClick={handleReset}>
            {t('component_demos.bn_form.actions.button_reset')}
          </button>
          <button class={styles.button} onClick={handleGetValues}>
            {t('component_demos.bn_form.actions.button_get_values')}
          </button>
          <button class={styles.button} onClick={handleSetValues}>
            {t('component_demos.bn_form.actions.button_set_values')}
          </button>
        </div>
        <div class={styles.output}>
          {outputRef.value || t('component_demos.bn_form.actions.output_placeholder')}
        </div>
      </div>
    )
  }
})
