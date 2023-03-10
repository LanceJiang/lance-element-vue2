<script lang="jsx">
import { t } from '@adber/adber-ui/src/locale'
// import Locale from '@adber/adber-ui/src/mixins/locale'
import Popover from '@adber/adber-ui/packages/Popover'
import DraggableNest from '@adber/adber-ui/packages/DraggableNest'
import FormConfig from '@adber/adber-ui/packages/FormConfig'

const render = function (h) {
  const { switchTab, onMove } = this

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
          <div
            v-loading={this.loading}
            element-loading-spinner='el-icon-loading'
            class='el-form el-form--label-top ad-form-config ad-form-config--small ad-tabs_popover_formConfig'
          >
            <el-input v-model={this.local_tabName} size='small' style='margin-bottom: 16px;'/>
            <div class='footer'>
              <el-button class='cancel-button' onClick={this.tabDelete.bind(null, tab, index)}>
                {t('adb.btn.deleteView')}
              </el-button>
              <div class='right-actions'>
                <el-button
                  class='submit-button'
                  type='primary'
                  onClick={this.tabEdit}>
                  {t('adb.btn.save')}
                </el-button>
              </div>
            </div>
          </div>
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
        v-model={this.list}
        onInput={this.tabsSort}
        move={onMove}
        onStart={this.onStart}
        options={this.dragOptions}
      >
        {this.list.map((item, index) => {
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
    return {
      dragOptions: {
        handle: '.dragEl'
        // draggable: '.dragEl',
        // filter: '.ignore-elements'
      },
      setVisible: false,
      list: [],
      localActiveTabId: 0,
      activeTab: {
        tabName: ''
        // id: '',
        // filter: {},
        // columns: [{prop:'',...}],
      },
      local_tabName: ''
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.list = [...(newVal || [])]
        // if (!this.activeTabId) {
        //   console.error('!this.activeTabId', 'value...')
        //   this.changeActiveId(this.list[0]?.id)
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
          if (this.list.find(v => v.id === id)) {
            this.changeActiveId(id)
          }
        }
      }
    }
  },
  methods: {
    changeActiveId(id) {
      const tab = this.list.find(v => v.id === id)
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
      this.local_tabName = tab.tabName || ''
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
      const callback = () => {
        this.value.splice(index, 1)
        const len = this.value.length
        if (len > 0) {
          const next_idx = (index > 0 ? index : 1) - 1
          // 默认删除后 往前走一个, 若删除一个往后走一个
          this.changeActiveId(this.value[next_idx]?.id)
          this.setVisible = false
        }
      }
      this.$emit('delete', {
        tab,
        callback
      })
    },
    tabEdit() {
      // console.error(params, 'test..... submit')
      // this.setVisible = false
      this.$emit('edit', {
        tab: this.activeTab,
        tabName: this.local_tabName,
        tabsRef: this
        // local_tabName(当前输入的tabName), setVisible(关闭弹窗), list(tabs列表)
      })
    },
    // 排序
    tabsSort(tabs) {
      // const index = this.list.findIndex(v => v.id === this.localActiveTabId)
      // console.log(tabs, 'tabsSort tabs....., index')
      this.$emit('input', tabs)
      this.$emit('sort', tabs)
    }
  }
}
</script>
