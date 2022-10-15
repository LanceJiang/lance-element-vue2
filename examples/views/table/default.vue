<template>
  <div class="flex-column-page-wrap pageWrap">
    <!--  单色样式类  -->
    <span class="ad-iconfont ad-Review"></span>
    <!--  svg  -->
    <AdIcon icon="shopify-s"></AdIcon>
    <AdIcon icon="frozen" @click="getRequestParams"></AdIcon>
    <el-button class="ad-icon-button">
      <AdIcon icon="frozen"></AdIcon>
    </el-button>
<!--    <AdNoData isFull message="<div style='background: #f00;'>test: lang: {$i18n.locale}</div>"> <template v-slot:extraContent>no data</template> </AdNoData>-->
    <div>test: lang: {{$i18n.locale}}</div>
    <div>test: local文字: {{$t('route.location')}}</div>
    <div>test: src/locale 文字: {{$t('adb.btn.add')}}</div>

    <DraggableNest
      v-model="checkedOptions"
      :move="onMove"
      :setFixed="setFixed"/>
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
      :customColumnsConfig="curColumnsConfig"
    >
<!--      <template #toolLeft>
        <div class="content-header-box">
          <b-input
            class="search-wrapper"
            v-model="formParams.pattern"
            size="medium"
            :placeholder="$t('outboundOrder.filter.pattern.placeholder')"
            clearable
            @keyup.enter.native="updateParams"
          >
            <b-button slot="suffix" class="button-icon" type="text" @click="updateParams">
              <i class="el-icon-search" />
            </b-button>
          </b-input>
          <adb-filter-button-group
            v-model="formParams"
            :filter-options="filterOptions"
            @commit="updateParams"
          />
        </div>
      </template>
      <template #top>
        <adb-filter-tag
          v-model="formParams"
          :filter-options="filterOptions"
          @commit="updateParams"
        />
      </template>-->
      <!-- 操作 -->
      <template #action="{ row }">
        <el-tooltip placement="top" :content="$t('outboundOrder.btn.view')">
          <el-button size="small" class="ad-icon-button" @click="handleView(row)">
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
import DraggableNest from '~/DraggableNest'

export default {
  name: 'default',
  components: {
    TableColumnsPopover,
    DraggableNest
  },
  data() {
    const tPrefix = 'outboundOrder.table.'
    // t_label: column.t_label【String】,
    // prop: column.prop【String】,
    // fixed: 控制column是否固定 fixed【Boolean】,
    // dynamic: 标记column是否根据本地的column进行label替换【Boolean】
    const userConfig = {
      t_label: `${tPrefix}user`,
      // label: `${tPrefix}user`, // todo
      prop: 'local_user',
      slots: {
        // default: user,
      },
      minWidth: '185px',
      showOverflowTooltip: false,
      // 暂时没有该功能仅做
      children: [
        {
          label: 'child0_001',
          prop: 'child0_001'
        },
        {
          label: 'child0_002',
          prop: 'child0_002'
        }
      ]
    }
    const extreaColumns = Array.from({ length: 20 }).map((_, i) => ({
      label: `${tPrefix}test_${i}`,
      prop: `test_${i}`
    }))
    const columns = [
      userConfig,
      {
        t_label: `${tPrefix}orderNo`,
        prop: 'orderNo',
        minWidth: '220px'
      },
      {
        t_label: `common.table.action`,
        // label: '测试的 action label 非 t_label',
        prop: 'action',
        slots: {
          default: 'action'
        },
        fixed: 'right'
      }
    ]
    columns.push(...extreaColumns)
    const checkedOptions = columns.map(v => {
      return {
        t_label: v.t_label,
        prop: v.prop,
        fixed: v.fixed
      }
    })
    return {
      searchParams: {
      },
      list: [],
      total: 0,
      options: {
        loading: false
      },
      // todo...
      // columns, // temptemptemp
      curColumnsConfig: {
        columns,
        // 默认倒序
        defaultCheckedOptions: columns.map(v => v).reverse()
      },

      checkedOptions
    }
  },
  computed: {
    localList() {
      // 相关数据组装处理
      return this.list
    },
    localColumns() {
      // 为保险起见 拿到接口的配置数据 需要过滤 已失效的配置项 todo... [checkedOptions]
      const { checkedOptions, columns } = this
      if (!checkedOptions.length) return columns
      return checkedOptions.map(v => {
        const cur = columns.find(column => column.prop === v.prop)
        if (cur) {
          const fixedFlag = cur.fixed
          if (fixedFlag) {
            cur.fixedFlag = fixedFlag
          }
          return cur
        }
      }).filter(Boolean)
    }
  },
  created() {
    window.default = this
    this.queryTableConfig()
    this.queryList()
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      // fixed 表示 固定的项
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    setFixed(v) {
      const fixed = v.fixed
      if (fixed === 'left') {
        v.fixed = 'right'
      } else {
        v.fixed = 'left'
      }
      // this.getCheckedOptions()
    },
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
.pageWrap {

}
</style>
