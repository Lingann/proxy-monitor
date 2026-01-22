@css-variable-rules

1. 变量命名推荐采用“三段式命名法”（Triptych Notation），格式为：`namespace-valueType-variableName`。
2. 变量名中的每一段（segment）内部推荐使用 camelCase（小驼峰）命名，段与段之间用短横线（-）分隔（例如：`--system-color-controlAccent`）。
3. 全局变量必须包含命名空间前缀（例如 `system`），局部变量（Scoped）通常不需要命名空间。
4. 变量名必须包含值类型（Value Type）信息（例如 `color`, `fontSize`, `fontWeight`, `duration`, `boxShadow` 等），以便于维护和理解。
5. 变量名最后一部分应该是具体的描述性名称，清晰表达变量的含义。
6. 区分“基于值（Value-based）”和“基于用途（Usage-based）”的命名：
   - 基于值的命名：用于定义常量，限制UI取值范围（例如 `--system-color-cherryRed`）。
   - 基于用途的命名：用于描述具体用途，作为接口概念，便于主题切换（例如 `--system-color-textPrimary`）。
7. 颜色命名避免仅使用抽象的数字后缀（如 `red-400`），推荐使用具象化的修饰词（如 `cherryRed`, `skyBlue`）以增加可读性。
8. 在实现深色模式（Dark Mode）等主题时，应使用“基于用途”的变量名，通过在不同主题下重新定义变量值来实现，避免在业务代码中编写重复的样式逻辑。
9. 变量名的抽象层级要适中，避免过于通用（如 `box`）导致用途不明，也避免过于具体（如 `mainToolbarBackground`）导致复用性差。
10. 推荐在 CSS 变量中体现层级关系，合理抽象设计意图（例如使用 `backgroundPrimary`, `backgroundSecondary` 而非具体的颜色名）。
