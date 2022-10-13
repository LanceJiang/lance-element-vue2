export default {
  route: {
    location: 'Location',
    inventory: 'Inventory'
  },
  common: {
    confirm: {
      title: 'Notice',
      // 后期确认是否通过变量处理
      content: 'Do you want to confirm operation ?'
    },
    btn: {
      add: 'Add',
      restore: 'Restore',
      confirm: 'Confirm',
      saveChanges: 'Save Changes',
      cancel: 'Cancel'
    },
    selectAll: 'Select All',
    formIsRequired: ' is required',
    tableColumnFilterLabel: 'Select option to display on the table',
    noData: 'No Data',
    table: {
      action: 'Action'
    },
    refresh: 'Refresh',
    column: 'Column',
    copy: 'Copy'
  },
  outboundOrder: {
    tab: {
      AwaitingPicking: 'Awaiting Picking',
      Picking: 'Picking',
      AwaitingPacking: 'Awaiting Packing',
      ReadyToShip: 'Ready to Ship'
    },
    table: {
      user: 'User',
      orderNo: 'Order No.',
      skuQty: 'SKU Qty',
      outboundNo: 'Outbound No.',
      location: 'Location',
      multiple: 'Multiple',
      store: 'Store',
      // action: 'Action',
      picker: 'Picker',
      sku: 'Sku',
      size: 'Size',
      weight: 'Weight',
      package: 'Package',
      trackingNo: 'Tracking No.',
      service: 'Service',
      creator: 'Creator',
      createTime: 'CreateTime',
      batchNo: 'Batch No.',
      reason: 'Reason',
      status: 'Status',
      submittedBy: 'Submitted By',
      submittedTime: 'Submitted Time',
      shipmentNum: 'Print'
    },
    btn: {
      CreateBatch: 'Create Batch',
      CreateBatchTip: 'Create batch must be the same type of orders',
      BulkPicking: 'Bulk Picking',
      ConfirmShipment: 'Confirm Shipment',
      Print: 'Print',
      PickingList: 'Picking List',
      PackingList: 'Packing List',
      Label: 'Label',
      PackingAndLabel: 'Packing List + Label',
      picking: 'Picking',
      packing: 'Packing',
      confirmShipment: 'Confirm Shipment',
      view: 'View',
      review: 'Review'
    },
    filter: {
      pattern: {
        placeholder: 'Search by outbound number, order number or SKU'
      },
      type: {
        title: 'Type',
        Multi: 'Multi',
        OneItem: 'OneItem'
      },
      store: {
        title: 'Store'
      },
      user: {
        title: 'User',
        placeholder: 'Search by User Name'
      },
      creator: {
        title: 'Creator',
        placeholder: 'Search by Creator Name'
      },
      picker: {
        title: 'Picker',
        placeholder: 'Search by Picker Name'
      },
      package: {
        title: 'Package'
      },
      createTime: {
        title: 'Create Time'
      },
      reason: {
        title: 'Reason',
        OutOfStock: 'OutOfStock',
        Damaged: 'Damaged',
        Others: 'Others'
      }
    },
    orderDialog: {
      orderNo: 'Order No',
      outboundNo: 'Outbound No',
      shipDate: 'Ship Date',
      salePrice: 'Product Sale Price',
      shipping: 'Shipping',
      totalPrice: 'Total',
      table: {
        sku: 'SKU',
        p_locationId: 'Planned Location',
        p_quantity: 'Planned Qty',
        locationId: 'Actual Location',
        quantity: 'Actual Qty',
        // table2
        size: 'Size',
        weight: 'Weight',
        tackingNo: 'Tacking No.',
        boxBarcode: 'Box Barcode',
        skuQty: 'SKU Qty',
        // action: 'Action',
        // 批量出库字段
        user: 'User',
        // packing
        availableQty: 'Available Qty',
        qtyInPackage: 'Qty in Package',
        packSkuQuantity: 'Quantity'
      },
      addProduct: 'Add Product',
      update: 'Update',
      printPickingList: 'Confirm Picking + Print',
      confirmPicking: 'Confirm Picking',
      // eslint-disable-next-line
      confirmPickingTip: `Notice:The picking Qty doesn't match the planned Qty.confirm picking`,
      // 出库弹窗
      batchNo: 'Batch No',
      client: 'Client',
      confirmShipment: 'Confirm Shipment',
      // packing
      packageType: 'Package Type',
      packageQty: 'Package Qty',
      packed: 'Packed',
      packageInformation: 'Package Information',
      confirmPacking: 'Confirm Packing',
      confirmPackingAndPrint: 'Confirm Packing + Print',
      // print 打印
      pickingList: 'Picking List',
      packingList: 'Packing List',
      warehouse: 'Warehouse',
      picker: 'Picker',
      printTime: 'Print Time',
      location: 'Location',
      skuName: 'Name',
      skuNum: 'Qty',
      page: 'Page',
      totalItem: 'Total Item',
      print: 'Print',
      // 创建面单
      createLabel: 'Create Label',
      createLabelTip: 'You will be charged for creating the label',
      rateShopping: 'Rate Shopping',
      service: 'Service',
      account: 'Account',
      rateQuote: 'Rate Quote',
      pickupDate: 'Pickup Date',
      check: 'Check',
      continue: 'Continue'
    }
  }
}
