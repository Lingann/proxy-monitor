import { defineComponent } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnSelectItem } from '../../../../../../components/bn-select-item'

import styles from './styles/item-click.module.scss'

export const ItemClick = defineComponent({
  name: 'ItemClick',

  setup() {
    const { t } = useI18n()

    return () => (
      <div class={styles.container}>
        <BnSelectItem trigger="click">
          {{
            default: () => (
              <button class={styles.button}>
                {t('component_demos.bn_select_item.click.trigger_label')}
              </button>
            ),

            trigger: () => (
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
