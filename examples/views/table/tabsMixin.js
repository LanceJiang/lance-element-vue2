// import { getTableConfig } from '@/views/table/queryApi'
import { graphQLClientBff } from '@/utils/graphql_client'
import {
  savedSearches,
  savedSearchTabIndexUpdate,
  savedSearchCreate,
  savedSearchUpdate,
  savedSearchDelete
} from '@/api/bff-graphql'
// node > string/json 切换
const nodesTransfer = (nodes = [], isJsonParse = true) => {
  const transfer = (obj) => {
    try {
      return (isJsonParse ? JSON.parse : JSON.stringify)(obj)
    } catch (e) {
      console.warn(e, '解析出错')
      return null
    }
  }
  nodes.map((v) => {
    v.columns = transfer(v.columns)
    v.filters = transfer(v.filters)
  })
  return nodes
}
export const query_savedSearches = (query) => {
  return graphQLClientBff.request(savedSearches, { query }).then((res) => {
    const nodes = res.savedSearches?.nodes || []
    console.error('test start', JSON.stringify(nodes))
    nodesTransfer(nodes)
    console.error('test end', nodes)
    return nodes
  })
}
export const query_savedSearchTabIndexUpdate = (ids) => {
  return graphQLClientBff
    .request(savedSearchTabIndexUpdate, { ids })
    .then((res) => {
      const nodes = res.savedSearchTabIndexUpdate?.nodes || []
      console.error('test start', JSON.stringify(nodes))
      nodesTransfer(nodes)
      console.error('test end', nodes)
      return nodes
    })
}
export const query_savedSearchCreate = (query) => {
  // json -> string
  nodesTransfer([query], false)
  return graphQLClientBff.request(savedSearchCreate, query).then((res) => {
    const info = res.savedSearchCreate || {}
    nodesTransfer([info], true)
    return info
  })
}
export const query_savedSearchUpdate = (query) => {
  nodesTransfer([query], false)
  return graphQLClientBff.request(savedSearchUpdate, query).then((res) => {
    const info = res.savedSearchUpdate || {}
    nodesTransfer([info], true)
    return info
  })
}
export const query_savedSearchDelete = (ids) => {
  return graphQLClientBff.request(savedSearchDelete, { ids })
}
// 默认all 类型columns
const defaultAllTab = {
  // 非api存储的数据 id以 local_XXX 作为本地存储判断依据
  id: 'local_all',
  tabName: 'adb.tabs.all', // 多语言转换
  // name: 'All',
  // 不允许删除 不允许排序
  disabled: true,
  // 多语言切换
  i18n: true,
  filters: {},
  columns: []
}
// 判断是否本地固定存储
const isLocalTab = (tabId) => tabId.toString().indexOf('local_') === 0
export default {
  data() {
    return {
      // 每个table应用的tabsKey 必须唯一!!!!
      // key 规则: `${应用前缀}_${page菜单描述}_${版本号}` eg: 'bill_clients-invoice_1'
      tabsKey: 'only',
      localTabsList: [JSON.parse(JSON.stringify(defaultAllTab))],
      tabLoading: false,
      activeTabId: undefined
    }
  },
  methods: {
    // table配置请求
    queryTableConfig() {
      // 可能存在多个 table 配置 此处制作一个进行模拟
      this.tabLoading = true
      // return getTableConfig()
      return query_savedSearches({
        // keys: ['唯一keytest__e'],
        keys: [this.tabsKey] // zt_ oms   pms_  sys_menu_index
      })
        .then((tabs) => {
          console.error('接口请求....', tabs)
          const filterForms = this.formOptions.forms
          // const { columns, defaultCheckedOptions } = this.curColumnsConfig;
          tabs.forEach((v) => {
            // 解析必须是{} todo...
            // 1. 处理tabs相关搜索保存
            // 对失效的filters 进行过滤保证接口不报错
            // filters 结构: {key: value}
            const filters = v.filters || {}
            v.filters = Object.keys(filters).reduce((obj, key) => {
              const item = filterForms.find((v) => v.prop === key)
              if (item) {
                // 项目中 搜索项列表存在的prop 进行校正赋值
                obj[key] = filters[key]
              }
              return obj
            }, {})

            // 2. 处理columns相关配置更新
            // columns 结构: [{prop: string, ...}, ...]
            v.columns = v.columns || []
          })
          const allTabIdx = tabs.findIndex(v => v.tabName === defaultAllTab.tabName)
          // 未保存过All类型 添加默认All类型
          if (allTabIdx === -1) {
            tabs.unshift(JSON.parse(JSON.stringify(defaultAllTab)))
          } else {
            // 保存过的All 加上多语言配置
            const item = tabs[allTabIdx]
            item.disabled = true
            item.i18n = true
          }
          this.localTabsList = tabs
          // 选中触发(默认上次存储)
          this.activeTabId = this.activeTabId || tabs[0].id
        })
        .finally(() => {
          this.tabLoading = false
        })
    },
    // tab编辑
    tabEdit(opts) {
      console.log('tabEdit: opts', opts)
      const { tab, params } = opts
      const id = tab.id
      const idx = this.localTabsList.findIndex((v) => v.id === id)
      if (idx > -1) {
        this.localTabsList[idx].tabName = params.tabName
      }
      const query = {
        // key: '唯一keytest__e',
        key: this.tabsKey,
        id,
        // 名称
        tabName: params.tabName,
        // // 序列号 todo(是否有问题)
        // tabIndex: this.localTabsList.length,
        // 列表columns 保存
        columns: this.checkedOptions, // prop, fixed 目前仅该两个字段
        // 搜索筛选 保存
        filters: this.formParams
      }
      this.tabLoading = true
      query_savedSearchUpdate(query)
        .then((tab) => {
          // this.queryTableConfig()
          const idx = this.localTabsList.findIndex((v) => v.id === tab.id)
          if (idx > -1) {
            this.localTabsList[idx].tabName = params.tabName
          }
        })
        .finally(() => {
          this.tabLoading = false
        })
    },
    // 更新当前tab的自定义列(自带filter更新)
    updateCheckedOptions(columns) {
      console.error(columns, 'checkedOptionsChange columns')

      const id = this.activeTabId
      const idx = this.localTabsList.findIndex((v) => v.id === id)
      if (idx > -1) {
        const tab = this.localTabsList[idx]
        const query = {
          // key: '唯一keytest__e',
          key: this.tabsKey,
          id,
          // 名称
          tabName: tab.tabName || 'new Tab',
          // // 序列号
          tabIndex: idx, // || this.localTabsList.length,
          // 列表columns 保存
          // columns: this.checkedOptions, // prop, fixed 目前仅该两个字段
          columns, // prop, fixed 目前仅该两个字段 // (columns和checkedOptions是同数据)
          // 搜索筛选 保存
          filters: this.formParams
        }
        // 判断是否是本地tab: 进行创建
        const isCreate = isLocalTab(id) // id.toString().indexOf('local_') === 0
        let queryFn = query_savedSearchUpdate
        if (isCreate) {
          queryFn = query_savedSearchCreate
          delete query.id
        }
        // 如果是 All类型 filter清空 不做存储
        if (tab.tabName === defaultAllTab.tabName) {
          query.filters = {}
        }
        this.tabLoading = true
        queryFn(query)
          .then((tab) => {
            // 编辑columns因为存在新创建的问题 通过tabName 来确定
            const idx = this.localTabsList.findIndex(
              (v) => v.tabName === tab.tabName
            )
            if (idx > -1) {
              // 如果是 All类型 对All进行替换重置
              if (tab.tabName === defaultAllTab.tabName) {
                tab.disabled = true
                tab.i18n = true
              }
              // isLocalTab
              // 保证新建类型tab选中跟踪正确(存在create类型)
              this.activeTabId = tab.id
              this.localTabsList.splice(idx, 1, tab)
            }
          })
          .finally(() => {
            this.tabLoading = false
          })
      }
    },
    // tab删除
    tabDelete(opts) {
      console.log('tabDelete: opts', opts)
      const { tab } = opts
      const id = tab.id
      // const idx = this.localTabsList.findIndex(v => v.id === id)
      // if (idx > -1) {
      //   this.localTabsList.splice(idx, 1)
      // }
      console.error(opts, id, 'tabDelete 完成 调用接口提交 删除')
      query_savedSearchDelete([id])
        .then((res) => {
          console.error(res, 'res delete.... boolean')
          // this.localTabsList.push(tab);
          // this.activeTabId = tab.id;
        })
        .finally(() => {
          this.tabLoading = false
        })
    },
    // tab创建: 通过个性化的筛选条件 存储当前筛选数据 创建tab
    tabCreate(params) {
      console.error(
        'params, searchParams, tabCreate(tabCreateSubmit) todo...',
        params,
        JSON.stringify(this.formParams)
      )
      // todo  创建完成需要新的id 需要等待接口返回...
      // const tab = {
      //   tabName: params.tabName,
      //   filter: this.formParams,
      //   id: `local_${+new Date()}`,
      // };
      const query = {
        // key: '唯一keytest__e',
        key: this.tabsKey,
        // 名称
        tabName: params.tabName,
        // 序列号 todo(是否有问题)
        tabIndex: this.localTabsList.length,
        // 列表columns 保存
        columns: this.checkedOptions, // prop, fixed 目前仅该两个字段
        // 搜索筛选 保存
        filters: this.formParams
      }
      this.tabLoading = true
      query_savedSearchCreate(query)
        .then((tab) => {
          this.localTabsList.push(tab)
          this.activeTabId = tab.id
        })
        .finally(() => {
          this.tabLoading = false
        })
    },
    // 切换当前选中tab
    switchTab(tab) {
      console.warn('switch tab 模拟交互成功', tab)
      // 设置searchParams相关参数 触发 queryList
      // eg: 修改formParams 触发 updateParams
      const filters = tab.filters
      const formKeys = Object.keys(filters)
      const curParams = formKeys.reduce((obj, key) => {
        obj[key] = filters[key]
        return obj
      }, {})
      // 切换筛选条件
      this.formParams = curParams
      // 切换显示列
      this.checkedOptions = this.getFormatCheckedOptions(tab.columns)
    },
    // 得到优化后的自定义列
    getFormatCheckedOptions(checkedOptions = []) {
      const { columns, defaultCheckedOptions } = this.curColumnsConfig
      // 2. 处理columns相关配置更新(可能需要再切换tab单独做存储 todo...)
      /** defaultCheckedOptions 必须与columns 配置修改做 同步更新 */
      if (!Array.isArray(checkedOptions) || !checkedOptions.length) {
        checkedOptions = defaultCheckedOptions || []
      }
      // 对之前接口存储的 checkedOptions 做过滤更新（必要的处理）
      for (let i = 0; i < checkedOptions.length; i++) {
        const option = checkedOptions[i]
        const column = columns.find(
          (_column) => option.prop === _column.prop
        )
        if (!column) {
          // 删除上次保存的无效column配置
          checkedOptions.splice(i, 1)
          i--
        } else if (option.t_label !== column.t_label) {
          // 以columns的配置 更新最新 t_label 保证 ColumnsPopover 展示的选中值 和 最新的columns 名称一致
          option.t_label = column.t_label
        }
      }
      return checkedOptions
    },
    // tabs排序
    tabSort(tabs) {
      console.warn('tabSort tabs 调用接口更新 tabs', tabs)
      // 过滤掉非存在接口上的tabId 进行排序
      const ids = tabs.filter((v) => !isLocalTab(v.id)).map(v => v.id)
      this.tabLoading = true
      query_savedSearchTabIndexUpdate(ids)
        .then((tabs) => {
          console.error(tabs, 'tabs....')
          // this.localTabsList.push(tab);
          // this.activeTabId = tab.id;
        })
        .finally(() => {
          this.tabLoading = false
        })
    }
  }
}
