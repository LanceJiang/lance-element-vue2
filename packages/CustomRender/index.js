// 自定义渲染
const Component = {
  name: 'AdCustomRender',
  props: {
    form: {
      required: true,
      /**
       * { render:function(h, { form, params }) { JSX || createElement }, ...form 配置 }
       */
      type: Object
    },
    params: {
      required: true,
      type: Object
    }
  },
  render(h) {
    const { form, params } = this
    const extendsParams = {
      form,
      params
    }
    const render = form.render
    if (typeof render === 'function') {
      return render(h, extendsParams)
    }
    return ''
  }
}
Component.install = Vue => {
  Vue.component(Component.name, Component)
  // Vue.component(`${prefix}${Component.name}`, Component)
}
export default Component
