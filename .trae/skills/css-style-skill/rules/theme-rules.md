# 主题规范 (Theme Rules)

本文件包含了多主题（如深色模式）支持的规范。

## 规则列表

### 1. 基于用途的变量
**规则**: 在实现深色模式（Dark Mode）等主题时，应使用“基于用途（Usage-based）”的变量名，通过在不同主题下重新定义变量值来实现。
**指南**: 避免在业务代码中编写重复的样式逻辑（如 `.dark .button { ... }`），而应该改变变量的值。

**示例**:
```scss
/* 定义 */
:root {
  --system-color-background: #ffffff;
  --system-color-text: #333333;
}

[data-theme='dark'] {
  --system-color-background: #1a1a1a;
  --system-color-text: #ffffff;
}

/* 使用 */
.card {
  background-color: var(--system-color-background); /* 自动适配 */
  color: var(--system-color-text);
}
```

### 2. 考虑多主题差异
**规则**: 编写页面/组件的样式时，需要同时考虑到不同主题（如浅色模式、深色模式）下的样式差异。
**指南**: 在设计阶段和开发阶段都要测试深色模式下的表现，特别是边框、阴影、半透明遮罩等元素。
