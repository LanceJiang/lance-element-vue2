<template>
  <ElInput style="color: #f00;" v-model="testInput"></ElInput>
</template>

<script>
import { Input } from 'element-ui'
export default {
  name: 'AdberTest2',
  components: {
    ElInput: Input
  },
  data () {
    return {
      num: 0,
      testInput: ''
    }
  },
  methods: {
    handleClick () {
      this.num++
    }
  }
}
</script>

<style lang="scss" scoped>
.adber-test {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  font-size: 30px;
  text-align: center;
  background: #24292e;
  color: white;
}
</style>
