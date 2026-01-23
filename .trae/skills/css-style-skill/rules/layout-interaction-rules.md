# 布局与交互规范 (Layout & Interaction Rules)

本文件包含了页面布局和交互效果的 CSS 规范，旨在确保页面的响应式能力和良好的用户体验。

## 规则列表

### 1. 优先使用 Grid/Flex 布局
**规则**: 优先使用 Grid 布局、Flex 布局来实现页面布局，避免使用 float、inline-block 等传统布局方式。
**指南**: 
- **Flexbox**: 适用于一维布局（行或列）。
- **Grid**: 适用于二维布局（行和列）。

**示例**:
```scss
/* Bad */
.container {
  overflow: hidden;
  .item {
    float: left;
    width: 33.33%;
  }
}

/* Good */
.container {
  display: flex;
  gap: 16px;
  .item {
    flex: 1;
  }
}

/* Good (Grid) */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

### 2. 禁止位移式交互
**规则**: 禁止使用鼠标悬浮时，位移元素的方式来实现交互效果，例如：hover 时改变元素位置、缩放等，优先使用阴影、字体加重、背景颜色变化等方式来实现交互效果。
**指南**: 位移或缩放可能会导致布局抖动或覆盖其他元素，影响体验。

**示例**:
```scss
/* Bad */
.button:hover {
  transform: translateY(-2px); /* 避免 */
  margin-top: -2px; /* 禁止 */
}

/* Good */
.button:hover {
  background-color: var(--system-color-primary-hover);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```
