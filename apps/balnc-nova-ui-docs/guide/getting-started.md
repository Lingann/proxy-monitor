# 快速开始

## 安装

使用 npm、yarn 或 pnpm 安装 Balnc Nova UI：

```bash
npm install @balnc-nova-ui/core
# 或
yarn add @balnc-nova-ui/core
# 或
pnpm add @balnc-nova-ui/core
```

## 引入组件

### 完整引入

```ts
import { createApp } from 'vue';
import BalncNovaUI from '@balnc-nova-ui/core';
import '@balnc-nova-ui/core/styles';

const app = createApp(App);
app.use(BalncNovaUI);
app.mount('#app');
```

### 按需引入

```vue
<template>
  <BnButton type="primary">按钮</BnButton>
</template>

<script setup>
import { BnButton } from '@balnc-nova-ui/core';
import '@balnc-nova-ui/core/styles';
</script>
```

## 配置主题

Balnc Nova UI 提供了完整的主题系统，支持自定义主题变量。

```scss
// 自定义主题变量
@import '@balnc-nova-ui/core/styles/themes';

:root {
  --bn-primary-color: #1890ff;
  --bn-success-color: #52c41a;
  --bn-warning-color: #faad14;
  --bn-danger-color: #ff4d4f;
}
```
