import { prefix } from '~/config'
import packageJson from '../package.json'
import Test from './test'
import Table from './Table'
import Icon from './Icon'
import NoData from './NoData'
// import locale from 'adber-ui/locale'

// 存储组件列表
const components = [
  Test,
  Table,
  Icon,
  NoData
]

// 加载adber-svg icon
;(function () {
  const d = document
  const iconDom = d.getElementById('ad-icon')

  if (!iconDom) {
    /** update 最新 iconfont(.css && .js) */
    const origin_prefix = '//at.alicdn.com/t/c/font_3588867_eb8rgczzz9'
    const link = d.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `${origin_prefix}.css`
    d.getElementsByTagName('head')[0].appendChild(link)
    const s = d.createElement('script')
    s.id = 'ad-icon'
    s.src = `${origin_prefix}.js`
    d.getElementsByTagName('head')[0].appendChild(s)
  }
})()
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // locale.use(opts.locale)
  // locale.i18n(opts.i18n)
  // 遍历注册全局组件
  components.map(component => Vue.component(`${prefix}${component.name}`, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// console.warn(packageJson, 'packageJson  packageJson.version', packageJson.version)
export default {
  version: packageJson.version,
  // locale: locale.use,
  // i18n: locale.i18n,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}
