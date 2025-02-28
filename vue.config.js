const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  //...
  devServer: {
    allowedHosts: [
      'https://wn7107sv6078', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.vicp.fun'   // .是二级域名的通配符   
    ],
  },
};