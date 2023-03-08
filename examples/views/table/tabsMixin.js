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
    // 目前仅该两个字段 有实际作用
    // columns: [{prop: string, fixed: bool||string,...}, ...]
    v.columns = transfer(v.columns)
    // filters: {key: value,...}
    v.filters = transfer(v.filters)
    // querySettings: [prop, ...]
    v.querySettings = transfer(v.querySettings)
  })
  return nodes
}
export const query_savedSearches = (query) => {
  return graphQLClientBff.request(savedSearches, { query }).then((res) => {
    const nodes = res.savedSearches?.nodes || []
    console.log('test start', JSON.stringify(nodes))
    nodesTransfer(nodes)
    console.warn('test end', nodes)
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
// 默认all类型tab配置
const tabs_defaultAllTab = {
  // 非api存储的数据 id以 local_XXX 作为本地存储判断依据
  id: 'local_all',
  tabName: 'adb.tabs.all', // 多语言转换
  // 多语言切换
  i18n: true,
  // name: 'All',
  // 不允许删除 不允许排序
  disabled: true, // 对标 isLocked
  filters: {},
  columns: [],
  querySettings: []
}

/***
 * 注意:
 * tabs mixins 相关方法 和 数据 添加tabs_前缀以区分(若有特殊情况在单独页重新覆盖默认mixin)
 */
export default {
  data() {
    return {
      /**
       * 每个table应用的tabs_key 必须唯一!!!!
       * key 规则: `${应用前缀}_${page菜单描述}_${版本号}` eg: 'bill_clients-invoice_1'
       */
      tabs_key: 'only',
      /**
       * 默认的快捷筛选表单项 [prop, prop1, ...]
       */
      tabs_defaultSettings: [],
      /**
       * 重置搜索的props [prop, prop1, ...]
       *    ：tabs_filterParams 除tabs_filterForms以外 需要注册的prop 集合
       */
      tabs_extraFilterProps: [],
      /***
       * table Columns配置对象
       */
      tabs_columnsConfig: {
        // 1.所有的 columns 配置源
        columns: []
        // 2.默认展示配置(数据类型同columns)
        // defaultCheckedOptions: []
      },
      /***
       * 选中的tab columns
       */
      tabs_checkedColumns: [],
      /***
       * 筛选搜索对象
       */
      tabs_filterParams: {},
      /***
       * 相关搜索表单配置类目数组
       */
      tabs_filterForms: [],
      // tabs列表
      tabs_list: [JSON.parse(JSON.stringify(tabs_defaultAllTab))],
      // tabs加载loading
      tabs_loading: false,
      // tabs当前活跃id
      tabs_activeId: undefined
    }
  },
  methods: {
    // 判断是否本地固定存储
    tabs_isLocalTab(tabId) {
      return tabId.toString().indexOf('local_') === 0
    },
    // 获取searchGroup组件快捷方式prop字段
    tabs_getQuerySettings(fastForms = this.tabs_filterForms) {
      return (fastForms || []).filter(v => !v.isMore).map(v => v.prop)
    },
    // table配置请求
    tabs_queryTableConfig() {
      this.tabs_loading = true
      // return getTableConfig()
      return query_savedSearches({
        keys: [this.tabs_key]
      })
        .then((tabs) => {
          const filterForms = this.tabs_filterForms
          tabs.forEach((v) => {
            // 对锁定的tab 禁用排序
            v.disabled = v.isLocked ?? false
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

            // 3. querySettings: [prop, ...]
            v.querySettings = v.querySettings || []
          })
          // 查询All类型tab
          const allTabIdx = tabs.findIndex(v => v.tabName === tabs_defaultAllTab.tabName)
          // 未保存过All类型 添加默认All类型
          if (allTabIdx === -1) {
            tabs.unshift(JSON.parse(JSON.stringify(tabs_defaultAllTab)))
          } else {
            // 保存过的All 加上多语言配置
            const item = tabs[allTabIdx]
            item.disabled = true
            item.i18n = true
          }
          this.tabs_list = tabs
          // 选中触发(默认上次存储)
          this.tabs_activeId = this.tabs_activeId || tabs[0].id
        })
        .finally(() => {
          this.tabs_loading = false
        })
    },
    // tab编辑
    tabs_tabEdit(opts) {
      console.log('tabs_tabEdit: opts', opts)
      const { tab, params } = opts
      const id = tab.id
      // const idx = this.tabs_list.findIndex((v) => v.id === id)
      const query = {
        // 唯一标识key
        key: this.tabs_key,
        id,
        // 名称
        tabName: params.tabName,
        // // 序列号
        // tabIndex: idx,
        // 列表columns 保存
        columns: this.tabs_checkedColumns, // prop, fixed 目前仅该两个字段
        // 搜索筛选 保存
        filters: this.tabs_filterParams,
        // 快捷formProp 保存
        querySettings: this.tabs_getQuerySettings()
        // 锁定
        // isLocked: tab.disabled ?? false
      }
      this.tabs_loading = true
      query_savedSearchUpdate(query)
        .then((tab) => {
          // this.tabs_queryTableConfig()
          const idx = this.tabs_list.findIndex((v) => v.id === tab.id)
          if (idx > -1) {
            this.tabs_list[idx].tabName = params.tabName
          }
        })
        .finally(() => {
          this.tabs_loading = false
        })
    },
    // tab删除
    tabs_tabDelete(opts) {
      console.log('tabs_tabDelete: opts', opts)
      const { tab } = opts
      const id = tab.id
      query_savedSearchDelete([id])
        .then((res) => {
          // console.error(res, 'res delete.... boolean')
        })
        .finally(() => {
          this.tabs_loading = false
        })
    },
    // tab创建: 通过个性化的筛选条件 存储当前筛选数据 创建tab
    tabs_tabCreate(params) {
      const query = {
        // 每table类型唯一标识key
        key: this.tabs_key,
        // // 唯一键
        // id,
        // tab名称
        tabName: params.tabName,
        // 排序号
        tabIndex: this.tabs_list.length,
        // 列表columns 保存
        columns: this.tabs_checkedColumns, // prop, fixed 目前仅该两个字段
        // 搜索筛选 保存
        filters: this.tabs_filterParams,
        // 快捷formProp 保存
        querySettings: this.tabs_getQuerySettings(),
        // 锁定
        isLocked: false
      }
      this.tabs_loading = true
      query_savedSearchCreate(query)
        .then((tab) => {
          this.tabs_list.push(tab)
          this.tabs_activeId = tab.id
        })
        .finally(() => {
          this.tabs_loading = false
        })
    },
    // 切换当前选中tab
    tabs_switchTab(tab) {
      console.warn('switch tab 成功', tab)
      // 设置searchParams相关参数 触发 queryList
      // eg: 修改tabs_filterParams 触发 updateParams

      // 切换tab 1.重置快捷搜索项
      this.tabs_updateFilterForms(tab.querySettings)
      // 切换tab 2.重置筛选条件
      this.tabs_filterParams = this.tabs_getCurParams(tab.filters)
      // 切换tab 3.切换显示列
      this.tabs_checkedColumns = this.tabs_getFormatCheckedOptions(tab.columns)
    },
    // tabs排序
    tabs_tabSort(tabs) {
      console.warn('tabs_tabSort tabs 调用接口更新 tabs', tabs)
      const tabs_isLocalTab = this.tabs_isLocalTab
      // 过滤掉非存在接口上的tabId 进行排序
      const ids = tabs.filter((v) => !tabs_isLocalTab(v.id)).map(v => v.id)
      this.tabs_loading = true
      query_savedSearchTabIndexUpdate(ids)
        .then((tabs) => {
          this.$message.success(this.$t('adb.message.editSuccess'))
        })
        .finally(() => {
          this.tabs_loading = false
        })
    },
    // 更新当前tab配置(create||edit)
    tabs_updateCurTabConfig(params = {}) {
      const id = this.tabs_activeId
      const idx = this.tabs_list.findIndex((v) => v.id === id)
      if (idx > -1) {
        const tab = this.tabs_list[idx]
        const query = Object.assign({
          // 每table类型唯一标识key
          key: this.tabs_key,
          // 唯一键
          id,
          // tab名称
          tabName: tab.tabName || 'new Tab',
          // 排序号
          tabIndex: idx,
          // 列表columns 保存
          columns: this.tabs_checkedColumns, // prop, fixed 目前仅该两个字段
          // 搜索筛选 保存
          filters: this.tabs_filterParams,
          // 快捷formProp 保存
          querySettings: this.tabs_getQuerySettings(),
          // 锁定
          isLocked: tab.disabled ?? false
        }, params)
        // 判断是否是本地tab: 进行创建
        const isCreate = this.tabs_isLocalTab(id)
        let queryFn = query_savedSearchUpdate
        if (isCreate) {
          queryFn = query_savedSearchCreate
          delete query.id
        }
        // 如果是 All类型 filter清空 不做存储
        if (tab.tabName === tabs_defaultAllTab.tabName) {
          query.filters = {}
        }
        this.tabs_loading = true
        return queryFn(query)
          .then((tab) => {
            this.$message.success(this.$t(`adb.message.${isCreate ? 'addSuccess' : 'editSuccess'}`))
            // 编辑columns因为存在新创建的问题 通过tabName 来确定
            const idx = this.tabs_list.findIndex(
              (v) => v.tabName === tab.tabName
            )
            if (idx > -1) {
              // 如果是 All类型 对All进行替换重置
              if (tab.tabName === tabs_defaultAllTab.tabName) {
                tab.disabled = true
                tab.i18n = true
              }
              // 保证新建类型tab选中跟踪正确(存在create类型)
              this.tabs_activeId = tab.id
              // 更新 当前tab
              this.tabs_list.splice(idx, 1, tab)
              // // 更新 重置快捷搜索项
              // this.tabs_updateFilterForms(tab.querySettings)
            }
            return tab
          })
          .finally(() => {
            this.tabs_loading = false
          })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('not found the tab')
    },
    // 更新当前tab的自定义列(自带filter更新)
    tabs_updateCheckedColumns(columns) {
      console.error(columns, 'tabs_updateCheckedColumns columns')
      return this.tabs_updateCurTabConfig({
        columns
      })
    },
    // 更新快捷搜索表单项
    tabs_updateQuerySettings(querySettings = []) {
      console.error(querySettings, 'tabs_updateQuerySettings fastForms')
      return this.tabs_updateCurTabConfig({
        // 快捷formProp 保存
        querySettings
      })
    },
    // 修改 快捷筛选forms 的提交操作
    tabs_selectedSettingSubmit(group, dialog) {
      // group: searchGroup 组件实例
      // dialog: 配置快捷forms 弹窗实例
      dialog.submitLoading = true
      // [prop, prop, ...]
      const querySettings = dialog.checkedOptions.map(v => v.prop)
      this.tabs_updateQuerySettings(querySettings).then(tab => {
        // 重置 tabs_filterForms
        this.tabs_updateFilterForms(tab.querySettings)
        // dialog.submitLoading = false
        group.selectedSettingVisibleChange(false)
      }).catch(() => {
        dialog.submitLoading = false
      })
    },
    // 更新当前tab的筛选快捷表单项
    tabs_updateFilterForms(tab_querySettings = []) {
      const moreForms = this.tabs_filterForms
      // // 避免tabs共用,部分tab querySettings未配置导致filterForms 延用上个tab的配置
      // const moreForms = this.get_tabs_filterForms()
      let querySettings = tab_querySettings
      // 若querySettings无数据 或 不存在filterForms的快捷key 使用默认setting配置
      if (!Array.isArray(querySettings) || !querySettings.length || moreForms.every(v => !querySettings.includes(v.prop))) {
        querySettings = this.tabs_defaultSettings
      }
      // 默认为drawer配置
      moreForms.forEach(v => {
        v.isMore = true
      })
      // 筛选出快捷配置
      const defaultForms = querySettings.reduce((items, prop) => {
        const idx = moreForms.findIndex(v => v.prop === prop)
        if (idx > -1) {
          // forms 内删除 确定的快捷方式
          const [item] = moreForms.splice(idx, 1)
          item.isMore = false
          // defaultForms 内添加 该item
          items.push(item)
        }
        return items
      }, [])
      // 重置 tabs_filterForms
      this.tabs_filterForms = defaultForms.concat(moreForms)
    },
    // 获取当前tab的搜索筛选值变更
    tabs_getCurParams(tab_filters = {}) {
      const filters = tab_filters
      const curParams = this.tabs_filterForms.reduce((obj, v) => {
        const key = v.prop
        obj[key] = filters[key] ?? undefined
        return obj
      }, {})
      // fix: 切换筛选重置 searchGroupForms 以外的值 保证更改对应prop的表单 自动触发搜索
      if (Array.isArray(this.tabs_extraFilterProps) && this.tabs_extraFilterProps.length) {
        this.tabs_extraFilterProps.map(prop => {
          curParams[prop] = undefined
        })
      }
      return curParams
    },
    // 获取优化后的自定义列
    tabs_getFormatCheckedOptions(checkedOptions = []) {
      const { columns, defaultCheckedOptions } = this.tabs_columnsConfig
      // 2. 处理columns相关配置更新
      /** defaultCheckedOptions 必须与columns 配置修改做 同步更新 */
      if (!Array.isArray(checkedOptions) || !checkedOptions.length) {
        checkedOptions = defaultCheckedOptions || JSON.parse(JSON.stringify(columns)) || []
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
    }
  }
}
