# 命名规范 (Naming Conventions)

本文件定义了 JS/TS 开发中的类名命名规范。

## 规则列表

### 1. BEM 命名法
**规则**: 类名严格遵循 BEM（Block-Element-Modifier）命名规范。
**指南**:
- **Block**: 独立的实体（如 `menu`）。
- **Element**: Block 的一部分（如 `menu__item`）。
- **Modifier**: Block 或 Element 的变体（如 `menu__item--active`）。

**示例**:
```html
<div class="user-card">
  <img class="user-card__avatar" src="..." />
  <h3 class="user-card__name">John Doe</h3>
  <button class="user-card__button user-card__button--primary">Follow</button>
</div>
```
