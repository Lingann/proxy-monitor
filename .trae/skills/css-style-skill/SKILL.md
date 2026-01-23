---
name: css-style-skill
description: CSS 布局、变量命名、主题、样式规范
---

## 命令

1. 优先使用Grid布局、Flex布局 来实现页面布局，避免使用float、inline-block 等布局方式。
2. 禁止使用鼠标悬浮时，位移元素的方式来实现交互效果，例如：hover 时改变元素位置、缩放等， 优先使用阴影、字体加重、背景颜色变化等方式来实现交互效果。

@css-variable-rules

1. 变量命名推荐采用“三段式命名法”（Triptych Notation），格式为：`namespace-value-type-variable-name`。
2. 变量名必须严格使用 kebab-case（短横线分隔）命名，禁止使用 camelCase（小驼峰）。所有单词均小写，单词之间用短横线（-）分隔（例如：`--system-color-control-accent`）。
3. 全局变量必须包含命名空间前缀（例如 `system`），局部变量（Scoped）通常不需要命名空间。
4. 变量名必须包含值类型（Value Type）信息（例如 `color`, `font-size`, `font-weight`, `duration`, `box-shadow` 等），以便于维护和理解。
5. 变量名最后一部分应该是具体的描述性名称，清晰表达变量的含义。
6. 区分“基于值（Value-based）”和“基于用途（Usage-based）”的命名：
   - 基于值的命名：用于定义常量，限制UI取值范围（例如 `--system-color-cherry-red`）。
   - 基于用途的命名：用于描述具体用途，作为接口概念，便于主题切换（例如 `--system-color-text-primary`）。
7. 颜色命名避免仅使用抽象的数字后缀（如 `red-400`），推荐使用具象化的修饰词（如 `cherry-red`, `sky-blue`）以增加可读性。
8. 在实现深色模式（Dark Mode）等主题时，应使用“基于用途”的变量名，通过在不同主题下重新定义变量值来实现，避免在业务代码中编写重复的样式逻辑。
9. 变量名的抽象层级要适中，避免过于通用（如 `box`）导致用途不明，也避免过于具体（如 `main-toolbar-background`）导致复用性差。
10. 推荐在 CSS 变量中体现层级关系，合理抽象设计意图（例如使用 `background-primary`, `background-secondary` 而非具体的颜色名）。

@theme-variable-rules

1. 编写页面/组件的样式时，需要同时考虑到不同主题（如浅色模式、深色模式）下的样式差异

@style-rules

1. 默认风格参考笔记应用Notion的配色和布局风格

## 使用场景

1. 编写 CSS/SCSS 样式文件时
2. 定义全局或局部 CSS 变量时
3. 处理深色模式/主题切换时

## 解释

1. 规范的 CSS 变量命名有助于维护和理解
2. 避免位移交互可以提升用户体验
