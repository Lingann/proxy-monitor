# 按钮组件样式规范

## 目录

- [按钮组件样式规范](#按钮组件样式规范)
  - [目录](#目录)
  - [基本原则](#基本原则)
  - [目录结构规范](#目录结构规范)
  - [变量定义规范](#变量定义规范)
    - [基础变量](#基础变量)
    - [主题变量](#主题变量)
  - [Mixin 使用规范](#mixin-使用规范)
  - [样式组织模式](#样式组织模式)
  - [变量使用规范](#变量使用规范)
  - [响应式设计规范](#响应式设计规范)
  - [主题系统规范](#主题系统规范)
  - [状态与变体规范](#状态与变体规范)
  - [最佳实践](#最佳实践)

## 基本原则

按钮组件样式开发需遵循以下基本原则：

1. **职责单一**：每个 SCSS 文件只处理一类样式问题
2. **模块化**：通过 Mixin 实现样式代码复用
3. **原子化**：按照功能特性拆分样式模块
4. **CSS 变量**：利用 CSS 变量实现主题定制
5. **防御式编程**：预设默认值，避免样式崩溃
6. **命名规范**：统一前缀，层级清晰

## 目录结构规范

按钮组件样式目录结构应当如下组织：

```
styles/
├── index.scss            # 样式入口文件，导入所有模块
├── variables.scss        # 全局变量定义
├── mixin-base-style.scss # 基础样式混入
├── mixin-reset-style.scss# 重置样式混入
├── mixin-size-style.scss # 尺寸样式混入
├── mixin-color-style.scss# 颜色样式混入
├── mixin-variant-style.scss # 变体样式混入
├── mixin-shape-style.scss   # 形状样式混入
└── mixin-variant-color-style.scss # 变体颜色组合样式
```

## 变量定义规范

### 基础变量

1. **前缀命名规则**：在 `variables.scss` 中必须定义组件前缀变量

```scss
// 在 variables.scss 中定义
$button-prefix: bn-btn;
```

2. **引用规则**：所有文件引用变量文件时使用 `@use` 语法

```scss
@use './variables' as *;
```

### 主题变量

1. **CSS 变量定义**：使用 CSS 变量定义可主题化属性，遵循 BEM 命名规范与组件前缀

```scss
// 在 mixin-base-variables 中定义 CSS 变量
@mixin button-base-variables {
  // 按钮通用变量
  --#{$button-prefix}-border-style: solid;
  --#{$button-prefix}-border-width: var(--bn-border-width-md);

  // 默认值兜底
  --bn-border-width-md: 1px;
}
```

2. **变量分类**：按照功能将变量划分为不同的 mixin

```scss
// 按钮基础变量
@mixin button-base-variables { /* ... */ }

// 按钮尺寸变量
@mixin button-size-variables { /* ... */ }

// 按钮颜色变量 
@mixin button-color-variables { /* ... */ }

// 按钮形状变量
@mixin button-shape-variables { /* ... */ }

// 按钮变体变量
@mixin button-variant-variables { /* ... */ }
```

## Mixin 使用规范

1. **职责分离**：每个 mixin 文件处理一类样式问题

```scss
// mixin-base-style.scss
@mixin button-base-style {
  .#{$button-prefix} {
    position: relative;
    display: inline-flex;
    // ...其他基础样式
  }
}
```

2. **命名规范**：mixin 命名必须包含组件名和功能描述

```scss
@mixin button-size-style { /* ... */ }
@mixin button-color-style { /* ... */ }
```

3. **嵌套规则**：mixin 内部嵌套不应超过 3 层

```scss
// 推荐写法
@mixin button-variant-style {
  // 第一层：选择器
  .#{$button-prefix} {
    // 基础样式
    
    // 第二层：修饰符
    &-outlined {
      // 变体样式
      
      // 第三层：状态
      &:hover {
        // 悬停样式
      }
    }
  }
}
```

## 样式组织模式

在 `index.scss` 中，按照以下顺序组织样式：

```scss
// 1. 导入所有 mixin 文件
@use './variables' as *;
@use './mixin-base-style' as *;
@use './mixin-size-style' as *;
@use './mixin-color-style' as *;
@use './mixin-variant-style' as *;
@use './mixin-shape-style' as *;
@use './mixin-reset-style' as *;
@use './mixin-variant-color-style' as *;

// 2. 定义 CSS 变量
button.#{$button-prefix} {
  @include button-base-variables;
  @include button-variant-variables;
  @include button-size-variables;
  @include button-color-variables;
  @include button-shape-variables;
}

// 3. 应用基础样式
@include button-reset-style;
@include button-base-style;

// 4. 应用修饰样式
@include button-size-style;
@include button-color-style;
@include button-variant-style;
@include button-shape-style;

// 5. 应用组合样式
@include button-variant-color-style;
```

## 变量使用规范

1. **CSS 变量优先**：组件内部样式优先使用 CSS 变量，便于主题切换

```scss
.#{$button-prefix} {
  border-style: var(--#{$button-prefix}-border-style);
  border-width: var(--#{$button-prefix}-border-width);
}
```

2. **SCSS 变量使用**：对于不需要运行时更改的属性，使用 SCSS 变量

```scss
$button-padding-x-sm: 0.5rem;

.#{$button-prefix}-small {
  padding-inline: $button-padding-x-sm;
}
```

3. **变量层级**：CSS 变量命名应当遵循层级结构

```scss
// 基础层
--bn-color-primary: #1976d2;

// 组件层
--bn-btn-primary-bg: var(--bn-color-primary);

// 状态层
--bn-btn-primary-hover-bg: var(--bn-color-primary-light);
```

## 响应式设计规范

1. **响应式设计**：通过 CSS 变量实现响应式尺寸调整

```scss
@mixin button-responsive-variables {
  // 桌面端尺寸
  --bn-btn-padding-x: 1rem;
  --bn-btn-padding-y: 0.5rem;
  
  // 移动端响应式调整
  @media screen and (max-width: 768px) {
    --bn-btn-padding-x: 0.75rem;
    --bn-btn-padding-y: 0.375rem;
  }
}
```

2. **断点管理**：在 mixin 中使用统一断点变量

```scss
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px
);

@mixin respond-to($breakpoint) {
  $value: map-get($breakpoints, $breakpoint);
  
  @if $value {
    @media screen and (max-width: $value) {
      @content;
    }
  }
}
```

## 主题系统规范

1. **主题变量结构**：主题变量应遵循三层结构

```
设计变量 -> 语义变量 -> 组件变量
```

2. **变量映射关系**：

```scss
// 设计变量（Design Tokens）
--bn-color-blue-500: #1976d2;

// 语义变量（Semantic Tokens）
--bn-color-primary: var(--bn-color-blue-500);

// 组件变量（Component Tokens）
--bn-btn-primary-bg: var(--bn-color-primary);
```

3. **暗黑模式切换**：通过 CSS 变量实现无缝切换

```scss
:root {
  // 亮色主题变量
  --bn-color-primary: #1976d2;
}

[data-theme="dark"] {
  // 暗色主题变量
  --bn-color-primary: #90caf9;
}
```

## 状态与变体规范

1. **状态样式**：使用 BEM 修饰符处理状态样式

```scss
.#{$button-prefix} {
  // 正常状态

  &--disabled {
    // 禁用状态
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &--loading {
    // 加载状态
    cursor: wait;
  }
}
```

2. **变体样式**：通过嵌套组合处理变体与颜色

```scss
// 基础变体
.#{$button-prefix}-outlined {
  background-color: transparent;
  border-style: solid;
}

// 颜色与变体组合
.#{$button-prefix}-outlined.#{$button-prefix}-primary {
  border-color: var(--bn-color-primary);
  color: var(--bn-color-primary);
  
  &:hover {
    background-color: var(--bn-color-primary-50);
  }
}
```

## 最佳实践

1. **样式防御**：CSS 变量使用需要设置回退值

```scss
// 良好实践
color: var(--bn-btn-text-color, #333);

// 避免无回退值
color: var(--bn-btn-text-color); // 不推荐
```

2. **CSS 变量继承**：利用 CSS 变量继承机制减少重复

```scss
// 基础层定义
:root {
  --bn-border-radius-base: 4px;
}

// 组件层使用基础变量
.#{$button-prefix} {
  --bn-btn-border-radius: var(--bn-border-radius-base);
  border-radius: var(--bn-btn-border-radius);
}
```

3. **混合策略**：对复杂组件使用混合策略

```scss
// 1. 基础样式直接应用
@include button-base-style;

// 2. 变体样式通过类名应用
.#{$button-prefix}-small { /* ... */ }

// 3. 状态样式通过修饰符应用
.#{$button-prefix}.is-disabled { /* ... */ }
```

4. **避免硬编码**：避免在样式中硬编码颜色、尺寸等值

```scss
// 不推荐
color: #1976d2;

// 推荐
color: var(--bn-color-primary, #1976d2);
```

5. **类名组织**：使用属性动态组合类名

```tsx
<button
  class={[
    buttonClass.value,
    props.size && `bn-btn-${props.size}`,
    props.shape && `bn-btn-${props.shape}`,
    props.effect && `bn-btn-effect-${props.effect}`,
    props.loading && 'bn-btn-loading',
    props.disabled && 'bn-btn-disabled'
  ]}
>
  {/* 按钮内容 */}
</button>
``` 
