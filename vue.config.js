const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/midware/",
  // devServer: {
  //   proxy: {
  //     "/radar": {
  //       target: "https://hellogww.cn/callback", // 后端API
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
