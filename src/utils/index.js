import xeUtils from 'xe-utils'
export {
  xeUtils
}
/**
 * 针对本地开发 console.log 添加颜色打印
 */
/*
export const $log = (function() {
  const isDEV = process.env.NODE_ENV !== 'production' // 开发环境
  if (!isDEV) {
    // eslint-disable-next-line
    // @ts-ignore
    return (content = 'content', title = 'title', background = '#007bfc') => {}
  }
  return (content = 'content', title = 'title', background = '#007bfc') => {
    content = typeof content === 'object' ? JSON.stringify(content) : content
    console.log.apply(null, [`%c ${title}： %c ${content} `, 'padding: 1px; border-radius: 10px; color: #fff; background: #9159B2;', `padding: 1px; border-radius: 10px; color: #fff; background: ${background};`])
  }
})()*/
export const $log = (content = 'content', title = 'title', background = '#007bfc') => {
  content = typeof content === 'object' ? JSON.stringify(content) : content
  console.log.apply(null, [`%c ${title}： %c ${content} `, 'padding: 1px; border-radius: 10px; color: #fff; background: #9159B2;', `padding: 1px; border-radius: 10px; color: #fff; background: ${background};`])
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟毫秒数
 * @param immediate true/false (是/否)即执行
 */
export function debounce(func, wait, immediate) {
  let timeout

  return function () {
    /* eslint-disable */
    // @ts-ignore
    const context = this
    const args = arguments
    /* eslint-enable */
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * 深层数据的集合进行有机合并
 * @param objs[] 需要合并的 对象集合 （后面的覆盖前面的参数）
 * @returns {{}}
 */
export const objDeepMerge = (...objs) => {
  const res = {}
  const combine = (opt) => {
    for (const prop in opt) {
      // eslint-disable-next-line
      if (opt.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(opt[prop]) === '[object Object]') {
          res[prop] = objDeepMerge(res[prop], opt[prop])
        } else {
          res[prop] = opt[prop]
        }
      }
    }
  }
  objs.map(opts => {
    combine(opts)
  })
  return res
}

/**
 * 异步操作避免重复触发加锁
 * @param syncFn
 * @returns {(function(...[*]): Promise<void>)|*}
 */
export function asyncHandlerLockWrap(syncFn) {
  let is_lock = false
  /* eslint-disable */
  // @ts-ignore
  return async function (...args) {
    // @ts-ignore
    const context = this
    if (!is_lock) {
      is_lock = true
      // @ts-ignore
      Promise.resolve().then(syncFn.bind(context, ...args)).finally(() => {
        is_lock = false
      })
    }
  }
  /* eslint-enable */
}

/**
 * 提取深层数据的值 (防止中间项 不存在导致的报错)
 * @param obj 【检测对象】
 * @param keyArr 【需要获取该对象内部数据key数组】
 * @returns {*}
 */
export function getDeepValue (obj, keyArr) {
  return keyArr.reduce((acc, key) => acc && acc[key], obj)
}
