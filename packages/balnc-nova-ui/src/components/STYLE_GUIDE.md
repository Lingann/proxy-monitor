# 组件样式规范

## 目录

- [组件样式规范](#组件样式规范)
  - [目录](#目录)
  - [适用范围](#适用范围)
  - [基本原则](#基本原则)
  - [目录结构规范](#目录结构规范)
  - [文件命名规范](#文件命名规范)
  - [文件头注释规范](#文件头注释规范)
  - [变量定义规范](#变量定义规范)
  - [Mixin 使用规范](#mixin-使用规范)
  - [样式组织顺序](#样式组织顺序)
  - [类名与状态规范](#类名与状态规范)
  - [主题与响应式规范](#主题与响应式规范)
  - [最佳实践](#最佳实践)

## 适用范围

本规范适用于 `src/renderer/components` 下所有组件及其子组件的 SCSS 样式文件。

## 基本原则

1. **职责单一**：每个 SCSS 文件只处理一类样式问题
2. **模块化**：通过 mixin 实现样式复用与组合
3. **可主题化**：优先使用 CSS 变量实现主题扩展
4. **可维护性**：命名清晰、层级浅、拆分合理
5. **防御式写法**：CSS 变量提供回退值

## 目录结构规范

组件样式必须放在 `styles/` 目录中，统一入口为 `index.scss`。

```
component-name/
├── index.ts
├── component-name.tsx
└── styles/
    ├── index.scss
    ├── variables.scss
    ├── mixin-base-style.scss
    ├── mixin-size-style.scss
    ├── mixin-color-style.scss
    ├── mixin-state-style.scss
    ├── mixin-variant-style.scss
    ├── mixin-shape-style.scss        # 可选
    ├── mixin-reset-style.scss        # 可选
    └── mixin-variant-color-style.scss # 可选
```

子组件必须拥有独立的样式目录：

```
parent-component/
└── sub-components/
    └── child-component/
        ├── index.ts
        ├── child-component.tsx
        └── styles/
            ├── index.scss
            ├── variables.scss
            └── mixin-base-style.scss
```

## 文件命名规范

1. **统一使用小写与连字符**：`mixin-base-style.scss`
2. **mixin 文件统一前缀**：`mixin-xxx-style.scss`
3. **入口文件统一命名**：`index.scss`
4. **变量文件统一命名**：`variables.scss`
5. **避免下划线前缀**：不使用 `_mixin.scss`

## 文件头注释规范

新建或重构的样式文件必须包含头部注释，示例如下：

```scss
/**
 * ******************************************************
 * @file                     index.scss
 * @description             「组件样式入口文件」
 * 加载所有组件相关样式
 * @author                  blancnova-web
 * ******************************************************
 */
```

## 变量定义规范

### 1. 组件前缀变量

每个组件必须在 `variables.scss` 中定义组件前缀变量：

```scss
$component-prefix: bn-component;
```

### 2. 引用方式

所有样式文件使用 `@use` 引用变量：

```scss
@use './variables' as *;
```

### 3. CSS 变量定义

CSS 变量放在 mixin 中集中定义，命名使用组件前缀：

```scss
@mixin component-base-variables {
  --#{$component-prefix}-border-width: var(--bn-border-width-md);
  --bn-border-width-md: 1px;
}
```

## Mixin 使用规范

1. **职责分离**：每个 mixin 处理一类样式问题
2. **命名统一**：`{component}-{category}-style` / `{component}-{category}-variables`
3. **嵌套层级**：不超过 3 层

示例：

```scss
@mixin component-base-style {
  .#{$component-prefix} {
    display: inline-flex;
    align-items: center;
  }
}
```

## 样式组织顺序

`index.scss` 的推荐组织顺序如下：

```scss
// 1. 导入所有 mixin
@use './variables' as *;
@use './mixin-base-style' as *;
@use './mixin-size-style' as *;
@use './mixin-color-style' as *;
@use './mixin-state-style' as *;
@use './mixin-variant-style' as *;
@use './mixin-shape-style' as *;
@use './mixin-reset-style' as *;
@use './mixin-variant-color-style' as *;

// 2. 定义 CSS 变量
.#{$component-prefix} {
  @include component-base-variables;
  @include component-size-variables;
  @include component-color-variables;
  @include component-variant-variables;
}

// 3. 应用基础样式
@include component-reset-style;
@include component-base-style;

// 4. 应用修饰样式
@include component-size-style;
@include component-color-style;
@include component-state-style;
@include component-variant-style;
@include component-shape-style;

// 5. 应用组合样式
@include component-variant-color-style;
```

## 类名与状态规范

1. **组件根类**：使用组件前缀作为根类
2. **修饰类**：使用统一的前缀与类别，如 `-size-` / `-variant-` / `-color-`
3. **状态类**：推荐使用 `is-` / `has-` 或组件前缀状态类，组件内保持一致

示例：

```scss
.#{$component-prefix} {
  &.#{$component-prefix}-size-small { /* ... */ }
  &.#{$component-prefix}-variant-outlined { /* ... */ }
  &.is-disabled { /* ... */ }
}
```

## 主题与响应式规范

1. **主题变量结构**：设计变量 -> 语义变量 -> 组件变量
2. **暗黑模式**：通过 `data-theme` 或主题容器切换变量
3. **响应式**：优先通过 CSS 变量控制尺寸，必要时在 mixin 中加入断点

```scss
:root {
  --bn-color-primary: #1976d2;
}

[data-theme='dark'] {
  --bn-color-primary: #90caf9;
}
```

## 最佳实践

1. **CSS 变量优先**：便于主题扩展
2. **避免硬编码**：颜色、尺寸等使用 token 或变量
3. **避免全局污染**：组件样式不直接作用于全局元素
4. **保持入口清晰**：仅通过 `index.scss` 暴露样式
