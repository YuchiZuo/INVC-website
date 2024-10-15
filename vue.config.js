const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8082
  },
  chainWebpack: config => {
    // 修改 HTML 插件的标题
    config.plugin('html')
      .tap(args => {
        args[0].title = "伊诺维克实验室";
        return args;
      });
    
    // 添加 Markdown 文件的处理规则
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  }
});
