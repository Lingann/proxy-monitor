---
name: js-code-skill
description: JavaScript/TypeScript 组件、页面、模块开发规范
---

## 命令

组件/页面模块：
1. 每个组件/页面都有自己的样式文件，并且文件名与组件/页面文件名相同，例如：component-name.css 或 page-name.css。
2. 每个组件/页面都有自己的入口文件，例如：component-name.ts 或 page-name.ts。
3. 每个组件/页面的代码包含在自身独立的目录中，例如：components/component-name 或 pages/page-name。
4. 使用最新的script 标签 es module 规范，例如：<script type="module" src="component-name.js"></script> 来引入组件/页面的代码，支持使用preload、prefetch 、defer 、async 等属性来优化加载，禁止通过require 等方式引入组件/页面的代码。
5. 项目中应该存在公共的样式/全局变量文件，例如：app-styles.css，用于定义全局的样式。
6. 项目中应该存在公共组件/布局模块目录，例如：components/common 或 layouts/common，用于存放公共的组件/布局模块。
7. 类名严格遵循BEM（Block-Element-Modifier）命名规范
8. 使用css 变量定义全局的样式变量，例如：--primary-color、--font-size等。
9. 组件/页面必须使用国际化字符串，不能直接使用中文/英文。

## 使用场景

1. 创建或重构 JavaScript/TypeScript 组件或页面时
2. 组织项目目录结构时

## 解释

1. 规范的组件结构有助于维护和扩展
2. 使用 ES Module 符合现代 Web 标准
