import { createApp } from 'vue';
import App from './App';
import router from './router';
import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import './app-styles.css';

(async () => {
  let config = { locale: 'zh' };
  try {
      config = await window.electronAPI.getSettings();
  } catch (e) {
      console.error('Failed to get settings', e);
  }

  const i18n = createI18n({
    legacy: false,
    locale: config.locale || 'zh',
    fallbackLocale: 'en',
    messages: {
      en,
      zh
    }
  });

  const app = createApp(App);
  app.use(router);
  app.use(i18n);
  app.mount('#app');
})();
