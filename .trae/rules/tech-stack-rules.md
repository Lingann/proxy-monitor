---
alwaysApply: false
description: 
---
@tech-stack-rules

1. 项目采用 TypeScript + Electron + Node.js + PNPM + EJS 作为技术栈。
2. 项目可以根据实际需求，安装其他必要的依赖，但必须是主流、现代、支持 TypeScript 和 ES6 等最新特性的库。
3. 项目中默认包含了以下依赖：
   - `sqlite3`：用于数据库操作。
   - `systeminformation`：用于获取系统信息，如CPU、内存、磁盘、网络等。
   - `execa`: 用于执行系统命令。
4. 禁止使用老旧的版本，始终使用最新的 LTS 版本的依赖。
5. 禁止使用npm、yarn 等包管理工具，必须使用 PNPM 来管理依赖。
