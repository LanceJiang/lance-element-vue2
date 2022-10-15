module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    '@vue/babel-plugin-jsx'
  ]
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
