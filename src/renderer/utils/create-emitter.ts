/**
 * 事件类型，可以是字符串或符号类型
 */
export type EventType = string | symbol

/**
 * 事件处理程序类型，接受一个可选的事件参数并返回void
 */
export type Handler<T = unknown> = (event?: T) => void

/**
 * 通配符事件处理程序类型，接受事件类型和事件参数并返回void
 */
export type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

/**
 * 事件处理程序列表类型，包含多个事件处理程序
 */
export type EventHandlerList<T = unknown> = Array<Handler<T>>

/**
 * 通配符事件处理程序列表类型，包含多个通配符事件处理程序
 */
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>

/**
 * 事件处理器映射类型，映射事件类型到对应的事件处理程序列表
 */
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

// #region 事件发射器接口
/**
 * 事件发射器核心功能接口
 */
export interface Emitter<Events extends Record<EventType, unknown>> {

  /** 所有事件处理程序的存储集合 */
  all: EventHandlerMap<Events>

  /**
   * 注册事件监听
   * @template Key 事件类型泛型
   * @param type 事件类型（传入 '*' 监听所有事件）
   * @param handler 事件处理函数
   */
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void

  /**
   * 移除事件监听
   * @param type 事件类型
   * @param handler 可选的事件处理函数（不传则清空该类型所有监听）
   */
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void

  /**
   * 移除所有事件监听
   * @param type 事件类型
   */
  offAll(type: keyof Events): void

  /**
   * 触发指定类型事件
   * @param type 要触发的事件类型
   * @param event 要传递的事件数据对象
   */
  emit<Key extends keyof Events>(type: Key, event?: Events[Key]): void

  /**
   * 一次性事件监听（触发后自动移除）
   * @param type 事件类型
   * @param handler 事件处理函数
   */
  once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void

  /**
   * 绑定事件（返回解绑函数）
   * @param type 事件类型
   * @param handler 事件处理函数
   * @returns 返回移除该监听的无参函数
   */
  bind<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void

  /**
   * 解绑该类型的所有监听
   * @param type 要解绑的事件类型
   */
  unbind<Key extends keyof Events>(type: Key): void

  /** 清空所有事件监听 */
  clear(): void
}
// #endregion

// #region 事件发射器实现
/**
 * 安全获取数组对象的索引方法（处理负数索引情况）
 * @param arr 目标数组
 * @param index 索引位置
 */
const safeArrayIndex = <T>(arr: T[], index: number) =>
  (index + arr.length) % arr.length

/**
 * 创建事件发射器工厂函数
 * @param all 可选的外部存储容器（支持跨实例共享）
 */
export function createEmitter<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>
): Emitter<Events> {
  const eventHandlers = all || new Map()

  // #region 核心方法实现
  const core = {

    /** 事件监听注册 */
    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
      const handlers = eventHandlers.get(type) || []
      handlers.push(handler)
      eventHandlers.set(type, handlers)
    },

    /** 移除事件监听 */
    off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) {
      const handlers = eventHandlers.get(type)
      if (!handlers) return

      // 无参调用时清空全部监听
      if (!handler) {
        return
      }

      // 逆向遍历删除所有匹配的处理器
      for (let i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i] === handler) {
          handlers.splice(safeArrayIndex(handlers, i), 1)
        }
      }
    },

    /** 移除指定类型的所有事件监听 */
    offAll(type: keyof Events) {
      eventHandlers.delete(type)
    },

    /** 触发事件执行 */
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      // 处理具体类型事件监听
      const normalHandlers = eventHandlers.get(type)

      if (normalHandlers) {
        const list = normalHandlers.slice() as EventHandlerList<Events[keyof Events]>
        list.forEach((handler) => {
          handler(evt)
        })
      }
    }
  }
  // #endregion

  return {
    all: eventHandlers,

    on: core.on,
    off: core.off,
    offAll: core.offAll,
    emit: core.emit,

    /** 一次性事件实现（自动解绑版） */
    once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
      const wrapper = (event?: Events[keyof Events]) => {
        handler(event as Events[Key])
        core.off(type, wrapper)
      }
      core.on(type, wrapper )
    },

    /**
     * 移除指定类型的所有事件处理程序并绑定新的事件处理程序
     * @param type 事件类型
     * @param handler 事件处理函数
     */
    bind<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
      // 清除该类型所有监听
      core.offAll(type)
      core.on(type, handler)
    },

    /**
     * 移除指定类型的所有事件处理程序
     * @param type 事件类型
     */
    unbind<Key extends keyof Events>(type: Key): void {
      core.offAll(type)
    },

    /**
     * 清除所有事件处理程序
     */
    clear(): void {
      eventHandlers.clear()
    }
  }
}
// #endregion