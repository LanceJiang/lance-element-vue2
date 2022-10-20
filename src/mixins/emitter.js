/**
 * 说明： 若需使用该方法 需要给 当前组件添加  自定义$option componentName
 * eg: 如下:
 */
// export default {
//   name: 'TestComponent',
//   componentName: 'TestComponent', // 自定义componentName （用于区别 component 自带的 name 鉴别）
//   created() {
//     // 父级组件 触发
//     // this.broadcast('TestComponent', 'Your eventName', 'params')
//     // 子级(当前)接收广播的监听
//     this.$on('Your eventName', function(val){ console.log('yours method', val) })
//
//     // 子级(当前)组件 触发
//     this.dispatch('Your_parent_componentName_2', 'eventName2', ['params1', 'params2'])
//     // 父级组件 接收
//     // this.$on('eventName2', function(a, b){ console.log('yours method', a, b) })
//   }
// }
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    // 向上触发
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    // 向下广播
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
