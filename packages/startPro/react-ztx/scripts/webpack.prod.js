const {merge} = require('webpack-merge')
const getBaseConfig = require('./webpack.base')  
const path = require('path')
const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(getBaseConfig(false), {
    mode: 'production',
    optimization: {
        minimize: true, //开启压缩
        minimizer: [
            new MiniCssExtractPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn', 'console.error']
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/, /* 仅提取node_modules中的模块 */
                    // miniChunck:3,
                    // miniSize: 30000,
                },
                commons: {
                    name: 'commons',
                }
            }
        }
    }
})