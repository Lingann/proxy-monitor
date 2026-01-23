# 变量命名规范 (Variable Naming Rules)

本文件包含了 CSS 变量（Custom Properties）的命名规范，旨在构建清晰、可维护且易于主题化的样式系统。

## 规则列表

### 1. 三段式命名法
**规则**: 变量命名推荐采用“三段式命名法”（Triptych Notation），格式为：`namespace-value-type-variable-name`。
**指南**:
- **Namespace**: 命名空间（如 `system`）。
- **Value Type**: 值类型（如 `color`, `font-size`）。
- **Variable Name**: 具体名称（如 `text-primary`）。

### 2. 严格 Kebab-case
**规则**: 变量名必须严格使用 kebab-case（短横线分隔）命名，禁止使用 camelCase（小驼峰）。
**指南**: 所有单词均小写，单词之间用短横线（-）分隔。

**示例**:
- ✅ `--system-color-control-accent`
- ❌ `--systemColorControlAccent`

### 3. 命名空间
**规则**: 全局变量必须包含命名空间前缀（例如 `system`），局部变量（Scoped）通常不需要命名空间。

### 4. 包含值类型
**规则**: 变量名必须包含值类型（Value Type）信息，以便于维护和理解。
**常见类型**: `color`, `font-size`, `font-weight`, `duration`, `box-shadow`, `spacing`, `z-index`.

### 5. 描述性名称
**规则**: 变量名最后一部分应该是具体的描述性名称，清晰表达变量的含义。

### 6. 值 vs 用途
**规则**: 区分“基于值（Value-based）”和“基于用途（Usage-based）”的命名。
- **基于值**: 用于定义常量，限制 UI 取值范围（Palette）。
- **基于用途**: 用于描述具体用途，作为接口概念，便于主题切换（Semantic）。

**示例**:
```scss
:root {
  /* 基于值 (Primitive/Palette) */
  --system-color-cherry-red: #ff0033;
  --system-color-sky-blue: #0099ff;

  /* 基于用途 (Semantic/Usage) */
  --system-color-text-error: var(--system-color-cherry-red);
  --system-color-text-link: var(--system-color-sky-blue);
}
```

### 7. 具象化颜色命名
**规则**: 颜色命名避免仅使用抽象的数字后缀（如 `red-400`），推荐使用具象化的修饰词（如 `cherry-red`, `sky-blue`）以增加可读性。

### 8. 抽象层级
**规则**: 变量名的抽象层级要适中，避免过于通用（如 `box`）导致用途不明，也避免过于具体（如 `main-toolbar-background`）导致复用性差。

### 9. 体现层级关系
**规则**: 推荐在 CSS 变量中体现层级关系，合理抽象设计意图。

**示例**:
```scss
--system-background-primary: #ffffff;
--system-background-secondary: #f5f5f5;
--system-background-tertiary: #eeeeee;
```
