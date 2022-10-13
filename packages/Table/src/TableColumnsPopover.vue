<template>
  <div class="select-item" ref="filterColumn">
    <el-popover popper-class="my-select-popover" placement="bottom-end" v-model="visible">
      <el-tooltip slot="reference" placement="top" :content="$t('common.column')">
        <b-button type="default" class="reference-button">
          <b-svg icon-class="wms-column" /> </b-button
      ></el-tooltip>
      <div v-loading="loading">
        <span>{{ $t('common.tableColumnFilterLabel') }}</span>
        <el-scrollbar>
          <ul class="el-scrollbar__view el-select-dropdown__list">
            <li class="el-select-dropdown__item">
              <el-checkbox @change="onCheckAllChange" v-model="selectAll">
                {{ $t('common.selectAll') }}
              </el-checkbox>
            </li>
            <el-checkbox-group :value="value" @input="onChange">
              <el-checkbox
                class="el-select-dropdown__item"
                v-for="item in columnsOptions"
                :key="item.value"
                :label="item.value"
              >
                {{ $t(item.t_label) }}
              </el-checkbox>
            </el-checkbox-group>
          </ul>
        </el-scrollbar>
        <div class="edit-container">
          <b-button type="text" @click="handleRestore">
            {{ $t('common.btn.restore') }}
          </b-button>
          <b-button v-if="isSave" type="default" @click="saveFilterOption">
            {{ $t('common.btn.saveToView') }}
          </b-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<!--<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import * as API from '@/api'

type Option = { label: string; t_label: string; value: string; selected: boolean }

@Component({ name: 'TableColumnsPopover' })
export default class PFilterColumn extends Vue {
  @Prop({ type: Array, required: true }) private columnsOptions!: Option[]

  @Prop() private value?: string[]

  // 默认的展示表头
  @Prop({ type: Array }) defaultCheckedOptions?: string[]

  @Prop({ default: '', required: true }) type!: string

  @Prop({ default: true }) private isSave?: boolean

  // 选择全部
  private selectAll = false

  private visible = false

  private loading = false

  @Watch('value', { immediate: true })
  handleWatchVal(val: any) {
    this.selectAll = !(val.length < this.columnsOptions.length)
  }

  private onCheckAllChange(checked: boolean) {
    const arr = checked ? this.columnsOptions.map((v) => v.value) : []
    this.$emit('input', arr)
  }

  private onChange(arr: any) {
    this.selectAll = !(this.value.length < this.columnsOptions.length)
    this.$emit('input', arr)
  }

  // 保存过滤的信息
  async saveFilterOption() {
    const { value, type } = this
    const filterOptions = {
      filterColumn: JSON.stringify(value),
    }
    this.loading = true
    try {
      await API.BaseApi.saveTableFilter({
        type,
        filterJson: filterOptions,
      })
      this.$message.success('message.saveSuccess')
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
      this.visible = false
    }
  }

  // 重置表头显示
  handleRestore() {
    const defaultCheckedOptions = Array.isArray(this.defaultCheckedOptions)
      ? this.defaultCheckedOptions
      : this.columnsOptions.map((v) => v.value)
    this.$emit('input', defaultCheckedOptions)
  }
}
</script>-->
<style lang="scss" scoped>
.reference-button {
  width: 36px;
  height: 36px;
  padding: 10px 6px;
  border-radius: 6px;
}

::v-deep .el-select-dropdown__item {
  display: flex;
  align-items: center;
}

::v-deep .el-checkbox {
  display: flex;
  align-items: center;
}

::v-deep .el-scrollbar__wrap {
  margin-bottom: -10px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 40vh;
}

.select-item {
  position: relative;

  > .el-button {
    font-size: 14px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
  }
}

.edit-container {
  display: flex;
  justify-content: space-between;
  padding: 5px 16px;
}
</style>

<style lang="scss">
.my-select-popover {
  min-width: 250px;
  z-index: 2023;
  position: absolute;
  top: 43px;
  left: -130px;

  > span {
    color: #7c8794;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    display: inline-block;
    padding-left: 16px;
    padding-top: 16px;
  }
}
</style>
