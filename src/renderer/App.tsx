import { defineComponent } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Activity, Settings, Package } from 'lucide-vue-next';

export default defineComponent({
  name: 'App',
  setup() {
    const { t } = useI18n();
    
    return () => (
      <div class="app-container">
        <div class="sidebar">
          <div class="sidebar-header">
            <h2>{t('app.title')}</h2>
          </div>
          <nav class="sidebar-nav">
             <RouterLink to="/monitor" class="nav-item" active-class="active">
               <Activity class="nav-icon" size={18} />
               <span class="nav-text">{t('modules.network_monitor')}</span>
             </RouterLink>
             <RouterLink to="/settings" class="nav-item" active-class="active">
               <Settings class="nav-icon" size={18} />
               <span class="nav-text">{t('modules.settings')}</span>
             </RouterLink>
             <RouterLink to="/components" class="nav-item" active-class="active">
               <Package class="nav-icon" size={18} />
               <span class="nav-text">{t('modules.component_library')}</span>
             </RouterLink>
          </nav>
        </div>
        <div class="main-content">
          <RouterView />
        </div>
      </div>
    );
  }
});
