<template>
  <el-drawer
    :visible="visible"
    v-on='$listeners'
    @update:visible="visibleChange"
    :withHeader="false"
    class="le-filter-drawer"
  >
    <div class="le-filter-drawer__header">
      <div class="title">
        <slot name="header">
          {{ t(title) }}
          <!-- <i
            class="el-icon-setting action"
            style="margin-left: 8px;"
            @click="settingVisibleChange(true)"
          />-->
        </slot>
      </div>
      <div class="action" @click="visibleChange(false)">
        <i class="el-icon-close" />
      </div>
    </div>
    <div class="le-filter-drawer__main">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="le-filter-drawer__footer">
      <slot name="footer"/>
    </div>
    <!--  选中的 项 排序... -->
<!--    <SelectedItemsSortDialog
      :visible.sync="selectedSettingVisible"
      :options="options"
      v-model="testSelect"
    >
      &lt;!&ndash;<template slot="tips">
        <div class="tips" style="background: #f00;">tips</div>
      </template>&ndash;&gt;
    </SelectedItemsSortDialog>-->
  </el-drawer>
</template>

<script lang="jsx">
// import { t } from 'lance-element-vue2/src/locale'
// import Icon from 'lance-element-vue2/packages/Icon'
import Locale from 'lance-element-vue2/src/mixins/locale'
// import SelectedItemsSortDialog from './SelectedItemsSortDialog'

export default {
  name: 'LeSearchFilterDrawer',
  components: {
    // SelectedItemsSortDialog
    // Icon
  },
  mixins: [Locale],
  props: {
    // options: {
    //   type: Array,
    //   default: () => []
    // },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'le.filter.filterLabel'
    }
  },
  // render,
  data() {
    const _this = this
    return {
      selectedSettingVisible: false,
      drawerListeners: {
        'update:visible': _this.visibleChange
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    window.testDrawer = this
  },
  methods: {
    visibleChange (bool) {
      this.$emit('update:visible', bool)
    }
  }
}
</script>
