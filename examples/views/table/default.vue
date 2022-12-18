<template>
  <div class="flex-column-page-wrap pageWrap">
    <AdTable
      class="local_table"
      :searchParams.sync="searchParams"
      :list="localList"
      :total="total"
      :options="options"
      :columns="localColumns"
      :checkedOptions.sync="checkedOptions"
      :columnsConfig="curColumnsConfig"
    >
      <template #toolLeft>
<!--        <AdSearchGroup/>-->
        <ad-search-group
          v-bind="formOptions"
          v-model="formParams"
          :selectedSettingSubmit="selectedSettingSubmit"
          :saveFilterSubmit="saveFilterSubmit"
          :deleteTag="deleteTag">
          <template #prepend>
            <el-input
              class="ad-input-search"
              v-model="formParams.pattern"
              size="medium"
              :placeholder="$t('outboundOrder.filter.pattern.placeholder')"
              clearable
              @keyup.enter.native="updateParams"
            >
              <i slot="suffix" class="el-input__icon el-icon-search" @click="updateParams"/>
            </el-input>
          </template>
          <template #adSelectSlot="{option, label}">
            <div style="background: #A0AAB7;">{{label}} + {{ option.value_1 }}</div>
          </template>
        </ad-search-group>
      </template>
      <template #top>
        <!-- 按钮集合 -->
        <div class="ad-button-wrap">
          <template v-if="true">
            <el-tooltip
              placement="top"
              :content="$t('outboundOrder.btn.CreateBatchTip')"
            >
              <el-button
                type="primary"
                :class="{ 'is-disabled_test': true }"
              >
                {{ $t('outboundOrder.btn.CreateBatch') }}
              </el-button>
            </el-tooltip>

            <el-button
              style="margin-right: 10px"
            >
              {{ $t('outboundOrder.btn.BulkPicking') }}
            </el-button>
          </template>
<!--          :disabled="!selectList.length"-->
          <el-dropdown>
            <el-button>
              {{ $t('outboundOrder.btn.Print') }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="v of dropdownList" :key="v" :command="v">
                {{ $t(`outboundOrder.btn.${v}`) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
      <!-- 自定义slot title -->
      <template #slotName_title>
        <div class="slot_title-wrap">
          <el-tooltip placement="top" content="slotName_title by localUser">
            <span class='label'>slotName_title by localUser</span>
          </el-tooltip>
        </div>
      </template>
      <!-- 操作 -->
      <template #action="{ row }">
        <el-tooltip placement="top" :content="$t('outboundOrder.btn.view')">
          <el-button class="ad-icon-button">
            <AdIcon icon-class="ad-view"></AdIcon>
          </el-button>
        </el-tooltip>
        <el-button class="ad-icon-button">
          <AdIcon icon-class="ad-hide_column"></AdIcon>
        </el-button>
        <el-button class="ad-icon-button" disabled>
          <AdIcon icon-class="ad-hide_column"></AdIcon>
        </el-button>
      </template>
    </AdTable>
  </div>
</template>

<script>
import {
  // columns,
  tableBaseMixin
} from './default_config'

export default {
  name: 'default',
  mixins: [tableBaseMixin],
  beforeCreate() {
    console.error('before create default ElTable')
    // columns.find(v => v.prop === 'local_user').slots.default = (scope, h) => {
    //   return [<div style={'background: #f0f;'}>slot_user 函数渲染 slot:default </div>]
    // }
  }
}
</script>

<style scoped lang="scss">
.pageWrap {
  padding-top: 12px;
  overflow: auto;
}
// 其他样式
.local_table {
  padding: 0 12px;
}
</style>
