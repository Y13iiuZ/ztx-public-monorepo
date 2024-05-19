const {merge} = require('webpack-merge')
const getBaseConfig = require('./webpack.base')  
const path = require('path')

module.exports = merge(getBaseConfig(true), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        compress: false, //开发环境不压缩
        hot: true, //开启热更新
        historyApiFallback: true, //history路由下的404问题
        // open: true,
        static: {
            //托管的静态public文件夹
            directory: path.join(__dirname, '../public'),
        }
    }
})