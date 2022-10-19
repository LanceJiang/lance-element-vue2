import { prefix } from 'adber-ui-demo/packages/config'
// 对外提供对组件的引用，注意组件必须声明 name
import Test from './src/test'
// 为组件提供 install 安装方法，供按需引入
Test.install = Vue => {
  Vue.component(`${prefix}${Test.name}`, Test)
}
export default Test
