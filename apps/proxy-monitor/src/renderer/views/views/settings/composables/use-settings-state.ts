import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export function useSettingsState() {
    const { locale, t } = useI18n();

    const currentLocale = ref('zh');

    const currentTheme = ref<'light' | 'dark'>('light');

    const loading = ref(false);

    const saving = ref(false);

    const message = ref<{ text: string, type: 'success' | 'error' } | null>(null);

    /* 应用主题到 DOM */
    const applyTheme = (theme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    /* 监听主题变化并应用 */
    watch(currentTheme, (newTheme) => {
        applyTheme(newTheme);
    });

    const loadSettings = async () => {
        try {
            loading.value = true;

            const config = await (window as any).electronAPI.getSettings();

            if (config) {
                if (config.locale) {
                    currentLocale.value = config.locale;
                    locale.value = config.locale;
                }

                if (config.theme) {
                    currentTheme.value = config.theme;
                    applyTheme(config.theme);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    const saveSettings = async () => {
        try {
            saving.value = true;

            await (window as any).electronAPI.saveSettings({
                locale: currentLocale.value,
                theme: currentTheme.value
            });

            locale.value = currentLocale.value;

            message.value = { text: t('messages.save_success'), type: 'success' };

            setTimeout(() => message.value = null, 3000);
        } catch (e: any) {
            message.value = { text: e.message || t('messages.save_error'), type: 'error' };
        } finally {
            saving.value = false;
        }
    };

    onMounted(() => {
        loadSettings();
    });

    return {
        currentLocale,
        currentTheme,
        loading,
        saving,
        message,
        saveSettings
    };
}
