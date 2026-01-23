# 项目结构规范 (Project Structure Rules)

本文件定义了项目层面的全局结构规范。

## 规则列表

### 1. 全局样式
**规则**: 项目中应该存在公共的样式/全局变量文件，例如：`app-styles.css`，用于定义全局的样式。
**指南**: 包含重置样式（Reset CSS）、全局字体、通用布局类等。

### 2. 公共组件目录
**规则**: 项目中应该存在公共组件/布局模块目录，例如：`components/common` 或 `layouts/common`，用于存放公共的组件/布局模块。
**指南**: 只有跨业务复用的组件才放入 Common 目录。

### 3. CSS 变量定义
**规则**: 使用 CSS 变量定义全局的样式变量，例如：`--primary-color`、`--font-size` 等。
**指南**: 集中管理颜色、间距、字号等设计 Token。

**示例**:
```css
/* app-styles.css */
:root {
  --primary-color: #007bff;
  --font-size-base: 14px;
}
```
