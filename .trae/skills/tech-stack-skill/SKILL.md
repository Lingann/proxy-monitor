---
name: tech-stack-skill
description: 项目技术栈、依赖管理、版本控制规范
---

## 技能描述 (Description)

本技能定义了项目的技术选型和依赖管理策略。明确的技术栈有助于统一开发环境，减少集成问题；规范的依赖管理能确保项目的长期健康和安全性。

## 核心原则 (Core Principles)

1.  **现代化 (Modern)**: 坚持使用现代 Web 技术（ES6+, TypeScript）。
2.  **标准化 (Standardized)**: 统一使用 PNPM，统一核心库（sqlite3, systeminformation, execa）。
3.  **高质量 (High Quality)**: 只引入维护良好、类型支持完善的第三方库。

## 指南步骤 (Guide)

请根据你的具体操作，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **了解项目** | [技术栈定义](rules/stack-definition.md) | TS + Electron + PNPM |
| **安装/升级依赖** | [依赖管理规范](rules/dependency-management.md) | 必须使用 PNPM、优选主流 TS 库 |

## 使用场景举例 (Usage Examples)

| 场景 | 行为 |
| :--- | :--- |
| **需要执行系统命令** | 使用 `execa` 库，而不是 `child_process`，以获得更好的跨平台支持和 Promise 接口。 |
| **需要获取系统信息** | 使用 `systeminformation` 库，而不是自己解析命令行输出。 |
| **安装新的依赖包** | 运行 `pnpm add <package-name>`，禁止使用 `npm install` 或 `yarn add`。 |
| **选择数据库方案** | 优先考虑 `sqlite3`，除非有明确的大型数据库需求。 |

## 快速检查清单 (Quick Checklist)

- [ ] 我是否使用了 `pnpm` 而不是 `npm` 或 `yarn`？
- [ ] 我引入的新库是否支持 TypeScript？
- [ ] 我引入的新库是否在最近一年内有更新？
- [ ] 我是否重复引入了功能已由 `execa` 或 `systeminformation` 提供的库？
