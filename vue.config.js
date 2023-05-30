const path = require('path')

module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 7777
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'lance-element-vue2'
    }
  },
  chainWebpack: config => {
    // vue默认@指向src目录，这里要修正为examples，另外新增一个~指向packages
    config.resolve.alias
      .set('lance-element-vue2', path.resolve(''))
      .set('@', path.resolve('examples'))

    // packages和examples目录需要加入编译
    config.module
      .rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'examples/assets/css/variables.scss'),
        path.resolve(__dirname, 'style/variables.scss')
      ]
    }
  }
}
