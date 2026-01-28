import { defineComponent, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnInput } from '../../../../../../components/bn-input'

import styles from './styles/basic-input.module.scss'

/* 基础输入框示例组件 */
export const BasicInput = defineComponent({
  name: 'BasicInput',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    /* 输入值 */
    const valueRef = ref('')

    /* 更新输入值 */
    const handleUpdate = (value: string | number | null) => valueRef.value = String(value || '')

    return () => (
      <div class={styles.container}>
        <BnInput
          modelValue={valueRef.value}
          onUpdate:modelValue={handleUpdate}
          placeholder={t('component_demos.bn_input.basic_placeholder')}
          block
        />
      </div>
    )
  }
})
