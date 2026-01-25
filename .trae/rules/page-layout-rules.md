# 页面布局规则 (Page Layout Rules)

## 规则概述

本规则定义了页面视图（views/）的布局核心约束，确保所有页面保持一致的布局风格、主题支持和响应式设计。

## 1. 容器宽度约束

### 规则 1.1：禁止设置最大宽度
* **要求**：页面视图的主容器（`.container`）**严禁**设置 `max-width`。
* **原因**：限制宽度会浪费屏幕空间，降低用户体验。
* **正确做法**：让内容自适应窗口宽度。

**✅ 正确示例**
```scss
.container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
```

**❌ 错误示例**
```scss
.container {
  padding: 20px;
  max-width: 800px;  /* 严禁使用 */
  margin: 0 auto;
}
```

## 2. 颜色使用约束

### 规则 2.1：强制使用 CSS 变量
* **要求**：所有颜色值**必须**使用 CSS 变量，**严禁**硬编码颜色。
* **禁止**：`#ffffff`、`#1a1a1a`、`rgb()`、`rgba()` 等硬编码颜色。
* **允许**：状态颜色（成功/错误）可使用半透明颜色，但必须搭配透明度。

**✅ 正确示例**
```scss
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.badge-success {
  background: rgba(72, 187, 120, 0.15);  /* 状态颜色允许 */
  color: #48bb78;
}
```

**❌ 错误示例**
```scss
.card {
  background: #ffffff;  /* 严禁硬编码 */
  border: 1px solid #e9e9e8;  /* 严禁硬编码 */
  color: #1a1a1a;  /* 严禁硬编码 */
}

.section {
  background: #f8fafc;  /* 严禁硬编码 */
}
```

### 规则 2.2：必须使用的全局变量
所有页面必须使用以下全局主题变量：

| 变量名 | 用途 | 亮色值 | 暗色值 |
|--------|------|--------|--------|
| `--bg-primary` | 主背景色 | `#ffffff` | `#1a1a1a` |
| `--bg-secondary` | 次级背景色（卡片） | `#f7f7f5` | `#2d2d2d` |
| `--text-primary` | 主文本色 | `#37352f` | `#e3e3e3` |
| `--text-secondary` | 次要文本色 | `#787774` | `#9a9a9a` |
| `--border-color` | 边框颜色 | `#e9e9e8` | `#404040` |
| `--hover-bg` | 悬停背景色 | `#eef3f5` | `#383838` |

## 3. 主题适配约束

### 规则 3.1：必须支持暗色模式
* **要求**：所有样式必须通过 CSS 变量自动适配 `[data-theme="dark"]` 暗色主题。
* **测试**：必须在亮色和暗色模式下测试所有页面，确保显示正确。

### 规则 3.2：禁止主题硬编码
* **禁止**：在样式中硬编码特定主题的颜色值。
* **要求**：所有颜色必须通过 CSS 变量定义，确保主题切换时自动更新。

## 4. 布局模式约束

### 规则 4.1：禁止过时布局方式
* **禁止**：使用 `float` 或 `inline-block` 进行布局。
* **要求**：优先使用 Flexbox 或 Grid 布局。

**✅ 正确示例**
```scss
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
```

**❌ 错误示例**
```scss
.status-row {
  float: left;  /* 严禁使用 */
}

.item {
  display: inline-block;  /* 严禁使用 */
}
```

## 5. 间距规范约束

### 规则 5.1：标准间距值
必须使用以下标准间距值：

| 用途 | 间距值 |
|------|--------|
| 页面容器内边距 | `padding: 20px` |
| 卡片内边距 | `padding: 24px` |
| 表单组之间 | `margin-bottom: 24px` |
| 区块之间 | `margin-bottom: 32px` |
| 操作按钮组 | `gap: 12px` |
| 小型元素组 | `gap: 8px` |
| 大型元素组 | `gap: 16px` |
| 标题下间距 | `margin-bottom: 24px` |
| 标签下间距 | `margin-bottom: 8px` |
| 提示文本上间距 | `margin-top: 6px` |

### 规则 5.2：禁止随意间距
* **禁止**：使用非标准间距值（如 `padding: 15px`、`gap: 10px` 等）。
* **要求**：必须使用规范中定义的标准间距值。

## 6. 按钮样式约束

### 规则 6.1：主按钮样式
主按钮必须使用以下样式：

```scss
.btn-primary {
  background: var(--text-primary);  /* 必须 */
  color: var(--bg-primary);  /* 必须 */
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;  /* 使用透明度变化 */
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 规则 6.2：次要按钮样式
次要按钮必须使用以下样式：

```scss
.btn-secondary {
  background: var(--bg-primary);  /* 必须 */
  color: var(--text-primary);  /* 必须 */
  border: 1px solid var(--border-color);  /* 必须 */
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--hover-bg);  /* 必须 */
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## 7. 状态徽章约束

### 规则 7.1：启用/成功状态
```scss
.badge-enabled {
  background: rgba(72, 187, 120, 0.15);  /* 半透明绿色 */
  color: #48bb78;  /* 绿色文本 */
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
```

### 规则 7.2：禁用/中性状态
```scss
.badge-disabled {
  background: var(--bg-primary);  /* 必须使用变量 */
  color: var(--text-secondary);  /* 必须使用变量 */
  border: 1px solid var(--border-color);  /* 必须使用变量 */
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
```

## 8. 消息提示约束

### 规则 8.1：成功消息
```scss
.message-success {
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
  border: 1px solid #48bb78;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}
```

### 规则 8.2：错误消息
```scss
.message-error {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border: 1px solid #f56565;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}
```

## 9. 卡片与区块约束

### 规则 9.1：禁止使用卡片包裹样式
* **禁止**：使用带背景色和边框的卡片样式包裹整个页面内容。
* **原因**：这种设计过于笨重，影响视觉简洁性，布局风格不统一。
* **要求**：页面内容应直接展示，不使用多余的背景和边框包裹。

**❌ 错误示例 - 禁止使用**
```scss
.card {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--border-color);
}
```

**✅ 正确示例 - 简洁布局**
```scss
.card {
  // 不添加背景和边框包裹
}

.statusSection {
  margin-bottom: 32px;
  // 不添加 padding、background、border
}
```

### 规则 9.2：特定组件可使用卡片样式
* **允许场景**：仅在特定的卡片组件（如统计卡片、图表区块）中使用背景和边框。
* **禁止场景**：整个页面内容区域、表单区块、设置项区域等不应使用卡片包裹。

**✅ 允许的卡片样式（特定组件）**
```scss
.stat-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

.chart-section {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border-color);
}
```

### 规则 9.3：禁止使用阴影
* **禁止**：使用 `box-shadow` 作为卡片样式。
* **要求**：如需使用边框，必须使用 `border` 代替阴影，确保在暗色模式下显示正确。

**❌ 错误示例**
```scss
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* 严禁使用 */
}
```

## 10. 文本样式约束

### 规则 10.1：标题层级
```scss
/* H1 - 页面标题 */
.title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);  /* 必须 */
  margin: 0 0 24px 0;
}

/* H2 - 区块标题 */
.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);  /* 必须 */
}

/* H3 - 小标题 */
.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);  /* 必须 */
}
```

### 规则 10.2：辅助文本
```scss
.hint {
  font-size: 12px;
  color: var(--text-secondary);  /* 必须 */
  line-height: 1.5;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);  /* 必须 */
}
```

## 11. 违规检查清单

创建或更新页面视图时，必须通过以下检查：

### 容器与布局
- [ ] 容器未设置 `max-width`
- [ ] 使用 Flexbox 或 Grid 布局，无 `float` 或 `inline-block`
- [ ] 容器内边距为 `padding: 20px`
- [ ] 页面内容区域不使用卡片包裹样式（无背景、边框、padding 包裹）

### 颜色与主题
- [ ] 所有颜色使用 CSS 变量，无硬编码颜色（除状态颜色）
- [ ] 样式在亮色和暗色模式下都正确显示
- [ ] 仅特定组件（统计卡片、图表）使用卡片样式，无 `box-shadow`

### 按钮与交互
- [ ] 主按钮使用 `var(--text-primary)` 背景和 `var(--bg-primary)` 文本
- [ ] 次要按钮使用 `var(--bg-primary)` 背景和 `border`
- [ ] 悬停效果使用 `var(--hover-bg)` 或 `opacity`

### 文本与间距
- [ ] 标题使用 `var(--text-primary)`
- [ ] 辅助文本使用 `var(--text-secondary)`
- [ ] 间距符合规范（20px/24px/32px）
- [ ] 表单组之间间距为 `24px`
- [ ] 操作按钮组 `gap: 12px`

### 状态与消息
- [ ] 启用徽章使用半透明绿色背景
- [ ] 禁用徽章使用 `var(--bg-primary)` 和 `border`
- [ ] 成功/错误消息使用半透明背景

## 12. 参考资源

* 全局样式定义：`src/renderer/app-styles.css`
* 标准实现（网络监控）：`src/renderer/views/monitor/monitor.module.scss`
* 标准实现（系统代理）：`src/renderer/views/system-proxy/system-proxy.module.scss`

## 13. 规则更新历史

* 2026-01-25：创建页面布局规则文档
