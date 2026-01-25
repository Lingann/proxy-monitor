import { ref, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';

/* 系统代理状态管理 */
export function useProxyState() {
  const { t } = useI18n();

  const loading = ref(false);

  const saving = ref(false);

  const enabled = ref(false);

  const server = ref('');

  const bypass = ref('');

  const message = ref<{ text: string; type: 'success' | 'error' } | null>(null);

  /* 加载代理配置 */
  const loadProxyConfig = async () => {
    try {
      loading.value = true;

      const config = await (window as any).electronAPI.getProxyConfig();

      enabled.value = config.enabled;

      server.value = config.server;

      bypass.value = config.bypass;
    } catch (error: any) {
      message.value = {
        text: error.message || t('proxy.load_error'),
        type: 'error'
      };
    } finally {
      loading.value = false;
    }
  };

  /* 保存代理配置 */
  const saveProxyConfig = async () => {
    try {
      saving.value = true;

      await (window as any).electronAPI.setProxyConfig({
        enabled: enabled.value,
        server: server.value,
        bypass: bypass.value
      });

      message.value = {
        text: t('proxy.save_success'),
        type: 'success'
      };

      setTimeout(() => (message.value = null), 3000);
    } catch (error: any) {
      message.value = {
        text: error.message || t('proxy.save_error'),
        type: 'error'
      };
    } finally {
      saving.value = false;
    }
  };

  /* 切换代理启用状态 */
  const toggleProxy = async () => {
    try {
      saving.value = true;

      if (enabled.value) {
        await (window as any).electronAPI.disableProxy();

        enabled.value = false;

        message.value = {
          text: t('proxy.disabled'),
          type: 'success'
        };
      } else {
        await (window as any).electronAPI.enableProxy();

        enabled.value = true;

        message.value = {
          text: t('proxy.enabled'),
          type: 'success'
        };
      }

      setTimeout(() => (message.value = null), 3000);
    } catch (error: any) {
      message.value = {
        text: error.message || t('proxy.toggle_error'),
        type: 'error'
      };
    } finally {
      saving.value = false;
    }
  };

  onMounted(() => {
    loadProxyConfig();
  });

  return {
    loading,
    saving,
    enabled,
    server,
    bypass,
    message,
    loadProxyConfig,
    saveProxyConfig,
    toggleProxy
  };
}
