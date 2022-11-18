// import { prefix } from '@adber/adber-ui/packages/config'
import Component from '../SearchGroup/src/SearchFilterDrawer'
Component.install = Vue => {
  // Vue.component(`${prefix}${Component.name}`, Component)
  Vue.component(Component.name, Component)
}
export default Component
