<template>
  <div class="flex-column-page-wrap pageWrap">
    Forms
    <div class="common_title">ad-form-config</div>
    <div class="content">
      <AdFormConfig
        ref="local_form"
        class="local_formConfig"
        :forms="forms"
        :formConfig="formConfig"
        @submit="formSubmit"
      />
    </div>

    <div class="common_title">ad-form-config 表单 嵌入 dialog</div>
    <div class="content">
      <el-button @click="dialogVisible = true">打开 弹窗</el-button>
      <el-dialog
        :title="'表单 嵌入 dialog'"
        :visible="dialogVisible"
        @update:visible="changeVisible"
        :closeOnClickModal="false"
        class="local_dialog ad-dialog-wrap"
        customClass="ad-dialog ad-form-config-dialog"
        @close="changeVisible(false)"
      >
        <AdFormConfig
          v-if="dialogVisible"
          ref="configForm"
          :forms="forms"
          :formConfig="formConfig"
          :form-data="formData"
          @submit="formSubmit"
          @cancel="changeVisible"
        />
      </el-dialog>
    </div>
    <div class="common_title">ad-form-config-dialog 表单弹窗</div>
    <div class="content">
      <el-button @click="dialogVisible2 = true">打开 弹窗</el-button>
      <AdFormConfigDialog
        v-if="dialogVisible2"
        title="ad-form-config-dialog 表单弹窗"
        :visible.sync="dialogVisible2"
        :formOptions="{
          forms,
          formConfig
        }"
        :formData="formData"
        @submit="formSubmit"
      />
    </div>
  </div>
</template>

<script>
import i18n from '@/locales'

const prefix = 'outboundOrder.orderDialog.'

export default {
  name: 'forms',
  data() {
    const _this = this
    return {
      formData: {
        service_name: 'service_LABEL_2'
      },
      forms: [
        {
          prop: 'service_name',
          t_label: `${prefix}service`,
          itemType: 'select',
          disabled: false,
          // valueKey: 'value', // 默认
          // labelKey: 'label', // 默认
          // clearable: true,
          filterable: true,
          // placeholder: '请选择项目阶段',
          options: Array.from({ length: 6 }).map((_, i) => ({
            label: `service_LABEL_${i}`,
            value: `service_${i}`
          })),
          rules: [
            {
              required: true,
              message: i18n.t('validate.validateEmptyTips', {
                name: i18n.t(`${prefix}service`)
              }),
              trigger: ['change', 'blur']
            }
          ],
          change: _this.serviceChange
        },
        {
          prop: 'account_alias',
          t_label: `${prefix}account`,
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
              message: i18n.t('validate.validateEmptyTips', {
                name: i18n.t(`${prefix}account`)
              }),
              trigger: ['change', 'blur']
            }
          ]
          // change: _this.accountChange
        }
      ],
      formConfig: {
        // labelPosition: 'top',
        // labelWidth: '100px',
        itemWidth: '100%',
        labelSuffix: '',
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
