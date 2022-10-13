export default {
  route: {
    location: '库位',
    inventory: '库存管理'
  },
  common: {
    confirm: {
      title: '提示',
      // 后期确认是否通过变量处理
      content: '你确认操作嘛 ?'
    },
    btn: {
      add: '添加',
      restore: '还原',
      confirm: '确认',
      saveChanges: '保存修改',
      cancel: '取消'
    },
    selectAll: '选择全部',
    tableColumnFilterLabel: '选择需要在列表展示的列',
    noData: '无数据',
    table: {
      action: '操作'
    },
    refresh: '刷新',
    column: '视图',
    copy: '复制'
  },
  outboundOrder: {
    tab: {
      AwaitingPicking: '待拣货',
      Picking: '拣货中',
      AwaitingPacking: '待打包',
      ReadyToShip: '待发货'
    },
    table: {
      user: '客户',
      orderNo: '订单号',
      skuQty: '商品数',
      outboundNo: '出库单号',
      location: '库位',
      multiple: '一票多件',
      store: '店铺',
      // action: '操作',
      picker: '拣货员',
      sku: '商品编码',
      size: '尺寸',
      weight: '重量',
      package: '包材',
      trackingNo: '追踪号',
      service: '服务',
      creator: '创建者',
      createTime: '创建时间',
      batchNo: '批次号',
      reason: '原因',
      status: '状态',
      submittedBy: '上报人员',
      submittedTime: '上报人员',
      shipmentNum: '打印'
    },
    btn: {
      CreateBatch: '创建批次',
      CreateBatchTip: '创建批次必须是相同类型的订单',
      BulkPicking: '批量拣货',
      ConfirmShipment: '批量发货',
      Print: '打印',
      PickingList: '拣货单',
      PackingList: '装箱单',
      Label: '面单',
      PackingAndLabel: '装箱单 + 面单',
      picking: '拣货',
      packing: '打包',
      confirmShipment: '发货',
      view: '查看',
      review: '审核'
    },
    filter: {
      pattern: {
        placeholder: '搜索出库单号、订单号或商品编码'
      },
      type: {
        title: '类型',
        Multi: '多件',
        OneItem: '单件'
      },
      store: {
        title: '店铺'
      },
      user: {
        title: '客户',
        placeholder: '输入客户名称'
      },
      creator: {
        title: '创建者',
        placeholder: '输入创建者名称'
      },
      picker: {
        title: '拣货员',
        placeholder: '输入拣货员名称'
      },
      package: {
        title: '包材'
      },
      createTime: {
        title: '创建时间'
      },
      reason: {
        title: '原因',
        OutOfStock: '缺件',
        Damaged: '损坏',
        Others: '其他'
      }
    },
    orderDialog: {
      orderNo: '订单号',
      outboundNo: '出库单号',
      shipDate: '发货日期',
      salePrice: '产品售价',
      shipping: '运费',
      totalPrice: '总价',
      table: {
        sku: '商品编码',
        p_locationId: '计划库位',
        p_quantity: '计划数量',
        locationId: '实际库位',
        quantity: '实际数量',
        // table2
        size: '尺寸',
        weight: '重量',
        tackingNo: '货运单号',
        boxBarcode: '箱条码',
        skuQty: '商品数',
        // action: '操作',

        // 批量出库字段
        user: '客户',
        // packing
        availableQty: '可用数量',
        qtyInPackage: '包裹内件数',
        packSkuQuantity: '数量'
      },
      addProduct: '添加商品',
      update: '保存',
      printPickingList: '确认拣货 + 打印',
      confirmPicking: '确认拣货',
      confirmPickingTip: '提示：实际拣货数量与计划拣货数量不匹配，是否确认拣货？',
      // 出库弹窗
      batchNo: '批次号',
      client: '客户',
      confirmShipment: '确认发货',
      // packing
      packageType: '包材类型',
      packageQty: '包裹数量',
      packed: '打包',
      packageInformation: '包裹信息',
      confirmPacking: '确认打包',
      confirmPackingAndPrint: '确认打包 + 打印',
      // print 打印
      pickingList: '拣货单',
      packingList: '打包单',
      warehouse: '仓库',
      picker: '拣货员',
      printTime: '打印时间',
      location: '库位',
      skuName: '商品名',
      skuNum: '数量',
      page: '页数',
      totalItem: '商品总数',
      print: '打印',
      // 创建面单
      createLabel: '创建运单',
      createLabelTip: '您需要为创建运单付费',
      rateShopping: '一键计费',
      service: '服务',
      account: '账号',
      rateQuote: '价格报价',
      pickupDate: '取件日期',
      check: '查看',
      continue: '继续'
    }
  }
}
