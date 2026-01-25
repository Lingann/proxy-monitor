import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import styles from './system-proxy.module.scss';
import { useExtendedProxyState } from './composables/use-extended-proxy-state';
import CommonInput from '../../components/common-input/common-input';
import BypassRulesTable from './components/bypass-rules-table';

export default defineComponent({
  name: 'SystemProxyView',

  setup() {
    const { t } = useI18n();

    const {
      loading,
      saving,
      enabled,
      server,
      bypassRules,
      message,
      saveProxyConfig,
      toggleProxy,
      addRule,
      removeRule,
      updateRule
    } = useExtendedProxyState();

    return () => (
      <div class={styles.container}>
        <div class={styles.card}>
          <h2 class={styles.title}>{t('modules.system_proxy')}</h2>

          {message.value && (
            <div class={[styles.message, styles[message.value.type]]}>
              {message.value.text}
            </div>
          )}

          {loading.value ? (
            <div class={styles.loading}>{t('common.loading')}</div>
          ) : (
            <>
              <div class={styles.statusSection}>
                <div class={styles.statusRow}>
                  <span class={styles.statusLabel}>{t('proxy.status')}</span>

                  <div class={styles.statusValue}>
                    <span class={[styles.badge, enabled.value ? styles.enabled : styles.disabled]}>
                      {enabled.value ? t('proxy.enabled_status') : t('proxy.disabled_status')}
                    </span>

                    <button
                      class={[styles.btn, styles.toggle]}
                      onClick={toggleProxy}
                      disabled={saving.value}
                    >
                      {enabled.value ? t('proxy.disable') : t('proxy.enable')}
                    </button>
                  </div>
                </div>
              </div>

              <div class={styles.formGroup}>
                <label>{t('proxy.server')}</label>

                <CommonInput
                  modelValue={server.value}
                  onUpdateModelValue={(val: string) => (server.value = val)}
                  config={{
                    placeholder: t('proxy.server_placeholder'),
                    disabled: saving.value
                  }}
                />

                <div class={styles.hint}>{t('proxy.server_hint')}</div>
              </div>

              <div class={styles.formGroup}>
                <label>{t('proxy.bypass_rules')}</label>
                <BypassRulesTable
                  rules={bypassRules.value}
                  onAdd={addRule}
                  onRemove={removeRule}
                  onUpdate={updateRule}
                />
              </div>

              <div class={styles.actions}>
                <button
                  class={[styles.btn, styles.primary]}
                  onClick={saveProxyConfig}
                  disabled={saving.value}
                >
                  {saving.value ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
});
