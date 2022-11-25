/**
 * select Option 自定义 渲染
 * @param slotOption
 * @param option
 * @param label
 * @returns {*}
 */
export const renderSelectOption = function(slotOption, option, label) {
  if (slotOption) {
    const args = [{
      option,
      label
    }]
    let scopedSlots_option = slotOption
    if (typeof slotOption === 'string') {
      scopedSlots_option = this.$scopedSlots[slotOption]
    } else {
      args.unshift(this.$createElement)
    }
    if (typeof scopedSlots_option === 'function') {
      // scopedSlots
      return scopedSlots_option(...args)
    }
  }
  return label
}
