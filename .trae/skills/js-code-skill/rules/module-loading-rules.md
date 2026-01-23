# 模块加载规范 (Module Loading Rules)

本文件定义了 Web 端的模块加载方式。

## 规则列表

### 1. ES Modules 优先
**规则**: 使用最新的 script 标签 ES Module 规范，例如：`<script type="module" src="component-name.js"></script>` 来引入组件/页面的代码。
**指南**: 禁止通过 `require` 等 CommonJS 方式在浏览器端引入代码。

### 2. 加载优化
**规则**: 支持使用 `preload`、`prefetch`、`defer`、`async` 等属性来优化加载。

**示例**:
```html
<!-- 引入主模块 -->
<script type="module" src="/src/main.ts"></script>

<!-- 预加载关键资源 -->
<link rel="modulepreload" href="/src/shared/utils.ts">
```
