<script lang="jsx">
import { t } from '@adber/adber-ui/src/locale'
// import Locale from '@adber/adber-ui/src/mixins/locale'
import Popover from '@adber/adber-ui/packages/Popover'
import DraggableNest from '@adber/adber-ui/packages/DraggableNest'
import FormConfig from '@adber/adber-ui/packages/FormConfig'

const render = function (h) {
  const { switchTab, activeTab, onMove } = this

  // 渲染页签
  const tagItemRender = (tab, index) => {
    let editIcon = ''
    if (tab.id === this.localActiveTabId && !tab.disabled) {
      editIcon = (
        <Popover
          first-load={false}
          popperClass="ad-tabs_popover"
          placement="bottom"
          v-model={this.setVisible}
        >
          <ad-icon
            class="edit-icon"
            slot="reference"
            icon-class="ad-edit"
          />
          <FormConfig
            class='ad-tabs_popover_formConfig'
            formData={activeTab}
            formConfig={this.formConfig}
            forms={this.forms}
            onSubmit={this.tabEdit}
            onCancel={this.tabDelete.bind(null, tab, index)}
          >
          </FormConfig>
        </Popover>
      )
    }
    return (
      <div
        key={tab.id}
        class={`draggable-item tab-item ${this.localActiveTabId === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
        onClick={(switchTab.bind(null, tab, index))}
      >
        <span class="label_txt tab-item__name">{tab.i18n ? t(tab.tabName) : tab.tabName}</span>
        {editIcon}
        {!tab.disabled ? <AdIcon onClick={this.dragElClick} class='dragEl' iconClass='ad-drag' /> : ''}
      </div>
    )
  }

  return (
    <div class="ad-tabs-wrap">
      {this.loading ? <div
        class='tabLoading'
        v-loading={true}
        element-loading-spinner='el-icon-loading'
      /> : '' }

      <DraggableNest
        class='local_draggable-wrap'
        v-model={this.localTabsList}
        onInput={this.tabsSort}
        move={onMove}
        onStart={this.onStart}
        options={this.dragOptions}
      >
        {this.localTabsList.map((item, index) => {
          return tagItemRender(item, index)
        })}
      </DraggableNest>
    </div>
  )
}
const props = {
  // tabList
  value: {
    type: Array,
    require: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 活跃的tabId
  activeTabId: {
    // type: Boolean,
    default: undefined
  }
}
export default {
  name: 'AdTabs',
  componentName: 'AdTabs',
  components: {
    Popover,
    DraggableNest,
    FormConfig
  },
  props,
  // mixins: [Locale],
  render,
  data() {
    const _this = this

    const validaNamePass = (rule, value, callBack) => {
      const findItem = _this.localTabsList.find(
        (item) => item?.tabName?.toLocaleLowerCase() === value?.toLocaleLowerCase?.()
      )
      if (!value || !value.trim()) {
        return callBack(new Error(t('adb.validate.validateEmptyTips', {
          name: t('adb.tabs.tab')
        })))
      }
      if (findItem && findItem.tabName !== this.value) {
        return callBack(new Error(t('adb.validate.validateAlreadyExists', {
          name: t('adb.tabs.tab')
        })))
      }
      callBack()
    }
    return {
      dragOptions: {
        handle: '.dragEl'
        // draggable: '.dragEl',
        // filter: '.ignore-elements'
      },
      setVisible: false,
      localTabsList: [],
      localActiveTabId: 0,
      forms: [
        {
          prop: 'tabName',
          itemType: 'input',
          rules: [
            {
              validator: validaNamePass,
              trigger: 'change'
            }
          ]
        }
      ],
      formConfig: {
        showLabel: false,
        showCancelBtn: true,
        cancelBtnText: 'adb.btn.deleteView',
        submitBtnText: 'adb.btn.save',
        size: 'small'
      },
      activeTab: {
        tabName: ''
        // id: '',
        // filter: {},
        // columns: [{prop:'',...}],
      }
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.localTabsList = [...(newVal || [])]
        // if (!this.activeTabId) {
        //   console.error('!this.activeTabId', 'value...')
        //   this.changeActiveId(this.localTabsList[0]?.id)
        // }
        // JSON.parse(JSON.stringify(newVal || []))
      },
      immediate: true
    },
    activeTabId: {
      handler(id, oldId) {
        // console.warn('activeTabId watch', id)
        if (id && this.localActiveTabId !== id) {
          // id在tabs列表存在再触发
          if (this.localTabsList.find(v => v.id === id)) {
            this.changeActiveId(id)
          }
        }
      }
    }
  },
  methods: {
    changeActiveId(id) {
      const tab = this.localTabsList.find(v => v.id === id)
      // console.warn('changeActiveId id tab', id, tab)
      if (tab) {
        this.switchTab(tab)
      }
    },
    dragElClick(event) {
      event.stopPropagation()
    },
    // 切换标签
    switchTab(tab) {
      if (this.localActiveTabId === tab.id) return
      this.activeTab = tab
      this.localActiveTabId = tab.id
      this.$emit('update:activeTabId', tab.id)
      this.$emit('switch', tab)
    },
    // 拖拽tab
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.disabled) && !draggedElement.disabled
    },
    // tab拖拽Start
    onStart() {
      this.setVisible = false
    },

    // 删除标签
    tabDelete(tab, index) {
      // console.warn('tabDelete ', tab, index)
      this.value.splice(index, 1)
      const len = this.value.length
      if (len > 0) {
        const next_idx = (index > 0 ? index : 1) - 1
        // 默认删除后 往前走一个, 若删除一个往后走一个
        this.changeActiveId(this.value[next_idx]?.id)
      }
      this.$emit('delete', {
        tab
      })
    },
    tabEdit(params) {
      // console.error(params, 'test..... submit')
      this.setVisible = false
      this.$emit('edit', {
        tab: this.activeTab,
        params
      })
    },
    // 排序
    tabsSort(tabs) {
      // const index = this.localTabsList.findIndex(v => v.id === this.localActiveTabId)
      // console.log(tabs, 'tabsSort tabs....., index')
      this.$emit('input', tabs)
      this.$emit('sort', tabs)
    }
  }
}
</script>
