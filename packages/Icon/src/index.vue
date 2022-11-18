<template>
  <svg class="ad-icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="`#${iconClass}`"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'AdIcon',
  props: {
    iconClass: {
      type: String,
      require: true
    }
  }
}
</script>
