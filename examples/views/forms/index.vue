<template>
  <div class="flex-column-page-wrap pageWrap">
    Forms
    <div class="common_title">le-form-config</div>
    <div class="content">
      <LeFormConfig
        ref="local_form"
        class="local_formConfig"
        :forms="forms"
        :formConfig="formConfig"
        @submit="formSubmit"
      >
        <template #leSelectSlot="{option, label}">
          <div style="background: #A0AAB7;">{{label}} + {{ option.value_1 }}</div>
        </template>
        <template #leSelect_label>
          <span style='background: #0f0;display: flex'>label custom: template<span style='margin-left: auto; background: #00f; color: #fff'>{{'custom: template'}}</span></span>
        </template>
      </LeFormConfig>
    </div>

    <div class="common_title">le-form-config 表单 嵌入 dialog</div>
    <div class="content">
      <el-button @click="dialogVisible = true">打开 弹窗</el-button>
      <el-dialog
        :title="'表单 嵌入 dialog'"
        :visible="dialogVisible"
        @update:visible="changeVisible"
        :closeOnClickModal="false"
        class="local_dialog le-dialog-wrap"
        customClass="le-dialog le-form-config-dialog"
        @close="changeVisible(false)"
      >
        <LeFormConfig
          v-if="dialogVisible"
          ref="configForm"
          :forms="forms"
          :formConfig="formConfig"
          :form-data="formData"
          @submit="formSubmit"
          @cancel="changeVisible"
        >
          <template #leSelectSlot="{option, label}">
            <div style="background: #00f;">{{label}} + {{ option.value_1 }}</div>
          </template>
        </LeFormConfig>
      </el-dialog>
    </div>
    <div class="common_title">le-form-config-dialog 表单弹窗</div>
    <div class="content">
      <el-button @click="dialogVisible2 = true">打开 弹窗</el-button>
      <LeFormConfigDialog
        v-if="dialogVisible2"
        title="le-form-config-dialog 表单弹窗"
        :visible.sync="dialogVisible2"
        :formOptions="{
          forms,
          formConfig
        }"
        :formData="formData"
        @submit="formSubmit"
      >
        <template #leSelectSlot="{option, label}">
          <div style="background: #A0AAB7;">{{label}} + {{ option.value_1 }}</div>
        </template>
      </LeFormConfigDialog>
    </div>
  </div>
</template>

<script>
import i18n from '@/locales'

const prefix = 'outboundOrder.dialog.'

export default {
  name: 'forms',
  data() {
    // const _this = this
    return {
      formData: {
        test1_select: 'test1_2',
        input: 'ssssssss'
      },
      forms: [
        // select
        {
          prop: 'leSelect', // 提交的 params 的字段
          // label: 'leSelect', // label 标签
          itemType: 'leSelect', // form-item 类型
          labelKey: 'label_1',
          valueKey: 'value_1',
          // isPopover: false,
          options: Array.from({ length: 20 }).map((_, i) => {
            return {
              value_1: '选项' + i,
              label_1: '黄金糕' + i
            }
          }),
          // template 支持
          // slotLabel: 'leSelect_label',
          // render 支持
          slotLabel(h) {
            return <span style='background: #f00;display: flex'>label custom: fn<span style='margin-left: auto; background: #0f0'>{ 'custom: fn' }</span></span>
          },
          slotOption: 'leSelectSlot',
          popperAppendToBody: true
          // change: _this.serviceChange
        },
        // render { render:function 必传 }
        {
          prop: 'render',
          // label: '自定义Render',
          t_label: `${prefix}test2`,
          itemType: 'render',
          // span: 12,
          change(...args) {
            console.error(...args, 'change...')
          },
          rules: [
            {
              required: true,
              message: i18n.t('le.validate.validateEmptyTips', {
                name: i18n.t(`${prefix}test2`)
              }),
              trigger: 'blur'
            }
          ],
          render: (h, extendsParams) => {
            const { form, params } = extendsParams
            console.error(form, params, '///////////')
            return <el-input v-model={params[form.prop]} placeholder="placeholder test... 666"/>
          }
        },
        // select
        {
          prop: 'test1_select',
          t_label: 'test1_select',
          // t_label: `${prefix}test1`,
          itemType: 'select',
          disabled: false,
          // valueKey: 'value', // 默认
          // labelKey: 'label', // 默认
          // clearable: true,
          filterable: true,
          // placeholder: '请选择项目阶段',
          options: Array.from({ length: 6 }).map((_, i) => ({
            label: `test1_LABEL_${i}`,
            value: `test1_${i}`
          })),
          slotOption: 'leSelectSlot',
          rules: [
            {
              required: true,
              message: i18n.t('le.validate.validateEmptyTips', {
                name: i18n.t(`${prefix}test1`)
              }),
              trigger: ['change', 'blur']
            }
          ]
          // change: _this.serviceChange
        },
        /* {
          prop: 'account_alias',
          t_label: `${prefix}test2`,
          valueKey: 'account_alias',
          labelKey: 'nick_name',
          itemType: 'select',
          disabled: false,
          filterable: true,
          // placeholder: '请选择参与人员',
          options: Array.from({ length: 6 }).map((_, i) => ({
            nick_name: `service_LABEL_${i}`,
            account_alias: `account_alias_${i}`
          })),
          rules: [
            {
              required: true,
              message: i18n.t('le.validate.validateEmptyTips', {
                name: i18n.t(`${prefix}test2`)
              }),
              trigger: ['change', 'blur']
            }
          ]
          // change: _this.accountChange
        }, */
        // radio
        {
          prop: 'radio',
          label: 'radio',
          // t_label: `${prefix}test3`,
          itemType: 'radio',
          // span: 12,
          labelKey: 'labelX',
          valueKey: 'valueX',
          options: [
            // 'radio1',
            // 'radio2'
            { valueX: 'Y', labelX: 'radio1' },
            { valueX: 'N', labelX: 'radio2' }
          ],
          rules: [
            {
              required: true,
              message: i18n.t('le.validate.validateEmptyTips', {
                name: i18n.t(`${prefix}test3`)
              }),
              trigger: 'blur'
            }
          ]
        },
        // cascader
        {
          prop: 'cascader',
          label: 'cascader',
          // t_label: `${prefix}test4`,
          itemType: 'cascader',
          // placeholder: '请选择cascader____',
          options: [
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake'
                    }
                  ]
                }
              ]
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men'
                    }
                  ]
                }
              ]
            }
          ],
          rules: [
            {
              required: true,
              message: i18n.t('le.validate.validateEmptyTips', {
                name: i18n.t(`${prefix}test4`)
              }),
              trigger: 'blur'
            }
          ]
        },
        // inputNumber
        {
          prop: 'inputNumber',
          label: 'inputNumber',
          // t_label: `${prefix}test5`,
          prefix: 'Http://',
          suffix: '.com',
          itemType: 'inputNumber',
          change(...args) {
            console.error(...args, 'change...inputNumberinputNumberinputNumberinputNumberinputNumber')
          }
        },
        /* // inputNumberRange // todo 是否添加
        {
          prop: 'inputNumberRange',
          label: 'inputNumberRange',
          // t_label: `${prefix}test5`,
          prepend: 'Prepend',
          append: 'Append',
          prefix: 'Http://',
          suffix: '.com',
          itemType: 'inputNumberRange',
          change(...args) {
            console.error(...args, 'change...inputNumberinputNumberinputNumberinputNumberinputNumber')
          }
        }, */
        // date
        {
          prop: 'date',
          label: 'date(date-picker)',
          // t_label: `${prefix}test6`,
          itemType: 'datePicker',
          placeholder: '请输入date',
          valueFormat: 'yyyy-MM-dd',
          format: 'MM/dd/yyyy'
        },
        // dateRange
        {
          prop: 'dateRange',
          label: 'dateRange(date-picker [type:daterange])',
          // propStart: 'dateRangeStart', // 已被删除(暂不考虑开启)
          // propEnd: 'dateRangeEnd',
          // t_label: `${prefix}test7`,
          itemType: 'datePicker',
          type: 'daterange',
          valueFormat: 'yyyy-MM-dd',
          format: 'MM/dd/yyyy'
        },
        {
          prop: 'switch',
          label: 'switch',
          itemType: 'switch'
          // checkedChildren: '开',
          // unCheckedChildren: '关'
        },
        {
          prop: 'input',
          label: 'input',
          itemType: 'input',
          // onKeyUp: {
          on: {
            // keyup: (e) => {
            //   console.error(e, 'xxxx')
            // },
            // keypress: (e) => {
            //   console.error(e, 'keypress')
            // },
            // keypress__enter: (e) => {
            //   console.error(e, 'keypress__enter')
            // },
            blur: (e) => {
              console.error(e, 'blur')
            },
            input: (e) => {
              console.error(e, 'input')
            },
            focus(e) {
              console.error(e, 'focus')
            }
          }
        }
      ],
      formConfig: {
        labelPosition: 'left', // right // top
        // labelPosition: 'top',
        labelWidth: '270px',
        itemWidth: '100%',
        // labelSuffix: '',
        submitLoading: false,
        showCancelBtn: true,
        showResetBtn: true
        // showFooter: false
      },
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  methods: {
    serviceChange(value, options, params) {
      console.error(value, options, params, 'value, options, params')
      // 重置账号
      params.account_alias = undefined
      // 更新账号 options
      // this.forms.find((v) => v.prop === 'account_alias').options = this.local_services.get(value)
    },
    formSubmit(params) {
      console.error('params', params)
      this.formConfig.submitLoading = true
      setTimeout(() => {
        this.formConfig.submitLoading = false
        this.dialogVisible = false
        this.dialogVisible2 = false
        this.$message.error('提交 成功 ')
      }, 1000)
    },
    changeVisible(bool = false) {
      this.dialogVisible = bool
    }
  }
}
</script>
<style lang="scss" scoped>
.pageWrap {
  padding: 10px 12px;
  overflow: auto;
}

.local_formConfig {
  background: #fafafa;
  padding: 24px;
  //padding-top: 10px;
  border-radius: 6px 6px 0 0;

  &::v-deep {
    .form_wrap {
      overflow-y: unset;
    }
  }
}
</style>
