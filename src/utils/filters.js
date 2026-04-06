import dayjs from 'dayjs'

/**
 * 检查值是否为空
 * @param {*} date - 需要检查的值
 * @returns {Boolean} 是否为空
 */
export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
  return false
}

/**
 * 格式化时间戳
 * @param {Number|String} val - 时间戳（秒）
 * @param {String} format - 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {String} 格式化后的时间字符串
 */
export const formatTime = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNull(val)) {
    val = parseInt(val) * 1000
    return dayjs(val).format(format)
  } else {
    return '--'
  }
}

/**
 * 过滤器对象
 * 可以作为全局过滤器使用
 */
export const filters = {
  formatTime
}

/**
 * 安装过滤器插件
 * @param {Object} app - Vue 应用实例
 */
export default {
  install: (app) => {
    app.config.globalProperties.$filters = {
      formatTime
    }
  }
}
