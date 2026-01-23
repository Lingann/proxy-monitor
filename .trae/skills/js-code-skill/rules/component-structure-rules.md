# 组件结构规范 (Component Structure Rules)

本文件定义了组件和页面的文件组织结构。

## 规则列表

### 1. 独立目录
**规则**: 每个组件/页面的代码包含在自身独立的目录中，例如：`components/component-name` 或 `pages/page-name`。
**指南**: 避免将所有组件平铺在 `components` 目录下。

### 2. 独立样式文件
**规则**: 每个组件/页面都有自己的样式文件，并且文件名与组件/页面文件名相同，例如：`component-name.css` 或 `page-name.css`。
**指南**: 样式文件应与逻辑文件位于同一目录下。

### 3. 统一入口文件
**规则**: 每个组件/页面都有自己的入口文件，例如：`component-name.ts` 或 `page-name.ts`。
**指南**: 入口文件负责导出组件的主体逻辑。

**示例结构**:
```
src/
  components/
    user-card/
      ├── user-card.ts   (入口)
      ├── user-card.css  (样式)
      └── index.ts       (可选导出)
```
