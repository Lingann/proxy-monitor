# 技术栈定义 (Stack Definition)

本文件定义了项目的核心技术栈和预置依赖。

## 规则列表

### 1. 核心技术栈
**规则**: 项目采用 TypeScript + Electron + Node.js + PNPM + EJS 作为技术栈。
**指南**: 
- **语言**: TypeScript (必须严格类型)
- **运行时**: Electron (主进程 + 渲染进程), Node.js
- **包管理**: PNPM
- **模板引擎**: EJS (用于生成部分动态内容)

### 2. 默认依赖
**规则**: 项目中默认包含了以下核心依赖，应优先使用它们而不是引入新的替代品。
**列表**:
- `sqlite3`：用于本地数据库操作。
- `systeminformation`：用于获取系统信息，如 CPU、内存、磁盘、网络等。
- `execa`: 用于执行系统命令（比 child_process 更易用）。

**示例**:
```typescript
// Good: 使用已有的 execa
import { execa } from 'execa';
const { stdout } = await execa('echo', ['hello']);

// Bad: 引入 shelljs 等功能重叠的库
```
