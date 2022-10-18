<template>
  <div :class="['no-data', isFull ? 'no-data--full' : '']" class="no-data">
    <Icon icon="no_data" class="no-data__img"/>
    <div class="message" v-html="message || t('adb.noData')"/>
    <!-- 额外处理 -->
    <slot name="extraContent"/>
  </div>
</template>

<script>
import Icon from '~/Icon'
import Locale from '@adber/adber-ui/src/mixins/locale'
export default {
  name: 'NoData',
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

<style lang="scss" scoped>
.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &--full {
    width: 100%;
    height: 100%;
  }

  padding: 20px 0;

  &__img {
    font-size: 80px;
    pointer-events: none;
  }

  .message {
    color: $ad-text-color-text;
    line-height: initial;
  }
}
</style>
