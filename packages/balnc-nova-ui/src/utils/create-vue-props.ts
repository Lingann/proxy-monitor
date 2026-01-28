// Types
import type { IfAny } from '@vue/shared'
import type { ComponentObjectPropsOptions, Prop, PropType } from 'vue'

/**
 * ******************************************************
 * @file                     create-vue-props.ts
 * @description             「Vue Props 工厂函数」
 * 用于在组合式函数中定义 props，并在实现组件中覆盖默认值
 * @author                  blancnova-web
 * ******************************************************
 */

// ==================================================
// #region Props 工厂函数
// ==================================================

/**
 * Vue Props 工厂函数
 * @template PropsOptions - 「Props 选项类型」继承自 ComponentObjectPropsOptions
 * @param props - 「Props 定义」props 的类型定义
 * @param source - 「来源标识」props 的来源标识
 * @returns 「Props 工厂函数」返回一个用于创建带有默认值的 props 的函数
 * @throws 「类型错误」当 props 定义不符合规范时抛出
 * @complexity O(n) - n 为 props 数量
 *
 * @example
 * ```typescript
 * const makeProps = createVueProps({
 *   foo: String,
 * })
 *
 * defineComponent({
 *   props: {
 *     ...makeProps({
 *       foo: 'a',
 *     }),
 *   },
 *   setup (props) {
 *     // 由于提供了默认值，类型为 "string" 而不是 "string | undefined"
 *     props.foo
 *   },
 * })
 * ```
 */
export function createVueProps<
  PropsOptions extends ComponentObjectPropsOptions
>( source: string, props: PropsOptions) {
  return <Defaults extends PartialKeys<PropsOptions> = Record<string, never>>(
    defaults?: Defaults
  ): AppendDefault<PropsOptions, Defaults> => {
    const result = {} as AppendDefault<PropsOptions, Defaults>

    Object.keys(props).forEach((prop) => {
      // 判断是否为对象形式的 prop 定义
      const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop])
      const definition = isObjectDefinition ? props[prop] : { type: props[prop] }

      // 处理默认值
      if (defaults && prop in defaults) {
        result[prop as keyof AppendDefault<PropsOptions, Defaults>] = {
          ...definition,
          default: defaults[prop]
        } as unknown as AppendDefault<PropsOptions, Defaults>[keyof AppendDefault<PropsOptions, Defaults>]
      } else {
        result[prop as keyof AppendDefault<PropsOptions, Defaults>] = definition as unknown as AppendDefault<PropsOptions, Defaults>[keyof AppendDefault<PropsOptions, Defaults>]
      }

      // 添加来源标识
      if (source && definition && typeof definition === 'object') {
        (definition as { source?: string }).source = source
      }
    })

    return result
  }
}

// #endregion
// ==================================================

// ==================================================
// #region 类型工具
// ==================================================

/**
 * 合并默认值的 Props 类型
 * @template T - 「Props 选项类型」
 * @template D - 「默认值类型」
 */
type AppendDefault<T extends ComponentObjectPropsOptions, D extends PartialKeys<T>> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Record<string, unknown>
      ? Omit<T[P], 'type' | 'default'> & {
        type: PropType<MergeTypeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
      : {
        type: PropType<MergeTypeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
}

/**
 * 合并类型和默认值
 * @template T - 「原始类型」
 * @template D - 「默认值类型」
 * @template P - 「推断的类型」
 */
type MergeTypeDefault<T, D, P = InferPropType<T>> = unknown extends D
  ? P
  : (P | D)

/**
 * 合并默认值
 * @template T - 「原始类型」
 * @template D - 「默认值类型」
 * @template P - 「推断的类型」
 */
type MergeDefault<T, D, P = InferPropType<T>> = unknown extends D
  ? P
  : (NonNullable<P> | D)

/**
 * 部分键类型
 * 类似 `Partial<T>`，但值类型为 unknown
 * @template T - 「目标类型」
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }

// #endregion
// ==================================================

// ==================================================
// #region 类型推断
// ==================================================

/**
 * 推断 Prop 类型
 * 从 Vue 复制，用于类型推断
 * @template T - 「目标类型」
 */
type InferPropType<T> = [T] extends [null]
  ? unknown // null & true 会推断失败
  : [T] extends [{ type: null | true }]
    // 由于 TS 问题 https://github.com/Microsoft/TypeScript/issues/14829
    // 从 { (): T } 推断的 ObjectConstructor 会变成 unknown
    // 从 PropConstructor(with PropMethod) 推断的 BooleanConstructor 会变成 Boolean
    ? unknown
    : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
      ? Record<string, unknown>
      : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
        ? boolean
        : [T] extends [DateConstructor | { type: DateConstructor }]
          ? Date
          : [T] extends [(infer U)[] | { type: (infer U)[] }]
            ? U extends DateConstructor
              ? Date | InferPropType<U>
              : InferPropType<U>
            : [T] extends [Prop<infer V, infer D>]
              ? unknown extends V
                ? IfAny<V, V, D>
                : V
              : T

// #endregion
// ==================================================