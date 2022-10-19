import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'

// 导入组件库
// import AdberUI from './../packages'
import AdberUI from 'adber-ui-demo/lib/adber-ui.common'
// import AdberUI from 'adber-ui-demo/lib/adber-ui.umd'
import 'adber-ui-demo/lib/adber-ui.css'
// 正式
/* import AdberUI from '@adber/adber-ui'
import '@adber/adber-ui/lib/adber-ui.css' */

// demo 测试 todo
/* import AdberUI from 'adber-ui-demo'
import 'adber-ui-demo/lib/adber-ui.css' */
import 'element-ui/lib/theme-chalk/index.css'

// import 'adber-ui-demo/src/css/reset.scss'
import 'adber-ui-demo/src/css/index.scss'

import ElementUI from 'element-ui/lib/element-ui.common.js'
// import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  // locale: i18n.locale,
  i18n: (key, value) => i18n.t(key, value),
  size: 'medium'
})
// 注册组件库
Vue.use(AdberUI, {
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
