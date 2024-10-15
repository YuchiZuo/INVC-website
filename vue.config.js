const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8082
  },
  chainWebpack: config => {
    config.plugin('html')
        .tap(args => {
          args[0].title="伊诺维克实验室";
          return args;
        })
  }
})
