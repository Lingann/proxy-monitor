# Wave 涟漪效果组件

## 组件介绍

Wave是一个轻量级的涟漪效果组件，用于为按钮等交互元素添加点击涟漪动画效果。该组件采用函数式编程范式，具有高度的可复用性和类型安全性。

## 特性

- 🎨 可自定义涟漪颜色和动画时长
- 🔄 支持动态启用/禁用
- 📦 零依赖，轻量级实现
- 🎯 精确的点击位置计算
- 🎭 优雅的动画过渡效果
- 📱 响应式设计，适配各种尺寸

## 安装

```bash
pnpm add @blancnova/wave
```

## 使用示例

### 基础用法

```vue
<template>
  <button class="my-button">
    点击我
    <inner-ripple-effect
      :enabled="true"
      :options="{
        color: 'rgba(255, 255, 255, 0.35)',
        duration: 400
      }"
      @click="handleClick"
    />
  </button>
</template>

<script setup lang="ts">
import { InnerRippleEffect } from '@blancnova/wave'

const handleClick = (event: MouseEvent) => {
  // 处理点击事件
}
</script>

<style scoped>
.my-button {
  position: relative;
  /* 其他按钮样式 */
}
</style>
```

### 自定义配置

```typescript
// 涟漪效果配置选项
interface RippleEffectOptions {

  /** 动画持续时间(ms) */
  duration?: number

  /** 涟漪颜色 */
  color?: string

  /** 最大缩放比例 */
  maxScale?: number
}

// 组件属性
interface RippleEffectProps {

  /** 是否启用涟漪效果 */
  enabled?: boolean

  /** 特效选项 */
  options?: RippleEffectOptions

  /** 点击事件 */
  onClick?: (event: MouseEvent) => void
}
```

### 高级用法

```vue
<template>
  <div class="interactive-element">
    <inner-ripple-effect
      :enabled="isEnabled"
      :options="rippleOptions"
      @click="handleRipple"
    />
  </div>
</template>

<script setup lang="ts">
import type { RippleEffectOptions } from '@blancnova/wave'
import { InnerRippleEffect } from '@blancnova/wave'
import { ref } from 'vue'

// 控制涟漪效果开关
const isEnabled = ref(true)

// 自定义涟漪配置
const rippleOptions: RippleEffectOptions = {
  duration: 600,
  color: 'rgba(0, 150, 136, 0.35)',
  maxScale: 1.5
}

// 处理涟漪事件
const handleRipple = (event: MouseEvent) => {
  console.log('Ripple effect triggered at:', event.clientX, event.clientY)
}
</script>

<style scoped>
.interactive-element {
  position: relative;
  /* 确保容器有相对定位 */
}
</style>
```

## 注意事项

1. **容器定位**
   - 使用涟漪效果的容器必须设置 `position: relative`
   - 涟漪效果会自动继承容器的 `border-radius`

2. **性能优化**
   - 涟漪效果使用 CSS transform 实现动画
   - 自动清理事件监听器，避免内存泄漏
   - 使用 CSS 变量实现主题定制，避免样式污染

3. **无障碍支持**
   - 涟漪效果不影响键盘操作
   - 支持 `prefers-reduced-motion` 媒体查询

4. **浏览器兼容性**
   - 支持所有现代浏览器
   - 使用 CSS 变量实现主题定制
   - 优雅降级处理

## 最佳实践

1. **合理使用**
   ```vue
   <!-- 推荐：在需要交互反馈的元素上使用 -->
   <button class="action-button">
     <InnerRippleEffect enabled />
   </button>

   <!-- 不推荐：在纯展示元素上使用 -->
   <div class="static-content">
     <InnerRippleEffect enabled /> <!-- 避免 -->
   </div>
   ```

2. **性能优化**
   ```vue
   <!-- 推荐：动态控制涟漪效果 -->
   <InnerRippleEffect
     :enabled="isInteractive"
     :options="{ duration: 300 }"
   />

   <!-- 不推荐：始终启用涟漪效果 -->
   <InnerRippleEffect enabled /> <!-- 避免 -->
   ```

3. **主题定制**
   ```scss
   // 推荐：使用CSS变量实现主题定制
   .my-theme {
     --ripple-color: rgba(0, 150, 136, 0.35);
     --ripple-duration: 500ms;
   }
   ```

## 常见问题

1. **涟漪效果不显示**
   - 检查容器是否设置了 `position: relative`
   - 确认 `enabled` 属性是否为 `true`
   - 验证点击事件是否正确触发

2. **动画效果异常**
   - 检查 `duration` 值是否合理
   - 确认 CSS 变量是否正确设置
   - 验证浏览器是否支持相关 CSS 特性

3. **性能问题**
   - 避免在频繁更新的元素上使用
   - 合理控制动画时长
   - 必要时使用 `will-change` 优化性能

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件。在提交代码前，请确保：

1. 代码符合项目的编码规范
2. 添加了必要的类型定义
3. 更新了相关文档
4. 添加了测试用例

## 许可证

MIT License 
