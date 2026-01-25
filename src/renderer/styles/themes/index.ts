// 导出主题切换工具函数
export const themeSwitch = {

  /**
   * 切换主题
   * @param theme 目标主题，可选值为 'light' 或 'dark'
   */
  toggle: (theme?: 'light' | 'dark') => {
    const htmlEl = document.documentElement
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light'
    const newTheme = theme || (currentTheme === 'light' ? 'dark' : 'light')

    // 添加过渡类
    htmlEl.classList.add('theme-transition')
    // 设置新主题
    htmlEl.setAttribute('data-theme', newTheme)
    // 存储用户偏好
    localStorage.setItem('theme', newTheme)

    // 过渡完成后移除过渡类
    window.setTimeout(() => {
      htmlEl.classList.remove('theme-transition')
    }, 300)

    return newTheme
  },

  /**
   * 初始化主题
   */
  init: () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = savedTheme || (prefersDark ? 'dark' : 'light')

    document.documentElement.setAttribute('data-theme', theme)
    return theme
  },

  /**
   * 获取当前主题
   */
  getCurrentTheme: () => {
    return document.documentElement.getAttribute('data-theme') || 'light'
  }
}

// 导出CSS变量工具，在构建脚本中生成
export * from './utils/css-vars'

// 导出版本信息
export const version = '__VERSION__'
