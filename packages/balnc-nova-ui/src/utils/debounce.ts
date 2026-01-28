/**
 * ******************************************************
 * @file                     debounce.ts
 * @description             「防抖工具函数」
 * 延迟执行函数，在指定时间内多次调用只执行最后一次
 * @author                  blancnova-web
 * ******************************************************
 */

/**
 * 防抖函数
 * @param func - 需要防抖的函数
 * @param wait - 延迟时间(ms)
 * @returns 防抖后的函数
 * @complexity O(1) - 常量级计算
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, wait)
  }
}
