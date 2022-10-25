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
      {{testNumber}}
      <el-input
        placeholder="请选择日期"
        suffix-icon="el-icon-date"
        prefix-icon="el-icon-search"
        >
      </el-input>
      <ElInput v-model="testNumber" prefix="#" suffix="￥">
        <template slot="prefix">prefix</template>
        <template slot="suffix"><span style="background: #f00">suffix</span></template>
      </ElInput>
      <div class="common_title">----------</div>

      <ElInputNumber v-model="testNumber" :min="0" ></ElInputNumber>
      <div class="common_title">----------</div>
      <AdInputNumber v-model="testNumber" :min="0" prefix="#" controlsPosition="1"></AdInputNumber>
      <div class="common_title">----------</div>
      <AdInputNumber v-model="testNumber" :min="0" suffix="￥" controlsPosition="1"></AdInputNumber>
      <div class="common_title">----------</div>
      <AdInputNumber size="mini" v-model="testNumber" :min="0" prefix="#" suffix="￥" controlsPosi2tion="1"></AdInputNumber>
      <div class="common_title">----------</div>
      <AdInputNumber v-model="testNumber" :min="0" controlsPositio2n="1">
        <template slot="prefix">prefix</template>
        <template slot="suffix"><span class="ad-addon ad-input-number__suffix" style="background: #f00">suffix</span></template>
      </AdInputNumber>
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
          <AdIcon icon="show"></AdIcon>
        </el-button>
      </el-tooltip>
    </div>

    <div class="common_title">暂无数据 AdNoData</div>
    <div class="content">
      <AdNoData
        isFull
      >
<!--        message="<div style='background: #f00;'>test: lang: {$i18n.locale}</div>"-->
        <template v-slot:extraContent>no data</template>
      </AdNoData>
    </div>
    <div class="common_title">AdDraggableNest</div>
    <div class="content">
      <AdDraggableNest
        style="background: #fafafa;"
        v-model="checkedOptions"
        :move="onMove"
      />
    </div>
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
          prop: 'test_children',
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
      testNumber: 1
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

</style>
<style lang="scss" scoped>
</style>
