# 通用代码规范 (General Rules)

本文件包含了代码编写的通用风格规范，旨在保持代码的简洁性、可读性和健壮性。

## 规则列表

### 1. 避免过度嵌套
**规则**: 禁止在代码中过度使用嵌套，保持代码的可读性和简洁性。
**指南**: 超过 3 层的嵌套通常意味着逻辑过于复杂，应考虑重构。

**示例**:
```typescript
/* 不推荐 */
if (user) {

  if (user.isActive) {

    if (user.hasPermission) {

      doSomething();

    }

  }

}

/* 推荐 */
if (user && user.isActive && user.hasPermission) {

  doSomething();

}
```

### 2. 优先使用卫语句 (Guard Clauses)
**规则**: 优先使用卫语句来处理边界情况，避免使用嵌套的 if 语句。
**指南**: 先处理异常或无效情况并返回，让主逻辑处于最外层。

**示例**:
```typescript
/* 不推荐 */
function processUser(user: User) {

  if (user) {

    // ... long logic ...

  } else {

    throw new Error('Invalid user');

  }

}

/* 推荐 */
function processUser(user: User) {

  if (!user) {

    throw new Error('Invalid user');

  }

  /* ... long logic ... */

}
```

### 3. 使用提前返回 (Early Returns)
**规则**: 使用提前返回来处理简单的情况，避免使用复杂的嵌套结构。

**示例**:
```typescript
/* 不推荐 */
function getDiscount(price: number) {

  let discount = 0;

  if (price > 100) {

    discount = 10;

  }

  return discount;

}

/* 推荐 */
function getDiscount(price: number) {

  if (price > 100) {

    return 10;

  }

  return 0;

}
```

### 4. 保持循环简洁
**规则**: 避免在循环中使用复杂的逻辑，保持循环的简洁性。
**指南**: 如果循环体过长，应将其提取为单独的函数。

**示例**:
```typescript
/* 不推荐 */
for (const item of items) {

  /* ... 50 lines of logic ... */

}

/* 推荐 */
for (const item of items) {

  processItem(item);

}
```

### 5. 及时清理资源
**规则**: 及时清理不再需要的变量和资源，避免内存泄漏。
**指南**: 尤其是在使用定时器、事件监听器或创建大型对象时。

**示例**:
```typescript
/* 推荐 */
onUnmounted(() => {

  clearInterval(timer);

  window.removeEventListener('resize', handleResize);

});
```

### 6. 不考虑向后兼容
**规则**: 不用考虑向后兼容，保持代码的简洁性和可维护性。
**指南**: 始终针对最新的环境和依赖版本编写代码，除非有明确的特定需求。

### 7. 单行语句优先
**规则**: 单行语句优先于多行语句，保持代码的简洁性。例如判断语句、赋值语句等。

**示例**:
```typescript
/* 不推荐 */
let isValid;

if (value > 0) {

  isValid = true;

} else {

  isValid = false;

}

/* 推荐 */
const isValid = value > 0;
```

### 8. 慎用 try-catch
**规则**: 能不用 try-catch 就不要用，保持代码的简洁性。
**指南**: 优先通过逻辑检查来预防错误，而不是捕获错误。只在处理不可控的外部错误（如网络请求、文件 I/O）时使用。

### 9. 禁止使用未定义变量
**规则**: 禁止在赋值前使用未定义的变量或函数，必须先定义后使用。
**指南**: TypeScript 的编译器通常会捕获此类错误，但要注意逻辑顺序。

### 10. 禁止使用 any
**规则**: 禁止使用 `any` 类型，必须使用具体类型或泛型。
**指南**: 如果类型不确定，使用 `unknown` 并配合类型守卫，或者定义明确的接口/类型。

**示例**:
```typescript
/* 不推荐 */
function process(data: any) {

  console.log(data.id);

}

/* 推荐 */
function process(data: { id: number } | unknown) {

  if (typeof data === 'object' && data !== null && 'id' in data) {

    /* ... */

  }

}
```

### 11. 代码留白
**规则**: 一行代码都加一行空格，尤其调用函数、重要的执行、判断、变量定义等。
**指南**: 适当的空行可以起到分段的作用，提高代码的可读性。

**示例**:
```typescript
/* 不推荐 */
const a=1;
const b=2;
if(a>b){
doSomething();
}

/* 推荐 */
const a = 1;

const b = 2;

if (a > b) {

  doSomething();

}
```
