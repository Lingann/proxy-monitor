# 命名与结构规范 (Naming & Structure)

本文件定义了 Vue 组件的文件命名和目录结构。

## 规则列表

### 1. 文件命名
**规则**: 
- TSX 文件名必须使用中划线命名（kebab-case），禁止驼峰。
- 文件名应与组件名一致。

**示例**:
- ✅ `user-profile.tsx`
- ❌ `UserProfile.tsx`

### 2. 目录结构
**规则**: 每个组件/页面的代码包含在自身独立的目录中，目录名必须使用中划线命名。
**指南**:
- `components/component-name`
- `views/page-name`

### 3. 类名命名 (BEM)
**规则**: 类名严格遵循 BEM（Block-Element-Modifier）命名规范。
**指南**: 在 TSX 中建议封装 helper 函数处理 BEM 字符串拼接，或者使用 `classnames` 等库。

**示例**:
```tsx
// 假设有一个 bem helper
const b = bem('user-card');

return () => (
  <div class={b()}>
    <div class={b('header')}>Title</div>
    <div class={b('content', { active: true })}>...</div>
  </div>
);
```
