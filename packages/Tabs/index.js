import Component from './src/index'
Component.install = Vue => {
  Vue.component(Component.name, Component)
  // Vue.component(`${prefix}${Component.name}`, Component)
}
export default Component
