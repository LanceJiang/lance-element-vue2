<script type="text/jsx">
export default {
  name: 'AdInputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {},
    params: {
      type: Object
    }
  },
  render () {
    const { prefix, suffix, prop, controlsPosition, ...props } = this.$attrs
    const { inputNumberSize } = this
    const $slots = this.$slots
    const onEvents = this.$listeners
    console.error(inputNumberSize, 'inputNumberSize')
    // todo
    /* //  wrap: el-input--prefix el-input--suffix
    //  addon_prefix: el-input__icon el-input__prefix
    //  addon_suffix: el-input__icon el-input__suffix */

    const _prefix = prefix ? <span class='ad-addon ad-input-number__prefix'>{prefix}</span> : ''
    const _suffix = suffix ? <span class='ad-addon ad-input-number__suffix'>{suffix}</span> : '' // el-input__suffix-inner
    return <div class={`ad-input-number ad-input-number--${inputNumberSize} el-input el-input-group
     ${(_prefix || $slots.prefix) ? 'ad-input-number--prefix' : ''}
     ${(_suffix || $slots.suffix) ? 'ad-input-number--suffix' : ''}
     `}>
      {$slots.prefix || _prefix}
      <el-input-number
        props={{ ...props }}
        size={inputNumberSize}
        controlsPosition={controlsPosition || 'right'}
        value={this.localValue}
        on={onEvents}/>
      {$slots.suffix || _suffix}
    </div>
  },
  data () {
    return {}
  },
  computed: {
    localValue () {
      const { prop } = this.$attrs
      const { value, params } = this
      if (prop && params) {
        return params[prop]
      }
      return value
    },
    inputNumberSize() {
      return this.$attrs.size || (this.$ELEMENT || {}).size
    }
  }
}
</script>
