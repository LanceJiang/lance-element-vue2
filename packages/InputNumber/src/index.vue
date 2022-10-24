<!--<template>
  <div class="el-input el-input-group el-input&#45;&#45;suffix">
    &lt;!&ndash;&ndash;&gt;<input type="number"
                  autocomplete="off"
                  placeholder="0.00"
                  min="0"
                  class="el-input__inner">
    &lt;!&ndash;&ndash;&gt;
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <span data-v-b2921196="" class="unit"> USD </span>
      <i class="el-input__icon USB"></i>
        &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</span>
      &lt;!&ndash;&ndash;&gt;</span>
    &lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;
  </div>
</template>-->
<!--todo-->
<!--<el-input
  v-model="scope.row.behavior.value"
  placeholder="0.00"
  suffix-icon="USB"
  type="number"
  min="0"
  class="input-w"
  :disabled="isValueInputDisabled(scope.row)"
  @input="onChangeInput(scope.row)"
>
<template slot="suffix">
                                <span class="unit">
                                  {{
                                    isInFuelSurchargePage
                                      ? '%'
                                      : priceUnitMap[
                                        scope.row.behavior.calculate_method
                                        ]
                                  }}
                                </span>
</template>
</el-input>-->
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
    const $slots = this.$slots
    const onEvents = this.$listeners
    console.error($slots, 'slots', this)
    // todo

    const _prefix = prefix ? <span class='el-input__prefix'>{prefix}</span> : ''
    const _suffix = suffix ? <span class='el-input__suffix'>{suffix}</span> : '' // el-input__suffix-inner
    return <div class={`ad-ad-input-number el-input el-input-group el-input--prefix el-input--suffix`}>
      {$slots.prefix || _prefix}
      <el-input-number
        props={{ ...props }}
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
    }
  }
}
</script>

<style scoped lang="scss">
.ad-input-number {
  width: 130px;
  &.rate100 {
    width: 100%;
  }
  //&.@{ad-prefix}-input-group {
  //  display: table;
  //  top: 0 !important;
  //}
  ///deep/ .@{ad-prefix}-input-number {
  //  min-width: 50px;
  //  //width: unset;
  //  width: 100%;
  //  border-radius: 2px 0 0 2px;
  //}
  ///deep/ .@{ad-prefix}-input-number-focused{
  //  z-index: 1
  //}
}
</style>
