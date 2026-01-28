import { defineConfig } from 'vitepress';
import { demoContainerPlugin } from '@gl/vitepress-demo-container-plugin';

export default defineConfig({
  title: 'Balnc Nova UI',
  description: 'A modern Vue 3 component library',
  lang: 'zh-CN',
  
  markdown: {
    config: (md: any) => demoContainerPlugin(md),
    theme: 'github-light'
  },
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' }
    ],
    
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'BnForm', link: '/components/bn-form' },
          { text: 'BnFormItem', link: '/components/bn-form-item' },
          { text: 'BnInput', link: '/components/bn-input' },
          { text: 'BnSelect', link: '/components/bn-select' },
          { text: 'BnSelectItem', link: '/components/bn-select-item' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ]
  }
});
