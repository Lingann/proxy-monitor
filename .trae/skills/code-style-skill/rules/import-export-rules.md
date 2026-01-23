# 导入导出规范 (Import/Export Rules)

本文件包含了模块导入和导出的规范，旨在保证模块依赖关系的清晰和正确。

## 规则列表

### 1. 禁止使用未导入变量
**规则**: 禁止未 import 就使用的变量或函数，必须先 import 后使用，并且注意检查。
**指南**: 依赖编辑器的自动导入功能时要小心，确保生成的 import 语句是正确的（例如文件扩展名、路径）。

### 2. 禁止重复导出
**规则**: 禁止重复导出，比如在 `index.ts` 中导出了某个模块，那么在其他模块中就不应该再导出该模块。
**指南**: 保持单一的导出入口，避免循环依赖和混淆。

### 3. 目录模块导出
**规则**: 每个目录模块下，都必须有存在一个 `index.ts` 文件，用于导出该目录下的所有模块。
**指南**: 这使得引入该目录下的功能更加方便，结构更清晰。

**示例**:
目录结构：
```
utils/
  ├── index.ts
  ├── string-utils.ts
  └── date-utils.ts
```

`utils/index.ts`:
```typescript
export * from './string-utils.js';
export * from './date-utils.js';
```

引用时：
```typescript
import { formatDate } from './utils/index.js'; // 或者 ./utils
```

### 4. 禁止 CommonJS
**规则**: 禁止使用 CommonJS 模块，项目只能使用 ES6 模块规范。
**指南**: 使用 `import` / `export`，禁止使用 `require` / `module.exports`。

**示例**:
```typescript
// Bad
const fs = require('fs');

// Good
import fs from 'fs';
```
