<template>
  <component :is="tag" :id="id" ref="barCode" />
</template>

<script>
import JsBarcode from 'jsbarcode'
const props = {
  // 渲染标签
  tag: {
    type: String,
    default: 'svg',
    validator: (value) => ['canvas', 'svg', 'img'].includes(value)
  },
  // 数据 也可使用options.text 来处理 注： options.text > value
  value: {
    type: [String, Number]
  },
  // jsBarCode 配置 参考： _options
  options: {
    type: Object,
    default: () => ({})
  },
  // barCode id
  id: {
    type: String,
    default: `adb-bar-code_${new Date()}${Math.random()}`
  }
}
export default {
  name: 'BarCode',
  props,
  computed: {
    optOpts() {
      const _options = {
        // format: 'auto', // Function 编码格式渲染函数
        width: 2, // number
        height: 100, // number  实际高度为 height + margin 的值
        displayValue: true,
        text: '', // String 即 value
        fontOptions: '', // String
        font: 'monospace', // String
        textAlign: 'center', // String
        textPosition: 'bottom', // String
        textMargin: 2, // Number
        fontSize: 20, //  Number
        background: '#ffffff', // String (CSS color)
        lineColor: '#000000', //  String (CSS color)
        margin: 2, // Number
        marginTop: undefined, //  Number
        marginBottom: undefined, // Number
        marginLeft: undefined, // Number
        marginRight: undefined // Number
        // valid function(valid){} //  Function
      }
      return {
        ..._options,
        ...this.options
      }
    }
  },
  watch: {
    value: 'updateJsBar',
    options: {
      handler: 'updateJsBar',
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateJsBar() {
      this.$nextTick().then(() => {
        JsBarcode(this.$refs.barCode, `${this.value}`, this.optOpts)
      })
    }
  }
}
</script>
