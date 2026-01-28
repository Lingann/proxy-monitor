import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import VPDemoContainer from '@gl/vitepress-demo-container';
import '@balnc-nova-ui/core/styles';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VPDemoContainer);
  }
};

export default theme;
