# 文件与目录命名规范 (File & Directory Naming)

本文件定义了文件和目录的命名格式。

## 规则列表

### 1. Kebab-case
**规则**: 所有文件名称和目录名称必须采用小写字母，单词之间用短横线分隔（kebab-case）。
**指南**: 禁止使用 CamelCase、PascalCase 或 snake_case。

**示例**:
- ✅ `user-profile.ts`
- ❌ `UserProfile.ts`
- ❌ `user_profile.ts`

### 2. 描述性命名
**规则**: 文件名称/目录名称必须直观，能够清晰地表达其功能或内容，避免简写或过于概况。
**指南**: 
- 不应该使用 `utils.ts` 或 `helpers.ts` 等通用名称，应该根据功能进行命名，例如：`get-ip-utility.ts`。
- 不应该使用 `config.ts` 或 `settings.ts` 等通用名称，应该根据功能进行命名，例如：`analysis-config.ts`。

### 3. 避免单单词
**规则**: 除了 `index.ts` 文件外，其他文件避免使用一个单词作为文件名，应该根据功能进行命名。
**指南**: 至少包含两个单词（动词+名词，或 名词+类型）。

**示例**:
- ✅ `format-date.ts`
- ❌ `date.ts`
