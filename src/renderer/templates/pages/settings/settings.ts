import { t } from '../../../utils/index.js';

export function initSettings() {
    const saveSettingsBtn = document.getElementById('saveSettingsBtn') as HTMLButtonElement;
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    const settingsStatus = document.getElementById('settingsStatus') as HTMLDivElement;

    async function loadSettings() {
        if (!(window as any).electronAPI) return;
        const settings = await (window as any).electronAPI.getSettings();
        if (languageSelect) languageSelect.value = settings.locale;
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', async () => {
            const settings = {
                locale: languageSelect.value
            };
            const success = await (window as any).electronAPI.saveSettings(settings);
            if (success) {
                if (settingsStatus) {
                    settingsStatus.textContent = t('settings.saved');
                    settingsStatus.className = 'status success';
                    settingsStatus.style.display = 'block';
                }
            }
        });
    }

    loadSettings();
}
