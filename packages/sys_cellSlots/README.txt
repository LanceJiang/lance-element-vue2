// 1. 该文件夹 下的相关渲染都是系统内_公用 统一 .jsx
// 2. 使用该配置在项目中运用 需要 添加 babel additional
//    eg: chainWebpack:     config.module
                       .rule('jsx')
                       .include.add(/node_modules\/lance-element-vue2\/packages\/sys_cellSlots/).end()
                       .use('babel')
                       .loader('babel-loader')
