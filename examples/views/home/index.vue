<template>
  <div class="flex-column-page-wrap pageWrap">
    Home
    <div class="common_title">多语言 使用</div>
    <div class="content">
      <el-button @click="switchLang" size="small">
        lang: 切换
        <AdIcon icon="frozen"/>
        {{$i18n.locale}}
      </el-button>
      <div>local文字: {{$t('route.location')}}</div>
      <div>src/locale 文字(携带 adb前缀做区分): {{$t('adb.btn.add')}}</div>
    </div>

    <div class="common_title">iconfont && AdIcon</div>
    <div class="content">
      <!--  单色样式类  -->
      <span class="ad-iconfont ad-Review"></span>
      <!--  svg  -->
      <AdIcon icon="frozen" @click="test"></AdIcon>
      <!--Table 操作 用： Icon按钮-->
      <el-tooltip placement="top" :content="$t('outboundOrder.btn.view')">
        <el-button class="ad-icon-button" @click="test('row')">
          <AdIcon icon="Show"></AdIcon>
        </el-button>
      </el-tooltip>
    </div>

    <div class="common_title">暂无数据 AdNoData</div>
    <div class="content">
      <AdNoData
        isFull
        message="<div style='background: #f00;'>test: lang: {$i18n.locale}</div>"
      >
        <template v-slot:extraContent>no data</template>
      </AdNoData>
    </div>

    <div class="common_title">PdfPreview pdf 预览</div>
    <div class="content">
      <AdPdfPreview
        class="local_pdfPreviewWrap"
        ref="Label"
        v-for="url of pdfList"
        :key="url"
        :scale="1.5"
        :url="url"
      >
        <template v-slot:extraContent>no data</template>
      </AdPdfPreview>
    </div>

<!--  以下是默认不应用全局的组件  -->
<!--    <div class="common_title">条形码</div>
    <div class="content">
      <AdBarCode
        class="item bar-code text-overflow-hidden"
        value="12345688"
        :options="codeOpts"
      />
    </div>-->
<!--    <div class="common_title">AdDraggableNest</div>
    <div class="content">
      <AdDraggableNest
        v-model="checkedOptions"
        :move="onMove"
      />
    </div>-->
    <div class="common_title">iconfont && AdIcon</div>
    <div class="content">...</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      checkedOptions: [
        {
          label: 'Normal',
          prop: 'Normal'
        },
        {
          label: `test_children`,
          prop: 'action',
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
        },
        {
          label: `orderNo`,
          prop: 'orderNo'
        },
        {
          // 多语言
          t_label: `common.table.action`,
          prop: 'action',
          fixed: 'right'
        }
      ],
      codeOpts: {
        // format: "pharmacode",
        // lineColor: '#0aa',
        width: 2,
        height: 48,
        displayValue: false
      },
      // pdf 预览链接
      pdfList: ['https://shipber-label-stage.s3.us-west-2.amazonaws.com/Labels/fedex/fedex_ground/278911092933/merge.pdf?AWSAccessKeyId=AKIAVKD5XIH4LVPFTARC&Expires=1673859442&Signature=B14%2BMUQepwqrf7UbqTGK0oTgH9Y%3D']
    }
  },
  methods: {
    test() {
      console.error('test...')
    },
    switchLang() {
      let lang = this.$i18n.locale
      if (lang === 'en') {
        lang = 'zh'
      } else {
        lang = 'en'
      }
      this.$i18n.locale = lang
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      // fixed 表示 固定的项
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.pageWrap {
  padding: 10px 12px;
  overflow: auto;
}
.bar-code {
  //background: #ff0000;
  width: 100%;
  //width: calc(100% - 30px);
  height: 48px;
}
</style>
<style lang="scss">
.local_pdfPreviewWrap {
  background: #bd9393;
  padding: 10px 0;
  > canvas {
    display: block;
    margin: 0 auto;
    width: 188px;
    & + canvas {
      margin-top: 10px;
    }
  }
}
</style>
