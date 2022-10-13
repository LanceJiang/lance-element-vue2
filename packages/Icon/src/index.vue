<template>
  <svg class="icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="iconId"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'Icon',
  props: {
    prefix: {
      type: String,
      default: 'ad-'
    },
    icon: {
      type: String,
      require: true
    }
  },
  computed: {
    iconId() {
      return `#${this.prefix}${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
