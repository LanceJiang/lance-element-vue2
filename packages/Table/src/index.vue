<script lang="jsx">
// import { PNoData } from '@adber-ui/common'
import NoData from '~/NoData'
import Icon from '~/Icon'
// import { Component, Prop, Vue } from 'vue-property-decorator'
// import i18n from '@/locales' // todo

// import TableColumnsPopover from './TableColumnsPopover'
// todo...
const i18n = {
  t(test) {
    return 'test+' + test
  }
}
export const tableProps = {
  // 数据列表
  list: {
    type: Array,
    default: () => []
  },
  /**
   * [{
   *     prop, // 属性名
   *     label, // 列名
   *     align, // 对齐方式
   *     width, // 列宽
   *     minWidth, // 最小列宽
   *     sortable, // 是否允许排列顺序
   *     formatter: function(row, column){}, // 返回需要展示的数据
   *     slots: { header: fn || slotName, default: fn || slotName } （slots.default > formatter）
   * }]
   */
  columns: {
    type: Array,
    default: () => []
  },

  // 列表搜索参数
  searchParams: {
    type: Object,
    default: () => ({
      page: 1, // 页数
      pageSize: 20, // 页面条目
      sortParams: {} // 排序额外参数
    })
  },
  // 选中的参数
  tableColumnsProp: {
    type: Array,
    default: () => []
  },
  customColumnsConfig: {
    type: Object,
    default: () => ({
      // defaultSelectColumn: [], // [prop]
      // options: [], // [{label, value, selected}]
      columnsOptions: [],
      defaultCheckedOptions: [] // Array 没有存储数据时 系统给予的默认配置
    })
  },
  total: {
    type: Number,
    default: 0
  }, // 总数
  /**
   * table 表格的控制参数
   * 具体配置参考 computedOptions 默认参
   */
  options: {
    type: Object,
    default: () => ({})
  }
}

/** 针对默认的 header 展示添加slot */
/*
const slotHeader = function (titleHelp = {}, props) {
  // console.error(props, 'props.column...', titleHelp)
  // const { titleHelp, label } = props.column
  // const { label } = props.column
  const label = i18n.t(props.column.label)
  // 1.针对 column 配置有 titleHelp 对象的 进行默认提示处理
  const { message, icon } = titleHelp || {}
  let TitleHelp = ''
  if (message) {
    /!* eslint-disable *!/
    // @ts-ignore
    TitleHelp = <el-tooltip placement="top" content={message}>
      ??
    </el-tooltip>
    /!* eslint-enable *!/
    // 若有 iconfont 样式
    // <i class={['iconfont', icon || 'icon-question']}/>
  }
  // 2.若有自定义筛选配置
  // todo...
  return (
    <div class="slot_title-wrap">
      <el-tooltip placement="top" content={label}>
        <span class="label">{label}</span>
      </el-tooltip>
      {TitleHelp}
    </div>
  )
}
*/
// p-no-data.vue todo...
const TableColumnsPopover = { render() {
  return <div>test TableColumnsPopover</div>
} }
const slotDefault = ({ row, column }) => {
  // if (Object.keys(column).length) console.error(row, column, '     row, column, slotDefault')
  const val = row[column.property]
  if (typeof val !== 'number') {
    return val || '-'
  }
  return val
}

const columnSlots = (column, _this) => {
  // const { $slots } = _this
  const { $scopedSlots, $createElement } = _this
  let local_slots = {}
  // 针对未设置 formatter 的添加默认 slotDefault
  if (!column.formatter) {
    local_slots = {
      // default: slotDefault(column)
      default: slotDefault
    }
  }
  // 新增默认header 超出隐藏&提示(?&问号提示)
  // local_slots.header = slotHeader.bind(_this, column.titleHelp)
  const slots_key = Object.keys(column.slots || {})
  // let slots_headerName = ''
  if (slots_key.length) {
    slots_key.forEach((type) => {
      const slotName = column.slots[type]
      switch (typeof slotName) {
        case 'string':
          /* if (type === 'header') {
           slots_headerName = slotName
         } */
          // local_slots[type] = $slots[slotName] || null
          local_slots[type] = $scopedSlots[slotName] || null
          break
        case 'function': // 非 vue3 无法直接通过全局获取到 createElement 进行强制绑定
          local_slots[type] = slotName.bind(null, $createElement)
          break
        default:
      }
    })
  }

  return local_slots
}
const render = function (h) {
  const { computedOptions, list, total, searchParams, tableColumnsProp, customColumnsConfig } = this
  // console.error(tableColumnsProp, 'tableColumnsProp')
  // console.error(computedOptions, 'computedOptions', $t)
  // todo 测试...
  const headerCellStyle = { color: '#5C6570', background: '#F6FAFF' }
  // const listeners = {
  //   // 事件
  //   onSortChange: this.tableSortChange,
  //   onRowClick: this.handleCurrentChange,
  //   onSelectionChange: this.handleSelectionChange,
  // }
  const paginationListeners = {
    'size-change': this.handleSizeChange,
    'current-change': this.handleIndexChange
  }
  return (
    <div class="tableWrap">
      <div class="tableBody">
        {computedOptions.showTools && (
          <div class="toolBarWrap">
            <div class="toolLeft">{this.$slots.toolLeft}</div>
            <div class="toolRight">
              {/* 刷新 */}
              <el-tooltip placement="top" content={i18n.t('common.refresh')}>
                <el-button type="default" class="icon-button" onClick={this.refreshHandler}>
                  <Icon icon="revert" />
                </el-button>
              </el-tooltip>
              {/* columns过滤 PFilterColumn */}
              <TableColumnsPopover
                value={tableColumnsProp}
                onInput={this.tableColumnsPropChange}
                props={customColumnsConfig}
                type=""
                is-save={false}
              />
            </div>
          </div>
        )}
        {this.$slots.top}
        <div class="tableParentEl">
          <el-table
            ref="ELTable"
            class="local-table"
            size="mini"
            tooltip-effect="dark"
            headerCellStyle={headerCellStyle}
            border
            v-loading={computedOptions.loading}
            props={computedOptions}
            data={list}
            style={`height: ${computedOptions.height}`}
            on-sort-change={this.tableSortChange}
            on-row-click={this.handleCurrentChange}
            on-selection-change={this.handleSelectionChange}
          >
            isSelection multipleSelect
            {computedOptions.multipleSelect && (
              <el-table-column type="selection" width="40" fixed="left" />
            )}
            {this.localColumns.map((column, index) => {
              const {
                label,
                t_label,
                align,
                resizable,
                showOverflowTooltip,
                slots,
                adb_slots,
                ...opts
              } = column
              const label_ = t_label ? i18n.t(t_label) : label
              return (
                <el-table-column
                  key={index}
                  props={opts}
                  label={label_}
                  scopedSlots={adb_slots}
                  align={align ?? computedOptions.align}
                  resizable={resizable ?? computedOptions.resizable}
                  showOverflowTooltip={showOverflowTooltip ?? computedOptions.showOverflowTooltip}
                ></el-table-column>
              )
            })}
            <template slot="empty">
              <NoData />
            </template>
          </el-table>
        </div>
      </div>
      {/* --分页-- */}
      {computedOptions.showPagination && (
        <el-pagination
          total={total}
          currentPage={searchParams.page}
          pageSize={searchParams.pageSize}
          pageSizes={computedOptions.pageSizes}
          layout={computedOptions.layout}
          on={paginationListeners}
        />
      )}
    </div>
  )
}
export default {
  name: 'Table',
  components: {
    NoData,
    Icon,
    // PFilterColumn,
    TableColumnsPopover
  },
  props: tableProps,
  render,
  computed: {
    computedOptions() {
      return {
        ...{
          // el-table参数
          height: '100%', // 高度
          maxHeight: '100%', // 最大高度
          // sortOrders: ['ascending', 'descending'], null

          // 分页器参数
          pageSizes: [10, 20, 40, 100],
          layout: 'total, sizes, prev, pager, next, jumper',

          // 额外table参数
          loading: false, // 是否展示 tableLoading
          multipleSelect: false, // 是否多选 table
          rowKey: 'id', // 根据 该值 查找当前页面数据是否包含当前数据 添加 多选被选中的状态: Function(row)/string
          currentRowKey: 'id', // 根据 该值 查找当前页面数据是否包含当前数据 添加 高亮状态: string/number
          align: 'left', // columnItem 对齐方式
          resizable: true, // ColumnItem 是否允许拖动
          showOverflowTooltip: true, // columnItem 超出内容 省略号 同时添加 tiptool
          updateSort: false, // 列表变更 是否更新 sort 排序的 column

          showPagination: true, // 是否加载table 分页栏
          showTools: true // 是否展示table tools栏目
        },
        ...this.options
      }
    },
    localColumns() {
      return this.columns.map((column) => {
        return {
          ...column,
          adb_slots: columnSlots(column, this)
        }
      })
    }
  },
  watch: {
    list() {
      this.$nextTick().then(this.handleDefaults)
    }
  },
  methods: {
    handleDefaults() {
      // 更新 列表 sort
      const sortParams = this.searchParams.sortParams || {}
      if (this.computedOptions.updateSort && sortParams.prop) {
        this.tableUpdateSort(sortParams)
      }
    },
    // 排序
    tableSortChange({ column, prop, order }) {
      // console.error(column, prop, order, 'column, prop, order tableSortChange', ...arguments)
      const sortParams = {
        prop,
        order
        // order: order && order === 'ascending' ? 1 : -1,
        // order: order && order === 'ascending' ? 'ASC' : 'DESC',
      }
      this.$emit('update:searchParams', {
        ...this.searchParams,
        sortParams
      })
      // this.$emit('sort-change', searchParam)
    },
    handleCurrentChange(row) {
      // console.warn(row, 'handleCurrentChange row')
      // 选中当前列 触发
      this.$emit('handleCurrentChange', row)
    },
    // 切换每页显示的数量
    handleSizeChange(pageSize) {
      // console.error(' handleSizeChange pageSize', pageSize)
      this.$emit('update:searchParams', {
        ...this.searchParams,
        pageSize
      })
    },
    // 切换页码
    handleIndexChange(index) {
      // console.error(' handleIndexChange index', index)
      this.$emit('update:searchParams', {
        ...this.searchParams,
        page: index
      })
      // this.searchParams.page = index
    },
    // 刷新列表
    refreshHandler() {
      this.handleIndexChange(1)
      // 额外相关操作
      this.$emit('refreshHandler')
    },
    handleSelectionChange(row) {
      this.$emit('selection-change', row)
    },
    tableColumnsPropChange(props) {
      // console.error('tableColumnsPropChange props', props)
      this.$emit('update:tableColumnsProp', props)
    },
    // 可用于父级 通过 ref 获取该实例 手动切换
    toggleRowSelectionByIndex(index, bool = true) {
      this.$refs.ELTable.toggleRowSelection(this.list[index], bool)
    },
    // 更新选中行
    updateSelectedRow() {
      const { currentRowKey = 'id' } = this.computedOptions
      const curRow = this.curRow || {}
      if (!curRow[currentRowKey]) return // 没有选中项的不做处理
      // 高亮数据判断
      if (curRow && Object.keys(curRow).length) {
        let curRowIndex = -1
        curRowIndex = this.list.findIndex((item) => {
          return item[currentRowKey] === curRow[currentRowKey]
        })
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-expressions
          curRowIndex > -1 && this.$refs.ELTable.setCurrentRow(this.list[curRowIndex]) // 高亮原本被选中的数据
        })
      }
    },
    // sort { prop: string, order: ascending/descending/null }
    tableUpdateSort(sortParams = { prop: '', order: 'ascending' }, init = true) {
      try {
        // // 会做更新
        // this.$refs.ELTable.sort(config.sort, config.order)
        // init 则不更新 tableSortChange
        this.$refs.ELTable.store.commit('sort', {
          ...sortParams,
          init
        })
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  },
  created() {
    window.TableComponent = this
  }
}
// @Component({
//   name: 'TableComponent',
//   components: { PNoData },
// })
// export default class TableComponent extends Vue {
//   @Prop({ default: '' }) path?: string
//
//   private render = tableRender
// }
</script>

<style lang="scss" scoped>
.tableWrap {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-height: 0;

  ::v-deep(.slot_title-wrap) {
    display: inline-flex;
    align-items: center;
    text-align: center;
    overflow: hidden;

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* .iconfont {
      margin-left: .2em;
      font-size: 14px;
      cursor: pointer;
      color: #888;
      font-weight: normal;
    } */
  }

  .tableBody {
    flex: 1;
    min-height: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;

    @at-root {
      .toolBarWrap {
        margin-bottom: 16px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        //align-items: flex-start;
        ::v-deep(.toolLeft) {
          flex: 1;
        }

        .toolRight {
          //align-self: flex-end;
          // 兼容当搜索组件放置在 toolLeft 的时候
          //min-height: 32px;
          display: flex;
          align-items: center;
          // 仅带icon 的button 按钮样式
          .icon-button {
            width: 36px;
            height: 36px;
            padding: 10px 6px;
            border-radius: 6px;
          }

          &::v-deep {
            .el-button {
              margin-left: 12px;
            }
          }
        }
      }
    }

    .tableParentEl {
      flex: 1;
      overflow-y: hidden;
    }
  }
}

.el-pagination {
  display: flex;
  padding: 16px 12px;
  justify-content: flex-end;
}

.local-table {
  //font-size: 1.6rem;
  font-size: 13px;
  transform: translate(0, 0);

  .money-column {
    text-align: right;

    //&.credit-color {
    //  color: $shipber-green-normal;
    //}

    &.debit-color {
      color: #f4a508;
    }

    .none-money {
      color: #bdc3c9;
    }

    .money-icon {
      color: #bdc3c9;
      margin-left: 4px;
    }
  }

  &.el-table {
    &.el-table--border {
      ::v-deep td:not(:last-child) {
        border-right-color: transparent;
      }
    }

    &.el-table__body-wrapper {
      ::v-deep .el-table--border.is-scrolling-left ~ .el-table__fixed:not(:last-child) {
        border-right-color: transparent;
      }
    }

    ::v-deep th {
      height: 41px;
    }

    ::v-deep th > .cell {
      //font-size: 13px;
      font-weight: 500;
      color: #5c6570;
      line-height: 17px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  &.el-table--striped {
    ::v-deep .el-table__body {
      tr.el-table__row--striped td {
        background: #f6f8fa;
      }
    }
  }

  ::v-deep .el-table__body {
    td {
      color: #5c6570;
      font-size: 12px;
    }

    tr.hover-row.current-row > td,
    tr.hover-row.el-table__row--striped.current-row > td,
    tr.hover-row.el-table__row--striped > td,
    tr.hover-row > td {
      background-color: #e8f2fe;
    }
  }

  &.el-table--enable-row-hover {
    ::v-deep .el-table__body tr:hover > td {
      background-color: #e8f2fe;
    }
  }

  ::v-deep .el-table__body tr.hover-row > td {
    background: #f6f8fa;
  }

  .no-data__tip {
    color: #bdc3c9;
    font-size: 18px;
    line-height: 21px;
  }
}
</style>
