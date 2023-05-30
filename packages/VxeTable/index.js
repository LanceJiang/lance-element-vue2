// import { prefix } from 'lance-element-vue2/packages/config'
import Component from './src/index'
Component.install = Vue => {
  // Vue.component(`${prefix}${Component.name}`, Component)
  Vue.component(Component.name, Component)
}
export default Component
