<template>
  <div class="no-data">
    <Icon icon="no_data" class="no-data__img"/>
    <span class="text">{{ title || t('adb.noData') }}</span>
  </div>
</template>

<script>
import Icon from '~/Icon'
import Locale from 'adber-ui/mixins/locale'
export default {
  name: 'NoData',
  mixins: [Locale],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Icon
  },
  created() {
    window.test = this
    console.error(this, 'this.t  nodata')
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;

  .no-data__img {
    font-size: 80px;
    pointer-events: none;
  }

  .text {
    color: $adb-text-color-text;
    line-height: initial;
  }
}
</style>
