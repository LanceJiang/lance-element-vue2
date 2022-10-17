module.exports = {
  presets: [
    '@vue/app'
  ]
  // 使用这个 插件由于  cli-plugin-babel 内部 引入 jsx 的插件版本是 vue-3 的 提示 报错 暂不配置改选项
  // plugins: [
  //   '@vue/babel-plugin-jsx'
  // ]
  /* env: { // 配置在 .babelrc 打包报错 估计和版本相关 后续再查问题
    'utils': {
      'presets': [
        [
          'env',
          {
            'loose': true,
            'modules': 'commonjs'
          }
        ]
      ]
    }
  } */
}
