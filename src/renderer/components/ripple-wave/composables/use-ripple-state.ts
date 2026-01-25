/**
 * ******************************************************
 * @file                     use-ripple-state.ts
 * @description             「波纹状态管理组合式函数」
 * 管理波纹效果的状态和生命周期
 * @author                  blancnova-web
 * ******************************************************
 */

import { reactive } from 'vue'

// ==================================================
// #region 类型定义
// ==================================================

export interface RippleState {

  /** 当前波纹元素 */
  currentWave: HTMLDivElement | null
}

// #endregion
// ==================================================

// ==================================================
// #region 组合式函数
// ==================================================

/**
 * 波纹状态管理
 * @returns 「状态对象」包含波纹状态和控制方法
 * @complexity O(1) - 常量级状态管理
 */
export const useRippleState = () => {
  const state = reactive<RippleState>({
    currentWave: null
  })

  /**
   * 重置状态
   */
  const resetState = () => {
    state.currentWave = null
  }

  return {
    state,
    resetState
  }
}

// #endregion
// ==================================================
