import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export function useSettingsState() {
    const { locale, t } = useI18n();
    const currentLocale = ref('zh');
    const loading = ref(false);
    const saving = ref(false);
    const message = ref<{ text: string, type: 'success' | 'error' } | null>(null);

    const loadSettings = async () => {
        try {
            loading.value = true;
            const config = await (window as any).electronAPI.getSettings();
            if (config && config.locale) {
                currentLocale.value = config.locale;
                locale.value = config.locale;
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
            await (window as any).electronAPI.saveSettings({ locale: currentLocale.value });
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
        loading,
        saving,
        message,
        saveSettings
    };
}
