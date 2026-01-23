---
name: css-style-skill
description: CSS 布局、变量命名、主题、样式规范
---

## 技能描述 (Description)

本技能定义了项目中的 CSS 样式编写规范，包括布局方式、CSS 变量命名系统、多主题支持以及整体视觉风格指南。遵循这些规则可以建立一个可维护、可扩展且视觉一致的 UI 系统。

## 核心原则 (Core Principles)

1.  **现代化布局 (Modern Layout)**: 摒弃 float，全面拥抱 Flexbox 和 Grid。
2.  **语义化变量 (Semantic Variables)**: 使用三段式命名法构建清晰的变量系统，通过变量实现主题切换。
3.  **非侵入式交互 (Non-intrusive Interaction)**: 交互效果应细腻、自然，避免破坏页面布局。
4.  **Notion 风格 (Notion-like Style)**: 追求极简、高效、柔和的视觉体验。

## 指南步骤 (Guide)

请根据你的具体开发场景，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **页面布局** | [布局与交互规范](rules/layout-interaction-rules.md) | Grid/Flex 优先、禁止位移交互 |
| **变量定义** | [变量命名规范](rules/variable-naming-rules.md) | 三段式命名、Kebab-case、基于值 vs 基于用途 |
| **主题适配** | [主题规范](rules/theme-rules.md) | 重新定义变量值、避免重复样式代码 |
| **视觉风格** | [风格指南](rules/style-guide.md) | 参考 Notion 风格 |

## 快速检查清单 (Quick Checklist)

- [ ] 是否使用了 Grid 或 Flex 进行布局？
- [ ] hover 效果是否避免了使用 `transform: translate` 或 `margin` 改变位置？
- [ ] CSS 变量名是否遵循 `namespace-type-name` 格式？
- [ ] 颜色变量是否使用了具象化名称（如 `cherry-red`）？
- [ ] 是否通过变量来实现深色模式适配？
- [ ] 整体风格是否符合 Notion 的极简风格？
