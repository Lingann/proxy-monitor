# 国际化规范 (I18n Rules)

本文件定义了国际化（Internationalization）的处理规范。

## 规则列表

### 1. 禁止硬编码
**规则**: 组件/页面必须使用国际化字符串，不能直接使用中文/英文。
**指南**: 所有用户可见的文本都必须提取到语言包文件中。

**示例**:
```typescript
// Bad
const title = '用户列表';

// Good
import { t } from '@/i18n';
const title = t('user.list.title');
```
