<template>
  <div @click="$emit('click')" :class="['le-no-data', size, isFull ? 'le-no-data--full' : '']">
    <Icon iconClass="le-no_data" class="le-no-data__img"/>
    <div class="message" v-html="message || t('le.noData')"/>
    <!-- 额外处理 -->
    <slot name="extraContent"/>
  </div>
</template>

<script>
import Icon from 'lance-element-vue2/packages/Icon'
import Locale from 'lance-element-vue2/src/mixins/locale'
export default {
  name: 'LeNoData',
  mixins: [Locale],
  props: {
    message: {
      type: String,
      default: ''
    },
    isFull: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small' // large medium small mini
    }
  },
  components: {
    Icon
  },
  created() {
  }
}
</script>
