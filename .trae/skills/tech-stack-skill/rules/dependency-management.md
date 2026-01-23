# 依赖管理规范 (Dependency Management)

本文件定义了引入和管理第三方依赖的规范。

## 规则列表

### 1. 包管理器
**规则**: 禁止使用 `npm`、`yarn` 等包管理工具，必须使用 `PNPM` 来管理依赖。
**指南**: PNPM 的硬链接机制能节省磁盘空间并提高安装速度，且能严格控制幽灵依赖。

**命令**:
```bash
# Good
pnpm install lodash
pnpm add -D @types/lodash

# Bad
npm install lodash
yarn add lodash
```

### 2. 依赖选择
**规则**: 项目可以根据实际需求，安装其他必要的依赖，但必须是主流、现代、支持 TypeScript 和 ES6 等最新特性的库。
**指南**:
- 检查 npm 周下载量。
- 检查 GitHub Stars 和最近更新时间。
- 检查是否自带 `d.ts` 类型定义或有 `@types/xxx` 包。

### 3. 版本控制
**规则**: 禁止使用老旧的版本，始终使用最新的 LTS 版本的依赖。
**指南**: 定期检查依赖更新，保持项目处于较新的状态以获得性能提升和安全补丁。
