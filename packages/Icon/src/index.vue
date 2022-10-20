<template>
  <svg class="ad-icon" aria-hidden="true" @click="$emit('click', $event)">
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
