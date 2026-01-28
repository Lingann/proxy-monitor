import { defineComponent } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnSelectItem } from '../../../../../../components/bn-select-item'

import styles from './styles/item-click.module.scss'

/* 点击选择示例组件 */
export const ItemClick = defineComponent({
  name: 'ItemClick',

  /* 组件逻辑入口 */
  setup() {
    /* 国际化文本工具 */
    const { t } = useI18n()

    return () => (
      <div class={styles.container}>
        <BnSelectItem trigger="click">
          {{
            trigger: () => (
              <button class={styles.button}>
                {t('component_demos.bn_select_item.click.trigger_label')}
              </button>
            ),

            default: () => (
              <div class={styles.content}>
                {t('component_demos.bn_select_item.click.content')}
              </div>
            )
          }}
        </BnSelectItem>
      </div>
    )
  }
})
