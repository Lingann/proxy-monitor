import { defineComponent } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnSelectItem } from '../../../../../../components/bn-select-item'

import styles from './styles/basic-item.module.scss'

/* 基础选择项示例组件 */
export const BasicItem = defineComponent({
  name: 'BasicItem',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    return () => (
      <div class={styles.container}>
        <BnSelectItem>
          {{
            trigger: () => (
              <button class={styles.button}>
                {t('component_demos.bn_select_item.basic.trigger_label')}
              </button>
            ),

            default: () => (
              <div class={styles.content}>
                {t('component_demos.bn_select_item.basic.content')}
              </div>
            )
          }}
        </BnSelectItem>
      </div>
    )
  }
})
