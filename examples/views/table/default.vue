<template>
  <div class="flex-column-page-wrap pageWrap">
    <!--  单色样式类  -->
    <span class="ad-iconfont ad-Review"></span>
    <!--  svg  -->
    <AdIcon icon="shopify-s"></AdIcon>
    <AdIcon icon="frozen" @click="getRequestParams"></AdIcon>
<!--    <AdNoData isFull message="<div style='background: #f00;'>test: lang: {$i18n.locale}</div>"> <template v-slot:extraContent>no data</template> </AdNoData>-->
    <div>test: lang: {{$i18n.locale}}</div>
    <div>test: local文字: {{$t('route.location')}}</div>
    <div>test: src/locale 文字: {{$t('adb.btn.add')}}</div>
    <el-select v-model="value">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <AdTable
      :searchParams.sync="searchParams"
      :list="localList"
      :total="total"
      :options="options"
      :columns="localColumns"
      :tableColumnsProp.sync="tableColumnsProp"
      :customColumnsConfig="curColumnsConfig"
    >
<!--      <template #toolLeft>
        <div class="content-header-box">
          <b-input
            class="search-wrapper"
            v-model="formParams.pattern"
            size="medium"
            :placeholder="$t('outboundOrder.filter.pattern.placeholder')"
            clearable
            @keyup.enter.native="updateParams"
          >
            <b-button slot="suffix" class="button-icon" type="text" @click="updateParams">
              <i class="el-icon-search" />
            </b-button>
          </b-input>
          <adb-filter-button-group
            v-model="formParams"
            :filter-options="filterOptions"
            @commit="updateParams"
          />
        </div>
      </template>
      <template #top>
        <adb-filter-tag
          v-model="formParams"
          :filter-options="filterOptions"
          @commit="updateParams"
        />
      </template>-->
      <!-- 操作 -->
      <template #action="{ row }">
<!--        <el-tooltip placement="top" :content="$t('outboundOrder.btn.view')">-->
        <el-tooltip placement="top" :content="'outboundOrder.btn.view'">
          <b-icon-button @click="handleView(row)">
            33333333
            <b-svg icon-class="wms-Show"></b-svg>
          </b-icon-button>
        </el-tooltip>
      </template>
    </AdTable>
  </div>
</template>

<script>
import { getOrders, getOrdersCount } from './queryApi'
export default {
  name: 'default',
  data() {
    return {
      searchParams: {
      },
      list: [],
      total: 0,
      options: {
        loading: false
      },
      // todo...
      localColumns: [],
      tableColumnsProp: [],
      curColumnsConfig: {},

      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  computed: {
    localList() {
      // 相关数据组装处理
      return this.list
    }
  },
  created() {
  },
  methods: {
    getRequestParams(e) {
      console.error('getRequestParams', e)
      return {}
    },
    queryList() {
      this.options.loading = true
      const input = this.getRequestParams()
      console.warn('input', JSON.stringify(input))
      const p1 = getOrders(input).then((list) => {
        this.list = list
      })
      const p2 = getOrdersCount(input.filter).then((total) => {
        this.total = total
      })
      Promise.all([p1, p2])
        .catch((e) => {
          this.$message.error(e.response?.errors?.[0].message)
        })
        .finally(() => {
          this.options.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.pageWrap {

}
</style>
