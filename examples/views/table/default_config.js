const tPrefix = 'outboundOrder.table.'

let flag = false
const slot_user = (h, scope) => {
  if (!flag) {
    console.log(scope, '自定义 函数渲染')
    flag = true
  }
  return <div style={'background: #f0f;'}>slot_user 函数渲染 slot:default </div>
}

const userConfig = {
  t_label: `${tPrefix}user`,
  prop: 'local_user',
  /** 渲染自定义 可以使用 slots  && formatter */
  slots: {
    default: slot_user,
    header: 'slotName_title'
  },
  minWidth: '185px',
  showOverflowTooltip: false
  // // 暂时没有该功能（column 配置 column children） 配置仅做参考
  // children: [
  //   {
  //     label: 'child0_001',
  //     prop: 'child0_001'
  //   },
  //   {
  //     label: 'child0_002',
  //     prop: 'child0_002'
  //   }
  // ]
}
const testColumns = Array.from({ length: 20 }).map((_, i) => ({
  label: `${tPrefix}test_${i}`,
  prop: `test_${i}`
}))
export const columns = [
  userConfig,
  {
    t_label: `${tPrefix}orderNo`,
    prop: 'orderNo',
    minWidth: '220px',
    formatter() {
      return 'orderNo: formatter'
    }
  },
  ...testColumns,
  {
    t_label: 'adb.table.action',
    // label: '测试的 action label 非 t_label',
    prop: 'action',
    slots: {
      default: 'action'
    },
    fixed: 'right'
  }
]

// 初始化 checkedOptions (用于 接口还没获取到 之前保存的columns 配置)
export const checkedOptions = columns.map((v) => v)

// 若有特殊的 默认配置 (产品特殊要求 含: column 展示配置  和 展示 顺序)
export const defaultCheckedOptions = columns.map((v) => v).reverse()
