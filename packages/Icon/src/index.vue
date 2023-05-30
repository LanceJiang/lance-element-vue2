<template>
  <svg class="le-icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="`#${iconClass}`"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'LeIcon',
  props: {
    iconClass: {
      type: String,
      require: true
    }
  }
}
</script>
