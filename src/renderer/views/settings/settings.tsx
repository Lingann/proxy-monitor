import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import styles from './settings.module.scss';
import { useSettingsState } from './composables/use-settings-state';
import CommonSelect from '../../components/common-select/common-select';

export default defineComponent({
    name: 'SettingsView',
    setup() {
        const { t } = useI18n();

        const { currentLocale, currentTheme, saving, message, saveSettings } = useSettingsState();

        const languageOptions = [
            { label: 'English', value: 'en' },
            { label: '中文', value: 'zh' }
        ];

        const themeOptions = [
            { label: t('settings.theme_light'), value: 'light' },
            { label: t('settings.theme_dark'), value: 'dark' }
        ];

        return () => (
            <div class={styles.container}>
                <div class={styles.card}>
                    <h2 class={styles.title}>{t('modules.settings')}</h2>
                    
                    {message.value && (
                        <div class={[styles.message, styles[message.value.type]]}>
                            {message.value.text}
                        </div>
                    )}

                    <div class={styles.formGroup}>
                        <label>{t('settings.language')}</label>
                        <div style={{ width: '200px' }}>
                            <CommonSelect
                                modelValue={currentLocale.value}
                                onUpdateModelValue={(val: string | number | null) => currentLocale.value = String(val)}
                                config={{
                                    options: languageOptions,
                                    placeholder: t('settings.select_language') || 'Select Language'
                                }}
                            />
                        </div>
                    </div>

                    <div class={styles.formGroup}>
                        <label>{t('settings.theme')}</label>
                        <div style={{ width: '200px' }}>
                            <CommonSelect
                                modelValue={currentTheme.value}
                                onUpdateModelValue={(val: string | number | null) => currentTheme.value = val as 'light' | 'dark'}
                                config={{
                                    options: themeOptions,
                                    placeholder: t('settings.select_theme') || 'Select Theme'
                                }}
                            />
                        </div>
                    </div>

                    <div class={styles.actions}>
                        <button 
                            class={[styles.btn, styles.primary]} 
                            onClick={saveSettings}
                            disabled={saving.value}
                        >
                            {saving.value ? t('common.saving') : t('common.save')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
