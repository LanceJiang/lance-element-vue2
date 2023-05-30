<script type="text/jsx">
import { t } from 'lance-element-vue2/src/locale'
export default {
  name: 'LeInputNumber',
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
    const { prefix, suffix, prop, controlsPosition, placeholder, max = 999999999999999, ...props } = this.$attrs
    const { inputNumberSize, value } = this
    const $slots = this.$slots
    const onEvents = this.$listeners

    const _prefix = prefix ? <span class='le-addon le-input-number__prefix'>{prefix}</span> : ''
    const _suffix = suffix ? <span class='le-addon le-input-number__suffix'>{suffix}</span> : ''
    return <div class={`le-input-number le-input-number--${inputNumberSize} el-input el-input-group
     ${(_prefix || $slots.prefix) ? 'le-input-number--prefix' : ''}
     ${(_suffix || $slots.suffix) ? 'le-input-number--suffix' : ''}
     `}>
      {$slots.prefix || _prefix}
      <el-input-number
        max={max}
        props={{ ...props }}
        size={inputNumberSize}
        controlsPosition={controlsPosition || 'right'}
        placeholder={placeholder || t('le.el.input.placeholder')}
        // value={this.localValue}
        value={value}
        on={onEvents}/>
      {$slots.suffix || _suffix}
    </div>
  },
  data () {
    return {}
  },
  computed: {
    // localValue () {
    //   const { prop } = this.$attrs
    //   const { value, params } = this
    //   if (prop && params) {
    //     return params[prop]
    //   }
    //   return value
    // },
    inputNumberSize() {
      return this.$attrs.size || (this.$ELEMENT || {}).size
    }
  }
}
</script>
