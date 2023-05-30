<template>
  <div id="app" class="page-wrapper">
    <div class='page-header'>
      <img class='info' src='~@/assets/images/logo.jpg' @click='jump'/>
      <div class="select">
        选择页面：
        <el-select :value="routeName" placeholder="请选择页面" @change="switchRoute">
          <el-option-group
            v-for="group in $router.options.routes"
            :key="group.name"
            :label="group.name">
            <el-option
              v-for="item in group.children"
              :key="group.name+item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-option-group>
        </el-select>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      routeName: undefined // 'home-Default'
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (value) {
        this.routeName = value
      }
    }
  },
  /* watch: {
    routeName: {
      // immediate: true,
      handler(name) {
        if (name !== this.$route.name) {
          this.$router.push({ name })
        }
      }
    }
  }, */
  created() {
    // this.switchRoute(this.$route.name)
    window.test = this
  },
  methods: {
    switchRoute(routeName) {
      // this.routeName = routeName
      this.$router.push({ name: routeName })
    },
    jump() {
      window.open('https://github.com/LanceJiang/lance-element-vue2', '_blank')
    }
  }
}
</script>
<style lang="scss">
html,body {
  height: 100%;
}
.page-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: auto;
}
#app {
  //font-family: $le-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  height: 100%;
  //color: #2c3e50;
}
// 详情划分标题
.common_title {
  position: relative;
  display: flex;
  align-items: center;
  //line-height: 22px;
  padding: 12px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  &:before {
    content: '';
    width: 3px;
    height: 16px;
    margin-right: 6px;
    background: $le-color-primary;
  }
}
.page-header {
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: #f14e02;
  .info {
    width: 34px;
    cursor: pointer;
    //height: 34px;
  }
  .select {
    flex: 1;
    text-align: center;
    padding: 6px 0;
  }
}
</style>
