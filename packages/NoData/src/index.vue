<template>
  <div :class="['ad-no-data', isFull ? 'ad-no-data--full' : '']">
    <Icon iconClass="ad-no_data" class="ad-no-data__img"/>
    <div class="message" v-html="message || t('adb.noData')"/>
    <!-- 额外处理 -->
    <slot name="extraContent"/>
  </div>
</template>

<script>
import Icon from '@adber/adber-ui/packages/Icon'
import Locale from '@adber/adber-ui/src/mixins/locale'
export default {
  name: 'AdNoData',
  mixins: [Locale],
  props: {
    message: {
      type: String,
      default: ''
    },
    isFull: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  created() {
  }
}
</script>
