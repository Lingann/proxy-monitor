import { defineComponent } from 'vue'

import { useI18n } from 'vue-i18n'

import { BnSelectItem } from '../../../../../../components/bn-select-item'

import styles from './styles/item-hover.module.scss'

export const ItemHover = defineComponent({
  name: 'ItemHover',

  setup() {
    const { t } = useI18n()

    return () => (
      <div class={styles.container}>
        <BnSelectItem trigger="hover">
          {{
            default: () => (
              <button class={styles.button}>
                {t('component_demos.bn_select_item.hover.trigger_label')}
              </button>
            ),

            trigger: () => (
              <div class={styles.content}>
                {t('component_demos.bn_select_item.hover.content')}
              </div>
            )
          }}
        </BnSelectItem>
      </div>
    )
  }
})
