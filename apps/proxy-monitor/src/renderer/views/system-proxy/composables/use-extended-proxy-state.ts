import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ExtendedProxyConfig, ProxyBypassRule } from '../../../../shared/common-types';

interface Message {
  type: 'success' | 'error';
  text: string;
}

export function useExtendedProxyState() {
  const { t } = useI18n();
  const loading = ref(false);
  const saving = ref(false);
  const enabled = ref(false);
  const server = ref('');
  const bypassRules = ref<ProxyBypassRule[]>([]);
  const message = ref<Message | null>(null);

  const loadConfig = async () => {
    loading.value = true;
    message.value = null;

    try {
      const config: ExtendedProxyConfig = await window.electronAPI.getExtendedProxyConfig();
      enabled.value = config.enabled;
      server.value = config.server;
      bypassRules.value = config.bypassRules;
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.load_error')
      };
      console.error('Failed to load proxy config:', error);
    } finally {
      loading.value = false;
    }
  };

  const saveProxyConfig = async () => {
    saving.value = true;
    message.value = null;

    try {
      await window.electronAPI.setExtendedProxyConfig({
        enabled: enabled.value,
        server: server.value,
        bypassRules: bypassRules.value
      });

      message.value = {
        type: 'success',
        text: t('proxy.save_success')
      };
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.save_error')
      };
      console.error('Failed to save proxy config:', error);
    } finally {
      saving.value = false;
    }
  };

  const toggleProxy = async () => {
    saving.value = true;
    message.value = null;

    try {
      if (enabled.value) {
        await window.electronAPI.disableProxy();
        enabled.value = false;
        message.value = {
          type: 'success',
          text: t('proxy.proxy_disabled')
        };
      } else {
        await window.electronAPI.enableProxy();
        enabled.value = true;
        message.value = {
          type: 'success',
          text: t('proxy.proxy_enabled')
        };
      }
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.toggle_error')
      };
      console.error('Failed to toggle proxy:', error);
    } finally {
      saving.value = false;
    }
  };

  const addRule = async (address: string, description?: string) => {
    try {
      await window.electronAPI.addBypassRule(address, description);
      await loadConfig();
      message.value = {
        type: 'success',
        text: t('proxy.save_success')
      };
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.save_error')
      };
      console.error('Failed to add bypass rule:', error);
    }
  };

  const removeRule = async (ruleId: string) => {
    try {
      await window.electronAPI.removeBypassRule(ruleId);
      await loadConfig();
      message.value = {
        type: 'success',
        text: t('proxy.save_success')
      };
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.save_error')
      };
      console.error('Failed to remove bypass rule:', error);
    }
  };

  const updateRule = async (ruleId: string, updates: Partial<ProxyBypassRule>) => {
    try {
      await window.electronAPI.updateBypassRule(ruleId, updates);
      await loadConfig();
      message.value = {
        type: 'success',
        text: t('proxy.save_success')
      };
    } catch (error) {
      message.value = {
        type: 'error',
        text: t('proxy.save_error')
      };
      console.error('Failed to update bypass rule:', error);
    }
  };

  onMounted(() => {
    loadConfig();
  });

  return {
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
    updateRule,
    loadConfig
  };
}
