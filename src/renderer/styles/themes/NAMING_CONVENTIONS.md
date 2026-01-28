# 主题变量命名规范

## 📚 目录
- [一、文件命名规范](#一文件命名规范)
- [二、CSS 变量命名规范](#二css-变量命名规范)
- [三、Mixin 命名规范](#三mixin-命名规范)
- [四、函数命名规范](#四函数命名规范)
- [五、文件内注释规范](#五文件内注释规范)
- [六、变量分组规范](#六变量分组规范)

---

## 一、文件命名规范

### 1.1 通用变量文件 (`common/` 目录)

**命名格式：** `{category}-variables.scss`

**规则说明：**
- 使用 `{category}` 表示变量类别
- 统一添加 `-variables` 后缀，明确表示这是变量定义文件
- 使用小写字母和连字符

| 文件名 | 说明 | 变量类别 |
|--------|------|----------|
| `animation-variables.scss` | 动画相关变量 | animation |
| `background-variables.scss` | 背景相关变量 | background |
| `border-variables.scss` | 边框相关变量 | border |
| `filter-variables.scss` | 滤镜相关变量 | filter |
| `typography-variables.scss` | 排版相关变量（字体、行高等） | typography |
| `grid-variables.scss` | 网格相关变量 | grid |
| `line-height-variables.scss` | 行高相关变量 | line-height |
| `responsive-variables.scss` | 响应式相关变量 | responsive |
| `ripple-variables.scss` | 波纹效果变量 | ripple |
| `shadow-variables.scss` | 阴影相关变量 | shadow |
| `sizing-variables.scss` | 尺寸相关变量 | sizing |
| `spacing-variables.scss` | 间距相关变量 | spacing |
| `text-variables.scss` | 文本相关变量 | text |
| `transition-variables.scss` | 过渡相关变量 | transition |

**注意：**
- `palettes.scss` 文件几乎为空，建议删除
- `font.scss` 应重命名为 `typography-variables.scss`，更准确地描述内容

### 1.2 函数文件 (`functions/` 目录)

**命名格式：** `{category}-functions.scss`

**规则说明：**
- 使用 `{category}` 表示函数类别
- 统一添加 `-functions` 后缀，明确表示这是函数定义文件

| 文件名 | 说明 | 函数类别 |
|--------|------|----------|
| `color-functions.scss` | 颜色相关函数 | color |
| `math-functions.scss` | 数学相关函数 | math |
| `palette-functions.scss` | 调色板相关函数 | palette |
| `string-functions.scss` | 字符串相关函数 | string |

### 1.3 混合宏文件 (`mixins/` 目录)

**命名格式：** `{category}-mixins.scss`

**规则说明：**
- 使用 `{category}` 表示混合宏类别
- 统一添加 `-mixins` 后缀，明确表示这是混合宏定义文件

| 文件名 | 说明 | 混合宏类别 |
|--------|------|----------|
| `palette-mixins.scss` | 调色板相关混合宏 | palette |
| `responsive-mixins.scss` | 响应式相关混合宏 | responsive |
| `root-mixins.scss` | 根变量相关混合宏 | root |

### 1.4 调色板文件 (`palettes/` 目录)

**命名格式：** `{color-name}-palette.scss`

**规则说明：**
- 使用 `{color-name}` 表示颜色名称
- 统一添加 `-palette` 后缀，明确表示这是调色板定义文件

| 文件名 | 说明 | 颜色名称 |
|--------|------|----------|
| `danger-palette.scss` | 危险色板 | danger |
| `info-palette.scss` | 信息色板 | info |
| `neutral-palette.scss` | 中性色板 | neutral |
| `primary-palette.scss` | 主色板 | primary |
| `success-palette.scss` | 成功色板 | success |
| `warning-palette.scss` | 警告色板 | warning |

### 1.5 主题文件 (`themes/` 目录)

**命名格式：** `{theme-name}/{file-name}.scss`

**规则说明：**
- 主题目录名使用 `{theme-name}-theme` 格式
- 主题内部文件使用 `{file-name}-variables.scss` 格式

**目录结构：**
```
themes/
├── default-theme/
│   ├── index.scss              # 主题入口文件
│   ├── common-variables.scss   # 通用变量定义
│   └── palette-variables.scss  # 调色板变量定义
├── dark-theme/
│   ├── index.scss              # 主题入口文件
│   ├── common-variables.scss   # 通用变量定义
│   └── palette-variables.scss  # 调色板变量定义
└── index.scss                  # 主题系统入口
```

---

## 二、CSS 变量命名规范

### 2.1 命名格式

```
--{prefix}-{category}-{type}-{state}-{variant}
```

### 2.2 命名规则

| 部分 | 说明 | 示例 |
|------|------|------|
| `prefix` | 项目前缀，固定为 `bn` | `bn` |
| `category` | 变量类别（如 bg, text, border, spacing） | `bg`, `text`, `border` |
| `type` | 具体类型（如 color, width, radius） | `color`, `width`, `radius` |
| `state` | 状态（可选，如 hover, active, disabled） | `hover`, `active`, `disabled` |
| `variant` | 变体（可选，如 soft, light, dark） | `soft`, `light`, `dark` |

### 2.3 命名示例

#### 背景变量
```scss
// 基础背景色
--bn-bg-color-base              // 基础背景色
--bn-bg-color-container         // 容器背景色
--bn-bg-color-secondary         // 次级背景色
--bn-bg-color-tertiary          // 第三级背景色

// 状态背景色
--bn-bg-color-hover             // 悬停背景色
--bn-bg-color-active            // 激活背景色
--bn-bg-color-disabled          // 禁用背景色
--bn-bg-color-selected          // 选中背景色

// 功能背景色
--bn-bg-color-primary-base      // 主色背景
--bn-bg-color-primary-soft      // 主色淡背景
--bn-bg-color-primary-hover     // 主色悬停背景
--bn-bg-color-success-base      // 成功色背景
--bn-bg-color-danger-base       // 危险色背景

// 特殊背景色
--bn-bg-color-mask             // 遮罩背景色
--bn-bg-color-overlay          // 覆盖层背景色
--bn-bg-color-backdrop         // 背景模糊层
```

#### 文本变量
```scss
// 基础文本色
--bn-text-color-base            // 基础文本色
--bn-text-color-secondary       // 次级文本色
--bn-text-color-tertiary       // 第三级文本色

// 功能文本色
--bn-text-color-primary-base    // 主色文本
--bn-text-color-primary-hover   // 主色悬停文本
--bn-text-color-success-base    // 成功色文本
--bn-text-color-danger-base     // 危险色文本

// 状态文本色
--bn-text-color-disabled        // 禁用文本色
--bn-text-color-inverse         // 反色文本色
--bn-text-color-link            // 链接文本色
--bn-text-color-placeholder     // 占位符文本色

// 特殊文本色
--bn-text-color-title           // 标题文本色
--bn-text-color-subtitle        // 副标题文本色
--bn-text-color-caption         // 说明文本色
```

#### 边框变量
```scss
// 边框宽度
--bn-border-width-none          // 无边框
--bn-border-width-sm            // 小边框宽度
--bn-border-width-md            // 中等边框宽度
--bn-border-width-lg            // 大边框宽度

// 边框圆角
--bn-border-radius-none         // 无圆角
--bn-border-radius-sm           // 小圆角
--bn-border-radius-md           // 中等圆角
--bn-border-radius-lg           // 大圆角
--bn-border-radius-pill         // 胶囊圆角
--bn-border-radius-circle       // 圆形圆角

// 边框颜色
--bn-border-color-base          // 基础边框色
--bn-border-color-light         // 浅色边框
--bn-border-color-dark          // 深色边框
--bn-border-color-hover         // 悬停边框色
--bn-border-color-active        // 激活边框色
--bn-border-color-focus         // 焦点边框色
--bn-border-color-disabled      // 禁用边框色

// 功能边框色
--bn-border-color-primary       // 主色边框
--bn-border-color-success       // 成功色边框
--bn-border-color-warning       // 警告色边框
--bn-border-color-danger        // 危险色边框
```

#### 间距变量
```scss
// 基础间距
--bn-spacing-unit               // 基础间距单位
--bn-spacing-xs                 // 超小间距
--bn-spacing-sm                 // 小间距
--bn-spacing-md                 // 中等间距
--bn-spacing-lg                 // 大间距
--bn-spacing-xl                 // 超大间距
--bn-spacing-xxl                // 特大间距

// 外边距
--bn-margin-xs                  // 超小外边距
--bn-margin-sm                  // 小外边距
--bn-margin-md                  // 中等外边距
--bn-margin-lg                  // 大外边距
--bn-margin-xl                  // 超大外边距

// 内边距
--bn-padding-xs                 // 超小内边距
--bn-padding-sm                 // 小内边距
--bn-padding-md                 // 中等内边距
--bn-padding-lg                 // 大内边距
--bn-padding-xl                 // 超大内边距
```

#### 阴影变量
```scss
// 默认阴影
--bn-shadow-none                // 无阴影
--bn-shadow-xs                  // 超小阴影
--bn-shadow-sm                  // 小阴影
--bn-shadow-md                  // 中等阴影
--bn-shadow-lg                  // 大阴影
--bn-shadow-xl                  // 超大阴影
--bn-shadow-2xl                 // 特大阴影
--bn-shadow-inner               // 内阴影

// 颜色阴影
--bn-shadow-primary-md          // 主色中等阴影
--bn-shadow-success-md          // 成功色中等阴影
--bn-shadow-warning-md          // 警告色中等阴影
--bn-shadow-danger-md           // 危险色中等阴影

// 特效阴影
--bn-shadow-glow-primary        // 主色发光效果
--bn-shadow-glow-success        // 成功色发光效果
```

#### 过渡变量
```scss
// 过渡持续时间
--bn-transition-duration-fastest // 最快过渡
--bn-transition-duration-fast   // 快速过渡
--bn-transition-duration-normal  // 正常过渡
--bn-transition-duration-slow   // 慢速过渡
--bn-transition-duration-slowest // 最慢过渡

// 过渡缓动函数
--bn-transition-timing-default  // 默认缓动
--bn-transition-timing-in       // 进入缓动
--bn-transition-timing-out      // 离开缓动
--bn-transition-timing-in-out   // 进出缓动

// 常用过渡组合
--bn-transition-base            // 基础过渡
--bn-transition-colors          // 颜色过渡
--bn-transition-transform       // 变换过渡
--bn-transition-opacity         // 透明度过渡
```

#### 动画变量
```scss
// 动画持续时间
--bn-animation-duration-fast    // 快速动画
--bn-animation-duration-normal  // 正常动画
--bn-animation-duration-slow    // 慢速动画

// 动画缓动函数
--bn-animation-timing-default   // 默认缓动
--bn-animation-timing-bounce    // 弹跳缓动
--bn-animation-timing-elastic   // 弹性缓动

// 常用动画预设
--bn-animation-fade-in          // 淡入动画
--bn-animation-fade-out         // 淡出动画
--bn-animation-scale-in         // 缩放进入
--bn-animation-slide-in-up      // 从上滑入
```

### 2.4 调色板变量规范

**核心原则：用途优先而非定义优先。** 调色板只提供基础色阶，所有语义化变量在用途层定义。

**色板变量范围：**
- 基础色阶变量：`--bn-{palette}-inner-{1-9}` 与 `--bn-{palette}-color-{1-9}`
- 禁止在色板层定义语义变量（bg/text/border 等）

**色阶到语义映射示例：**
```scss
// 背景语义变量（用途层）
--bn-bg-color-primary-base: var(--bn-primary-color-5);
--bn-bg-color-primary-hover: var(--bn-primary-color-4);
--bn-bg-color-primary-active: var(--bn-primary-color-6);
--bn-bg-color-primary-disabled: var(--bn-primary-color-2);

// 文本/边框语义变量（用途层）
--bn-text-color-primary-base: var(--bn-primary-color-5);
--bn-border-color-primary: var(--bn-primary-color-5);
```

### 2.5 命名原则

1. **语义化优先**：变量名应清晰表达其用途
2. **层级清晰**：按照 类别-类型-状态-变体 的层级组织
3. **一致性**：相同类型的变量使用相同的命名模式
4. **简洁性**：在保证清晰的前提下，尽量简短
5. **可预测性**：通过命名模式可以推断出变量名

---

## 三、Mixin 命名规范

### 3.1 命名格式

```
{category}-{action}
```

### 3.2 命名规则

| 部分 | 说明 | 示例 |
|------|------|------|
| `category` | Mixin 类别 | `background`, `text`, `spacing` |
| `action` | Mixin 动作 | `variables`, `variables-dark`, `generate` |

### 3.3 命名示例

#### 变量生成 Mixin
```scss
// 生成变量
@mixin background-variables { }
@mixin text-variables { }
@mixin border-variables { }
@mixin spacing-variables { }
@mixin shadow-variables { }
@mixin transition-variables { }
@mixin animation-variables { }

// 生成暗色模式变量
@mixin background-variables-dark { }
@mixin text-variables-dark { }
@mixin border-variables-dark { }
@mixin shadow-variables-dark { }
@mixin ripple-variables-dark { }
```

#### 功能性 Mixin
```scss
// 调色板生成
@mixin generate-palette-rgb-inner-vars { }
@mixin generate-palette-rgb-color-vars { }

// 响应式
@mixin respond-above { }
@mixin respond-below { }
@mixin respond-between { }

// 根变量
@mixin define-root-variables { }
@mixin define-theme-variables { }
```

### 3.4 Mixin 参数命名

```scss
// 参数使用小写字母和连字符
@mixin generate-palette-rgb-color-vars($name, $palette, $prefix: 'bn') {
  // $name: 色板名称
  // $palette: 色板颜色映射
  // $prefix: CSS 变量前缀
}
```

---

## 四、函数命名规范

### 4.1 命名格式

```
{category}-{action}
```

### 4.2 命名规则

| 部分 | 说明 | 示例 |
|------|------|------|
| `category` | 函数类别 | `color`, `math`, `palette` |
| `action` | 函数动作 | `create`, `get`, `to`, `from` |

### 4.3 命名示例

#### 颜色函数
```scss
@function hex-to-rgb($hex) { }
@function rgb-to-string($rgb) { }
@function get-contrast-color($color) { }
@function adjust-color-lightness($color, $amount) { }
```

#### 调色板函数
```scss
@function create-palette($name, $base-color, $custom-colors) { }
@function create-semantic-colors($base-color) { }
@function create-gradient-colors($name, $palette) { }
@function create-ghost-colors($base-color) { }
```

#### 数学函数
```scss
@function calculate-spacing($multiplier) { }
@function calculate-percentage($value, $total) { }
@function clamp-value($min, $value, $max) { }
```

#### 字符串函数
```scss
@function string-replace($string, $search, $replace) { }
@function string-truncate($string, $length) { }
```

---

## 五、文件内注释规范

### 5.1 文件头注释

每个文件应包含清晰的文件头注释：

```scss
// ======================================================
// {文件描述}
// ======================================================
// 
// 用途：{详细说明该文件的用途}
// 包含：{列出文件中包含的主要内容}
// 
// ======================================================
```

**示例：**
```scss
// ======================================================
// 背景变量
// ======================================================
// 
// 用途：定义所有背景相关的 CSS 变量，包括基础背景色、
//       状态背景色、功能背景色和特殊背景色
// 包含：
//   - 基础背景色变量
//   - 状态背景色变量（hover, active, disabled, selected）
//   - 功能背景色变量（primary, success, warning, danger, info）
//   - 特殊背景色变量（mask, overlay, backdrop）
//   - 暗色模式背景变量
// 
// ======================================================
```

### 5.2 变量分组注释

在文件内部，变量应按逻辑分组并添加注释：

```scss
@mixin background-variables {
  // 1. 基础背景色
  --bn-bg-color-base: #fff;
  --bn-bg-color-container: #fff;
  --bn-bg-color-secondary: #f5f5f5;
  
  // 2. 状态背景色
  --bn-bg-color-hover: #f5f5f5;
  --bn-bg-color-active: #ddd;
  --bn-bg-color-disabled: #f5f5f5;
  
  // 3. 功能背景色
  --bn-bg-color-primary-base: var(--bn-primary-color-5);
  --bn-bg-color-success-base: var(--bn-success-color-5);
  
  // 4. 特殊背景色
  --bn-bg-color-mask: rgb(0 0 0 / 50%);
  --bn-bg-color-overlay: rgb(0 0 0 / 50%);
}
```

### 5.3 Mixin 注释

每个 Mixin 应添加注释说明其用途和参数：

```scss
// 生成色板颜色变量
// @param {String} $name - 色板名称 (如 primary, success 等)
// @param {Map} $palette - 色板颜色映射
// @param {String} $prefix - CSS 变量前缀，默认为 'bn'
@mixin generate-palette-rgb-color-vars($name, $palette, $prefix: 'bn') {
  @each $level, $color in $palette {
    $color-var-name: --#{$prefix}-#{$name}-color-#{$level};
    #{$color-var-name}: rgb(var(--#{$prefix}-#{$name}-inner-#{$level}));
  }
}
```

### 5.4 函数注释

每个函数应添加注释说明其用途、参数和返回值：

```scss
// 将十六进制颜色转换为 RGB 格式
// @param {String} $hex - 十六进制颜色值（如 #ffffff）
// @return {Map} - 包含 r, g, b 三个键值的映射
@function hex-to-rgb($hex) {
  // 函数实现
}
```

---

## 六、变量分组规范

### 6.1 分组原则

在文件内部，变量应按照以下顺序分组：

1. **基础变量**：最基础的、不依赖其他变量的变量
2. **状态变量**：表示不同状态的变量（hover, active, disabled 等）
3. **功能变量**：具有特定功能的变量（primary, success, warning 等）
4. **特殊变量**：特殊用途的变量（mask, overlay, backdrop 等）
5. **组合变量**：由其他变量组合而成的变量

### 6.2 分组示例

#### 背景变量分组
```scss
@mixin background-variables {
  // 1. 基础背景色
  --bn-bg-color-base: #fff;
  --bn-bg-color-container: #fff;
  --bn-bg-color-secondary: #f5f5f5;
  --bn-bg-color-tertiary: #ebebeb;
  --bn-bg-color-inverse: #000;

  // 2. 状态背景色
  --bn-bg-color-hover: #f5f5f5;
  --bn-bg-color-active: #ddd;
  --bn-bg-color-selected: #3a3a3a;
  --bn-bg-color-disabled: #f5f5f5;

  // 3. 功能背景色 - 主色
  --bn-bg-color-primary-base: var(--bn-primary-color-5);
  --bn-bg-color-primary-soft: rgba(var(--bn-primary-inner-5), 0.2);
  --bn-bg-color-primary-hover: var(--bn-primary-color-4);
  --bn-bg-color-primary-active: var(--bn-primary-color-6);

  // 4. 功能背景色 - 成功色
  --bn-bg-color-success-base: var(--bn-success-color-5);
  --bn-bg-color-success-soft: rgba(var(--bn-success-inner-5), 0.2);
  --bn-bg-color-success-hover: var(--bn-success-color-4);
  --bn-bg-color-success-active: var(--bn-success-color-6);

  // 5. 特殊背景色
  --bn-bg-color-mask: rgb(0 0 0 / 50%);
  --bn-bg-color-overlay: rgb(0 0 0 / 50%);
  --bn-bg-color-backdrop: rgb(0 0 0 / 50%);
}
```

#### 文本变量分组
```scss
@mixin text-variables {
  // 1. 基础文本色
  --bn-text-color-base: #666;
  --bn-text-color-secondary: #999;
  --bn-text-color-tertiary: #ccc;

  // 2. 功能文本色 - 主色
  --bn-text-color-primary-base: var(--bn-primary-color-5);
  --bn-text-color-primary-hover: var(--bn-primary-color-4);
  --bn-text-color-primary-active: var(--bn-primary-color-6);

  // 3. 功能文本色 - 成功色
  --bn-text-color-success-base: var(--bn-success-color-5);
  --bn-text-color-success-hover: var(--bn-success-color-4);
  --bn-text-color-success-active: var(--bn-success-color-6);

  // 4. 状态文本色
  --bn-text-color-disabled: rgb(0 0 0 / 25%);
  --bn-text-color-inverse: rgb(255 255 255 / 85%);
  --bn-text-color-link: var(--bn-primary-color-5);

  // 5. 特殊文本色
  --bn-text-color-title: rgb(0 0 0 / 85%);
  --bn-text-color-subtitle: rgb(0 0 0 / 65%);
  --bn-text-color-caption: rgb(0 0 0 / 45%);
}
```

### 6.3 分组编号规则

使用编号注释标识不同分组：

```scss
// 1. 基础变量
// 2. 状态变量
// 3. 功能变量
// 4. 特殊变量
// 5. 组合变量
```

---

## 七、最佳实践

### 7.1 命名一致性

保持命名的一致性，避免使用同义词：

```scss
// ✅ 推荐：统一使用 color
--bn-bg-color-base
--bn-text-color-base
--bn-border-color-base

// ❌ 不推荐：混用 color 和 coloration
--bn-bg-color-base
--bn-text-coloration-base
--bn-border-color-base
```

### 7.2 避免缩写

除非是广泛接受的缩写，否则避免使用缩写：

```scss
// ✅ 推荐：使用完整单词
--bn-bg-color-background
--bn-text-color-placeholder

// ❌ 不推荐：使用不常见的缩写
--bn-bg-color-bg
--bn-text-color-ph
```

### 7.3 使用 CSS 变量引用

充分利用 CSS 变量的引用特性：

```scss
// ✅ 推荐：使用变量引用
--bn-bg-color-primary-base: var(--bn-primary-color-5);
--bn-bg-color-primary-hover: var(--bn-primary-color-4);

// ❌ 不推荐：重复定义
--bn-bg-color-primary-base: #1890ff;
--bn-bg-color-primary-hover: #40a9ff;
```

### 7.4 暗色模式变量

暗色模式变量使用 `-dark` 后缀：

```scss
// 亮色模式
@mixin background-variables {
  --bn-bg-color-base: #fff;
}

// 暗色模式
@mixin background-variables-dark {
  --bn-bg-color-base: #121212;
}
```

### 7.5 语义化命名

使用语义化的变量名，而不是描述具体值：

```scss
// ✅ 推荐：语义化命名
--bn-spacing-md: 16px;
--bn-border-radius-md: 4px;
--bn-transition-duration-normal: 0.3s;

// ❌ 不推荐：描述具体值
--bn-spacing-16px: 16px;
--bn-border-radius-4px: 4px;
--bn-transition-duration-300ms: 0.3s;
```

---

## 八、检查清单

在创建或修改主题变量文件时，请检查以下项目：

### 8.1 文件命名
- [ ] 文件名使用小写字母和连字符
- [ ] 文件名包含正确的后缀（`-variables`, `-functions`, `-mixins`, `-palette`）
- [ ] 文件名清晰表达文件内容

### 8.2 变量命名
- [ ] 变量名以 `--bn-` 开头
- [ ] 变量名使用小写字母和连字符
- [ ] 变量名遵循 `{category}-{type}-{state}-{variant}` 格式
- [ ] 变量名语义清晰

### 8.3 Mixin 命名
- [ ] Mixin 名使用小写字母和连字符
- [ ] Mixin 名遵循 `{category}-{action}` 格式
- [ ] Mixin 参数有清晰的注释

### 8.4 函数命名
- [ ] 函数名使用小写字母和连字符
- [ ] 函数名遵循 `{category}-{action}` 格式
- [ ] 函数有清晰的注释说明参数和返回值

### 8.5 文件注释
- [ ] 文件有清晰的文件头注释
- [ ] 变量按逻辑分组并添加分组注释
- [ ] Mixin 和函数有详细的注释说明

### 8.6 变量分组
- [ ] 变量按基础、状态、功能、特殊、组合的顺序分组
- [ ] 每个分组有清晰的编号注释
- [ ] 同一分组内的变量保持一致的命名模式

---

## 九、附录

### 9.1 常用类别前缀

| 前缀 | 说明 | 示例 |
|------|------|------|
| `bg` | 背景 | `--bn-bg-color-base` |
| `text` | 文本 | `--bn-text-color-base` |
| `border` | 边框 | `--bn-border-color-base` |
| `spacing` | 间距 | `--bn-spacing-md` |
| `margin` | 外边距 | `--bn-margin-md` |
| `padding` | 内边距 | `--bn-padding-md` |
| `shadow` | 阴影 | `--bn-shadow-md` |
| `transition` | 过渡 | `--bn-transition-duration-normal` |
| `animation` | 动画 | `--bn-animation-duration-normal` |
| `font` | 字体 | `--bn-font-size-md` |
| `line-height` | 行高 | `--bn-line-height-base` |
| `grid` | 网格 | `--bn-grid-columns` |
| `responsive` | 响应式 | `--bn-responsive-breakpoint-md` |
| `filter` | 滤镜 | `--bn-filter-blur-md` |
| `ripple` | 波纹 | `--bn-ripple-color` |

### 9.2 常用状态后缀

| 后缀 | 说明 | 示例 |
|------|------|------|
| `base` | 基础状态 | `--bn-bg-color-base` |
| `hover` | 悬停状态 | `--bn-bg-color-hover` |
| `active` | 激活状态 | `--bn-bg-color-active` |
| `disabled` | 禁用状态 | `--bn-bg-color-disabled` |
| `selected` | 选中状态 | `--bn-bg-color-selected` |
| `focus` | 焦点状态 | `--bn-border-color-focus` |
| `inverse` | 反色状态 | `--bn-text-color-inverse` |

### 9.3 常用变体后缀

| 后缀 | 说明 | 示例 |
|------|------|------|
| `soft` | 淡色变体 | `--bn-bg-color-primary-soft` |
| `light` | 浅色变体 | `--bn-border-color-primary-light` |
| `dark` | 深色变体 | `--bn-bg-color-primary-dark` |
| `xs` | 超小 | `--bn-spacing-xs` |
| `sm` | 小 | `--bn-spacing-sm` |
| `md` | 中等 | `--bn-spacing-md` |
| `lg` | 大 | `--bn-spacing-lg` |
| `xl` | 超大 | `--bn-spacing-xl` |
| `xxl` | 特大 | `--bn-spacing-xxl` |

---

## 十、更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2026-01-28 | 初始版本，建立完整的命名规范体系 |

---

## 十一、参考资源

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Sass Documentation](https://sass-lang.com/documentation)
- [BEM Naming Convention](http://getbem.com/)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)

---

**文档维护者：** Proxy Monitor Team  
**最后更新：** 2026-01-28  
**版本：** 1.0.0
