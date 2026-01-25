---
name: page-layout-skill
description: 页面视图布局规范：容器宽度、CSS变量、主题适配、响应式设计
---

# 页面布局技能 (Page Layout Skill)

## 技能描述 (Description)

本技能定义了页面视图（views/）的布局规范，包括容器宽度、CSS 变量使用、主题适配、响应式设计等核心要点，确保所有页面视图保持一致的布局风格和主题支持。

## 1. 容器宽度与自适应 (Container Width & Responsive)

### 核心原则
* **严禁设置最大宽度**：页面视图的主容器（`.container`）严禁设置 `max-width`，必须允许内容自适应窗口宽度，充分利用屏幕空间。
* **全屏自适应**：页面内容应随窗口大小自动调整，提供更好的空间利用率。

### 标准容器样式
```scss
.container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
```

### 参考实现
* 参考文件：`src/renderer/views/monitor/monitor.module.scss`
* 反例：设置了 `max-width: 800px` 的容器（已废弃）

## 2. CSS 变量与主题适配 (CSS Variables & Theme)

### 强制要求
* **严禁硬编码颜色**：所有颜色值必须使用 CSS 变量，严禁使用硬编码颜色（如 `#ffffff`、`#1a1a1a`、`rgb()`、`rgba()` 等）。
* **全局变量定义**：所有主题变量定义在 `src/renderer/app-styles.css` 中。

### 全局主题变量清单

#### 背景色
* `--bg-primary`：主背景色（页面背景）
  * 亮色：`#ffffff`
  * 暗色：`#1a1a1a`
* `--bg-secondary`：次级背景色（卡片、面板）
  * 亮色：`#f7f7f5`
  * 暗色：`#2d2d2d`

#### 文本色
* `--text-primary`：主文本色
  * 亮色：`#37352f`
  * 暗色：`#e3e3e3`
* `--text-secondary`：次要文本色（标签、提示、禁用状态）
  * 亮色：`#787774`
  * 暗色：`#9a9a9a`

#### 边框与交互
* `--border-color`：边框颜色
  * 亮色：`#e9e9e8`
  * 暗色：`#404040`
* `--hover-bg`：悬停背景色
  * 亮色：`#eef3f5`
  * 暗色：`#383838`

### 暗色模式适配
* 所有样式必须通过 CSS 变量自动适配 `[data-theme="dark"]` 暗色主题。
* 严禁在样式中硬编码颜色值，确保主题切换时所有元素正确显示。

## 3. 卡片与内容区样式 (Card & Content Styles)

### ⚠️ 禁止卡片包裹样式
**重要**：页面内容区域严禁使用带背景和边框的卡片包裹样式，这种设计过于笨重，影响视觉简洁性。

**❌ 禁止 - 不要用卡片包裹整个内容**
```scss
.card {
  background: var(--bg-secondary);  /* 禁止 */
  border: 1px solid var(--border-color);  /* 禁止 */
  border-radius: 8px;  /* 禁止 */
  padding: 24px;  /* 禁止 */
}
```

**✅ 正确 - 简洁布局**
```scss
.card {
  // 不添加背景和边框包裹
}

.section {
  margin-bottom: 32px;
  // 不添加 padding、background、border
}
```

### 特定组件的卡片样式
仅在特定的独立组件中使用卡片样式：

```scss
/* 统计卡片 - 允许 */
.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}

/* 图表区块 - 允许 */
.chart-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}

/* 表格容器 - 允许 */
.table-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}
```

### 标题样式
```scss
.title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: var(--text-primary);
}
```

## 4. 交互元素颜色规范 (Interactive Elements)

### 按钮样式

#### 主按钮
```scss
.btn-primary {
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

#### 次要按钮
```scss
.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--hover-bg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 状态徽章

#### 启用/成功状态
```scss
.badge-enabled {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(72, 187, 120, 0.15);
  color: #48bb78;
}
```

#### 禁用/中性状态
```scss
.badge-disabled {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
```

### 消息提示

#### 成功消息
```scss
.message-success {
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  background: rgba(72, 187, 120, 0.1);
  color: #48bb78;
  border: 1px solid #48bb78;
}
```

#### 错误消息
```scss
.message-error {
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
  border: 1px solid #f56565;
}
```

## 5. 间距规范 (Spacing Standards)

### 页面级间距
* 页面容器内边距：`padding: 20px`
* 卡片内边距：`padding: 24px`

### 组件级间距
* 表单组之间：`margin-bottom: 24px`
* 区块之间：`margin-bottom: 32px`
* 操作按钮组：`gap: 12px`
* 小型元素组：`gap: 8px`
* 大型元素组：`gap: 16px`

### 文本间距
* 标题下间距：`margin-bottom: 24px`
* 标签下间距：`margin-bottom: 8px`
* 提示文本上间距：`margin-top: 6px`

## 6. 布局模式 (Layout Patterns)

### Flexbox 布局
* **水平排列**：`display: flex; align-items: center; gap: 12px;`
* **两端对齐**：`display: flex; justify-content: space-between; align-items: center;`
* **垂直排列**：`display: flex; flex-direction: column; gap: 16px;`

### Grid 布局
```scss
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
```

### 响应式要点
* 优先使用 Flexbox 或 Grid 布局，严禁使用 float 或 inline-block。
* 确保内容自适应窗口大小，避免固定宽度导致的布局问题。
* 使用 `overflow-y: auto` 处理内容溢出。

## 7. 文本与字体 (Typography)

### 标题层级
* H1（页面标题）：`font-size: 24px; font-weight: 600;`
* H2（区块标题）：`font-size: 16px; font-weight: 500;`
* H3（小标题）：`font-size: 14px; font-weight: 500;`

### 正文文本
* 正文：`font-size: 14px; color: var(--text-primary);`
* 辅助文本：`font-size: 12px; color: var(--text-secondary);`
* 标签：`font-size: 14px; color: var(--text-primary);`

### 字体系列
使用全局字体定义：
```css
font-family: var(--font-family);
/* -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif */
```

## 8. 完整示例 (Complete Example)

### 页面视图完整样式示例
```scss
/* 容器：无宽度限制，全屏自适应 */
.container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

/* 卡片：不使用包裹样式 */
.card {
  // 移除多余的边框和背景包裹
}

/* 标题 */
.title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: var(--text-primary);
}

/* 状态区块：简洁布局 */
.status-section {
  margin-bottom: 32px;
}

/* 状态行 */
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 特定组件的卡片样式 - 仅在需要时使用 */
.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}

.chart-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
}

/* 表单组 */
.form-group {
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
  }
}

/* 提示文本 */
.hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 操作按钮组 */
.actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

/* 主按钮 */
.btn-primary {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--text-primary);
  color: var(--bg-primary);

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## 9. 检查清单 (Checklist)

在创建或更新页面视图时，请确保：

- [ ] 容器未设置 `max-width`
- [ ] 所有颜色使用 CSS 变量，无硬编码颜色
- [ ] 样式在亮色和暗色模式下都正确显示
- [ ] 使用 Flexbox 或 Grid 布局，无 float 或 inline-block
- [ ] 间距符合规范（20px/24px/32px）
- [ ] 按钮使用 `var(--text-primary)` 和 `var(--bg-primary)`
- [ ] 状态徽章使用半透明背景
- [ ] 提示文本使用 `var(--text-secondary)`
- [ ] 边框使用 `var(--border-color)`
- [ ] 悬停效果使用 `var(--hover-bg)` 或 `opacity`
- [ ] **页面内容区域不使用卡片包裹样式（无背景、边框、padding 包裹）**
- [ ] **仅在特定组件（统计卡片、图表区块）中使用卡片样式**

## 10. 参考文件 (References)

* 全局样式定义：`src/renderer/app-styles.css`
* 参考实现（网络监控）：`src/renderer/views/monitor/monitor.module.scss`
* 参考实现（系统代理）：`src/renderer/views/system-proxy/system-proxy.module.scss`
* 参考实现（设置页面）：`src/renderer/views/settings/settings.module.scss`
