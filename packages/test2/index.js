// 对外提供对组件的引用，注意组件必须声明 name
import AdberTest from './src/test'
// 为组件提供 install 安装方法，供按需引入
AdberTest.install = Vue => {
  Vue.component(AdberTest.name, AdberTest)
}
export default AdberTest
