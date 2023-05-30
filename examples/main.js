import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'

// 导入组件库
// import AdminUI from './../packages'

// 正式
// import AdminUI from '@lancegroup/admin-ui/lib/admin-ui.umd'
import AdminUI from '@lancegroup/admin-ui_'

// 默认 elemen-ui 样式
import '@lancegroup/admin-ui/style/index.scss'
// import '@/assets/css/project_normal.scss' // 自定义相关项目配置 模拟

import ElementUI from 'element-ui/lib/element-ui.common.js'
// import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  // locale: i18n.locale,
  i18n: (key, value) => i18n.t(key, value),
  size: 'medium'
})
// 注册组件库
Vue.use(AdminUI, {
  // 方式1
  // locale: i18n.locale,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
Vue.config.lang = 'en'

window.vue = Vue
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
