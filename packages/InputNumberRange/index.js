import Component from '../InputNumber/src/InputNumberRange'
Component.install = Vue => {
  // Vue.component(`${prefix}${Component.name}`, Component)
  Vue.component(Component.name, Component)
}
export default Component
