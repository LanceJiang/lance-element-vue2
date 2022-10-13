export const getOrders = (input) => {
  return new Promise(resolve => {
    setTimeout(() => {
      // 模拟数据
      const res = {
        data: []
      }
      resolve(res.data)
    }, 1000 * Math.random())
  })
}

export const getOrdersCount = (input) => {
  return new Promise(resolve => {
    setTimeout(() => {
      // 模拟数据
      const res = {
        total: 888
      }
      resolve(res.total)
    }, 1000 * Math.random())
  })
}
