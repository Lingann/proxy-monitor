---
alwaysApply: false
description: 
---
@vue-rules

1. vue组件必须使用tsx语法, 不允许使用vue单文件组件
2. vue组件必须使用vue 3.x版本
3. 不允许使用render函数
4. tsx文件使用必须遵循 ./name-rules.md 中的命名规则，不允许使用驼峰命名
5. 每个组件/页面都有自己的样式文件，并且文件名与组件/页面文件名严格保持一致（使用中划线命名），例如：`component-name.scss` 或 `page-name.scss`（推荐使用 CSS Modules 以避免污染，如 `component-name.module.scss`）。
6. 每个组件/页面都有自己的入口文件（即 TSX 文件），文件名必须使用中划线命名，禁止驼峰，例如：`component-name.tsx` 或 `page-name.tsx`。
7. 每个组件/页面的代码包含在自身独立的目录中，目录名必须使用中划线命名，例如：`components/component-name` 或 `views/page-name`，遵循 ./name-rules.md 中的命名规则。
8. 使用 ES Module 规范（`import`/`export`）来组织代码，在 `component-name.tsx` 中使用 `defineComponent` 或函数式组件编写逻辑；对于异步组件，使用 Vue 3 的 `defineAsyncComponent` 配合动态 `import()` 实现懒加载，禁止使用 `require` 方式引入。
9. 项目中应该存在公共的样式/全局变量文件，例如：`app-styles.scss`，用于定义全局的样式基准。
10. 类名严格遵循 BEM（Block-Element-Modifier）命名规范，在 TSX 中建议封装 helper 函数处理 BEM 字符串拼接。
11. 使用 CSS 变量定义全局的样式变量，参考 ./css-rules.md 中的规则。
12. 组件/页面必须使用国际化字符串（如 `vue-i18n` 的 composition API `useI18n`），禁止在 `.tsx` 的渲染函数中直接硬编码中文/英文。
13. 组件/页面目录下都有自己的composables目录，用于存放组件/页面的composition api 代码，例如：`components/component-name/composables` 或 `views/page-name/composables`。
14. 组件/页面目录下都有自己的utils目录，用于存放组件/页面的工具函数代码，例如：`components/component-name/utils` 或 `views/page-name/utils`。
15. 组件/页面如果比较复杂，建议将其拆分成多个子组件/页面，每个子组件/页面都有自己的目录，例如：`components/component-name/sub-components` 或 `views/page-name/sub-components`。
16. composables 禁止使用过于通用的命名，必须按照用途拆分，例如`use-network-monitor.ts` 或 `use-xxx-utils.ts`，必须使用超过2个单词的命名，例如`use-network-monitor.ts` 或 `use-http-client-utils.ts`。
17. 禁止composables 之间相互调用，只能在组件/页面中调用，禁止在composables 之间调用。
18. 禁止直接为组件/页面 创建不具备明确含义的composables，例如不允许创建`use-common-input.ts`或 `use-common-button.ts`，必须根据具体用途创建有意义的composables。
19. 禁止在tsx文件中放入太多的代码逻辑，必须将复杂的逻辑放到composables中，例如：`use-common-input-emitter.ts` 或 `use-common-input-state.ts`。
20. 代码能用一行就写一行，避免写太多块级代码， 保持代码的高可阅读性， 减少代码嵌套，具体遵循 ./css-rules.md 中的规则。
21. 不要定义 emits 事件， 所有的事件都通过props来传递， 例如：`onClick`、`onChange`等。更有利于tsx组件的使用。