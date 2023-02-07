<script lang="jsx">
import { t } from '@adber/adber-ui/src/locale'
import Locale from '@adber/adber-ui/src/mixins/locale'
import Popover from '@adber/adber-ui/packages/Popover'
import DraggableNest from '@adber/adber-ui/packages/DraggableNest'

const props = {
  // 设置按钮是否可见
  isShowSetting: {
    tyep: Boolean,
    default: true
  },
  tabsList: {
    tyep: Array,
    require: true,
    default: () => []
  }
}

const render = function (h) {
  const { editTabName, clickTabHandler, changeVisible, settingDialogVisible, onMove, deleteTab, saveTabName, saveTabDraggableHandler, deleteTabDraggableHandler } = this

  // 渲染页签
  const tagItemRender = (tab, index) => {
    let editIcon = ''
    if (index === this.selectTabIndex && !tab.isLocal) {
      editIcon = (
        <Popover
          ref="settingPopover"
          first-load={false}
          popperClass={`ad-popover--select ${'popperClass'}`}
          placement="bottom"
        >
          <ad-icon
            class="edit-icon"
            slot="reference"
            icon-class="ad-edit"
            onClick={editTabName.bind(null, index)}
          />
          <div class="tabs-edit__content ">
            <div class="ad-search-group-tags">
              <div class="tags-wrap">
                {tab.filter.map((filterItem, index) => {
                // 针对特殊类型 根据搜索的数据 进行自定义tag展示
                // local_tagHTML 即: tag [tagRender(h,{searchParams, transLabel, deleteFn}){return {showValue, tag}}处理 返回的 tag]
                  const form = filterItem.form
                  if (form.local_tagHTML) {
                    return form.local_tagHTML
                  }
                  const _value = filterItem.value
                  const local_label = t(filterItem.key)
                  const key = form.prop || index
                  if (Array.isArray(_value)) {
                    const _valueLength = _value.length
                    const labels = _value.join(',')
                    return (
                      <el-tag key={key} disable-transitions>
                        {local_label}：
                        <span title={labels} class="el-tag__label">
                          {labels}
                        </span>
                        <span class="el-tag__total">{`(${_valueLength})`}</span>
                      </el-tag>
                    )
                  } else {
                    return (
                      <el-tag key={key} disable-transitions>
                        {local_label}：
                        <span title={_value} class="el-tag__label">
                          {_value}
                        </span>
                      </el-tag>
                    )
                  }
                })}
              </div>
            </div>

            <el-form ref="tabForm" props={{ model: this.tabForm, rules: this.tabRules }} >
              <el-form-item prop="tagNewName">
                <el-input v-model={this.tabForm.tagNewName} placeholder={t('adb.el.input.placeholder')}></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="tabs-edit-footer ad-popover--select_footer">
            <el-button size="small" onClick={deleteTab.bind(null, tab, index)}>{t('adb.btn.deleteView')}</el-button>
            <el-button size="small" type="primary" onClick={saveTabName.bind(null, tab, index)}>
              {t('adb.btn.save')}
            </el-button>
          </div>
        </Popover>
      )
    }
    return (
      <div
        class={`tab-item ${this.selectTabIndex === index ? 'tab-active' : ''}`}
        onClick={clickTabHandler.bind(null, index)}
      >
        <span class="tab-item__name">{tab.name}</span>
        {editIcon}
      </div>
    )
  }
  // tab设置弹框
  const settingDialogRender = () => {
    return (<el-dialog
      title={t('adb.tabs.tabSetting')}
      visible={settingDialogVisible}
      on={this.selectedSettingListeners}
      closeOnClickModal={false}
      class="ad-dialog-wrap"
      customClass="ad-setting-tabs-dialog"
      onClose={changeVisible.bind(null, false)}
    >
      <div class="setting-connent">
        <h3 class="title">{ t('adb.tabs.tab') }</h3>
        <div class="drag-wrapp">
          <DraggableNest v-model={this.settingList} move={onMove} >
            {this.settingList.map((dragItem, index) => {
              return <div
                class="setting-tab-item ad-draggable-nest-item"
                key={dragItem.id}
              >
                <div class={['itemWrap', `${(dragItem.isLocal) ? 'disabled' : ''}`]}>
                  <AdIcon class="dragEl" iconClass="ad-drag" />
                  <span class="label_txt">{ dragItem.name }</span>
                  <AdIcon
                    class="delEl"
                    iconClass="ad-delete"
                    onClick={deleteTabDraggableHandler.bind(null, dragItem, index)}
                  />
                </div>
              </div>
            })}

          </DraggableNest>
        </div>
      </div>

      <div slot="footer" class="footer">
        <el-button class="cancel-button" onClick={changeVisible.bind(null, false)}>
          { t('adb.btn.cancel') }
        </el-button>
        <el-button type="primary" onClick={saveTabDraggableHandler}>
          { t('adb.btn.save') }
        </el-button>
      </div>
    </el-dialog>)
  }

  return (
    <div class="ad-tabs-wrap">
      <div class="tabs-setting tab-item" onClick={this.settingTabs}>
        <ad-icon icon-class="ad-setting" />
      </div>

      {this.tabsList.map((item, index) => {
        const key = item.id
        return <div key={key}>{tagItemRender(item, index)}</div>
      })}

      {settingDialogRender()}
    </div>
  )
}

export default {
  name: 'AdTabs',
  componentName: 'AdTabs',
  components: {
    Popover,
    DraggableNest
  },
  model: {
    prop: 'tabsList',
    event: 'update:tabsList'
  },
  props,
  mixins: [Locale],
  render,
  data() {
    const _this = this

    const validaNamePass = (rule, value, callBack) => {
      const findItem = _this.tabsList.find(
        (item) => item?.name?.toLocaleLowerCase() === value.toLocaleLowerCase()
      )
      if (!value || !value.trim()) {
        return callBack(new Error(t('adb.validate.validateEmptyTips', {
          name: t('adb.tabs.tab')
        })))
      }
      if (findItem && findItem.name !== this.value) {
        return callBack(new Error(t('adb.validate.validateAlreadyExists', {
          name: t('adb.tabs.tab')
        })))
      }
      callBack()
    }
    return {
      selectTabIndex: 0,
      settingDialogVisible: false,
      tabForm: {
        tagNewName: ''
      },
      tabsSettingListeners: {
        'update:visible': _this.changeVisible
      },
      settingList: [],
      tabRules: {
        tagNewName: [
          {
            validator: validaNamePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 设置标签顺序
    settingTabs() {
      this.settingDialogVisible = true
    },
    changeVisible(bool = false) {
      this.settingDialogVisible = bool

      this.settingList = [...this.tabsList]
    },
    // 点击标签
    clickTabHandler(index) {
      if (this.selectTabIndex === index) return
      this.selectTabIndex = index
      this.$emit('clickTab')
    },
    // 编辑标签名称
    editTabName(index) {
      this.tabForm.tagNewName = ''
    },
    // 拖拽tab
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element

      return (!relatedElement || !relatedElement.isLocal) && !draggedElement.isLocal
    },

    // 删除标签
    deleteTab(tab, index) {
      this.tabsList.splice(index, 1)
    },
    saveTabName(tab, index) {
      this.$refs['tabForm'].validate((valid) => {
        if (valid) {
          tab.name = this.tabForm.tagNewName
          this.$refs[`settingPopover`].showPopper = false
          this.$emit('updateTabs', this.tabsList)
        } else {
          return false
        }
      })
    },

    // setting 相关
    // 删除标签
    deleteTabDraggableHandler(tab, index) {
      this.settingList.splice(index, 1)
    },
    // 保存排序后的
    saveTabDraggableHandler() {
      // TODO 是否发生变化
      this.$emit('update:tabsList', this.settingList)
      this.changeVisible()
      this.$emit('updateTabs', this.settingList)
    }

  },

  watch: {
    tabsList: {
      handler(newVal, oldVal) {
        this.settingList = [...newVal]
      },
      deep: true,
      immediate: true
    }

  },

  created() {
  }
}
</script>
