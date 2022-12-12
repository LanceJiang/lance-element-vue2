import { formatDateString, formatNumber, formatRate } from './index'

/**
 * 默认公用渲染cell render 申明：
 * 命名方式： {prefix: 'vxe_' || ''}cellSlot_{todo}
 *
 * 由于vxe-table 和 el(ad)-table(adber 自定义slot)的渲染申明有差异 在使用不同的 table类型需要做以区别
 * vxe_yourSlot VxeTable(ad-vxe-table)专用
 * yourSlot 没有标记的是  Table(ad-table) 专用
 */
//

// 金额美化渲染
export const vxe_cellSlot_price = (field_currency = 'currency', field_value = '') => ({ row, column }, h) => {
  let price = row[field_value || column.property]
  let fragment = ''
  if (!price && price !== 0) {
    fragment = <span class='cell-label'>-</span>
  } else {
    fragment = <div class='ad-cell_price'>
      {formatNumber(price, 2)}
      <span class='price_label'>{row[field_currency] || 'USD'}</span>
    </div>
  }
  return [fragment]
}
export const cellSlot_price = (field_currency = 'currency', field_value = '') => (h, { row, column }) => {
  let price = row[field_value || column.property]
  let fragment = ''
  if (!price && price !== 0) {
    fragment = <span class='cell-label'>-</span>
  } else {
    fragment = <div class='ad-cell_price'>
      {formatNumber(price, 2)}
      <span class='price_label'>{row[field_currency] || 'USD'}</span>
    </div>
  }
  return [fragment]
}
