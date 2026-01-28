import { computed, defineComponent, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnSelect } from '../../../../../../components/bn-select'

import styles from './styles/basic-select.module.scss'

/* 基础选择器示例组件 */
export const BasicSelect = defineComponent({
  name: 'BasicSelect',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    /* 当前选中值 */
    const valueRef = ref('')

    /* 角色选项 */
    const roleOptionsRef = computed(() => [
      { label: t('component_demos.bn_select.roles.admin'), value: 'admin' },
      { label: t('component_demos.bn_select.roles.user'), value: 'user' },
      { label: t('component_demos.bn_select.roles.guest'), value: 'guest' }
    ])

    /* 更新选中值 */
    const handleUpdate = (value: string | number | null) => valueRef.value = String(value || '')

    return () => (
      <div class={styles.container}>
        <BnSelect
          modelValue={valueRef.value}
          onUpdate:modelValue={handleUpdate}
          placeholder={t('component_demos.bn_select.role_placeholder')}
          options={roleOptionsRef.value}
        />
      </div>
    )
  }
})
