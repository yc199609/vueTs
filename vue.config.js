const path = require('path')

module.exports = {
    publicPath: '/', // 静态资源地址
    productionSourceMap: false,
    devServer: {
        proxy: {
            "/api": {
                target: 'http://devopt.gosafenet.com', // 域名
                // ws: true, // 是否启用websockets
                changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrith: {
                    '^/api': '/api'
                },
                // logLevel: 'debug'
            },
        },
        port: 9001
    },
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'scss',
          patterns: [
            path.resolve(__dirname, 'src/styles/_variable.scss'),
            path.resolve(__dirname, 'src/styles/_mixin.scss')
          ]
        }
    },
}
