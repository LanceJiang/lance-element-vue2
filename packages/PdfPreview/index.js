import { prefix } from 'adber-ui-demo/packages/config'
import Component from './src/index'
Component.install = Vue => {
  Vue.component(`${prefix}${Component.name}`, Component)
}
export default Component