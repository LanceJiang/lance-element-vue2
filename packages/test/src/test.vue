<template>
  <div class="adber-test">
    {{testInput}}
    <ElInput v-model="testInput"></ElInput>
  </div>
</template>

<script>
export default {
  name: 'AdTest',
  components: {
  },
  data () {
    return {
      testInput: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.adber-test {
}
</style>
