<template>
  <div class="flex-column-page-wrap pageWrap">
<!--    <DraggableNest
      v-model="checkedOptions"
      :move="onMove"
      />
    -->
<!--    :setFixed="setFixed"-->
    <TableColumnsPopover
      v-model="checkedOptions"
      v-bind="curColumnsConfig"
    />
    <AdTable
      :searchParams.sync="searchParams"
      :list="localList"
      :total="total"
      :options="options"
      :columns="localColumns"
      :checkedOptions.sync="checkedOptions"
      :columnsConfig="curColumnsConfig"
    >
      <template #toolLeft>
        <div class="content-header-box">
          toolLeft
          <el-input
            class="search-wrapper"
            v-model="formParams.pattern"
            size="medium"
            :placeholder="$t('outboundOrder.filter.pattern.placeholder')"
            clearable
            @keyup.enter.native="updateParams"
          >
            <el-button slot="suffix" class="button-icon" type="text" @click="updateParams">
              <i class="el-icon-search" />
            </el-button>
          </el-input>
<!--          <adb-filter-button-group
            v-model="formParams"
            :filter-options="filterOptions"
            @commit="updateParams"
          />-->
        </div>
      </template>
      <template #top>
        我是 top...
        <adb-filter-tag
          v-model="formParams"
          :filter-options="filterOptions"
          @commit="updateParams"
        />
      </template>
      <!-- 操作 -->
      <template #action="{ row }">
        <el-tooltip placement="top" :content="$t('outboundOrder.btn.view')">
          <el-button class="ad-icon-button" @click="handleView(row)">
            <AdIcon icon="Show"></AdIcon>
          </el-button>
        </el-tooltip>
        <el-button class="ad-icon-button">
          <AdIcon icon="column"></AdIcon>
        </el-button>
      </template>
    </AdTable>
  </div>
</template>

<script>
import { getOrders, getOrdersCount, getTableConfig } from './queryApi'
import TableColumnsPopover from '~/Table/src/TableColumnsPopover'
// import DraggableNest from '~/DraggableNest'

import { columns, checkedOptions, defaultCheckedOptions } from './default_config'

export default {
  name: 'default',
  components: {
    TableColumnsPopover
    // DraggableNest
  },
  data() {
    return {
      formParams: {

      },
      searchParams: {
      },
      list: [],
      total: 0,
      options: {
        loading: false
      },
      // todo...
      // 列配置对象
      curColumnsConfig: {
        // 所有的 columns 配置
        columns,
        // 默认展示配置
        defaultCheckedOptions
      },
      checkedOptions: JSON.parse(JSON.stringify(checkedOptions))
    }
  },
  computed: {
    localList() {
      // 相关数据组装处理
      return this.list
    },
    localColumns() {
      // 为保险起见 拿到接口的配置数据 需要过滤 已失效的配置项 todo... [checkedOptions]
      const { checkedOptions } = this
      const columns = this.curColumnsConfig.columns
      if (!checkedOptions.length) return columns
      return checkedOptions.map(v => {
        const cur = columns.find(column => column.prop === v.prop)
        if (cur) {
          const fixedFlag = cur.fixed
          if (fixedFlag) {
            v.fixed = fixedFlag
          }
          return cur
        }
      }).filter(Boolean)
    }
  },
  watch: {
    // 监听数据对象变更 重新做请求
    searchParams() {
      // searchParams 变更 重新做请求
      this.queryList()
    }
  },
  created() {
    window.default = this
    this.queryTableConfig()
    this.queryList()
  },
  methods: {
    updateParams() {
      console.error('updateParams  去请求接口 todo...')
    },

    // setFixed(v) {
    //   const fixed = v.fixed
    //   if (fixed === 'left') {
    //     v.fixed = 'right'
    //   } else {
    //     v.fixed = 'left'
    //   }
    //   // this.getCheckedOptions()
    // },
    getRequestParams(e) {
      console.error('getRequestParams', e)
      return {}
    },
    // table配置请求
    queryTableConfig() {
      // 可能存在多个 table 配置 此处制作一个进行模拟
      return getTableConfig().then(res => {
        // 对失效的 配置做剔除 todo
        let checkedOptions = res.columns
        const { columns, defaultCheckedOptions } = this.curColumnsConfig
        /** defaultCheckedOptions 必须与columns 配置修改做 同步更新 */
        if (!Array.isArray(checkedOptions) || !checkedOptions.length) {
          checkedOptions = defaultCheckedOptions
        }
        for (let i = 0; i < checkedOptions.length; i++) {
          const option = checkedOptions[i]
          const column = columns.find(column => option.prop === column.prop)
          if (!column) {
            // 删除上次保存的无效column配置
            checkedOptions.splice(i, 1)
            i--
          } else if (option.t_label !== column.t_label) {
            // 以columns的配置 更新最新 t_label 保证 ColumnsPopover 展示的选中值 和 最新的columns 名称一致
            option.t_label = column.t_label
          }
        }
        // this.checkedOptions = res.columns
        this.checkedOptions = checkedOptions
      })
    },
    // 列表请求
    queryList() {
      this.options.loading = true
      const input = this.getRequestParams()
      console.warn('input', JSON.stringify(input))
      const p1 = getOrders(input).then((list) => {
        this.list = list
      })
      const p2 = getOrdersCount(input.filter).then((total) => {
        this.total = total
      })
      Promise.all([p1, p2])
        .catch((e) => {
          this.$message.error(e.response?.errors?.[0].message)
        })
        .finally(() => {
          this.options.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.content-header-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-wrapper {
    margin-right: 12px;
  }

  .filters-wrapper {
    display: flex;
  }

  .column-filter {
    margin: 0 12px;
    width: 36px;
    height: 36px;
    padding: 10px 10px;
    border-radius: 6px;
  }
}
.pageWrap {

}
</style>
