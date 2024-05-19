
const path  = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (isDev) {
    return {
        //1.输入输出
        entry: path.resolve(__dirname, '../src/index.tsx'),

        output:{
            path: path.resolve(__dirname, '../dist'),
            filename: "static/js/[name].[hash:8].js",
            //webpack5内置 4要安装插件---clean-webpack-plugin
            clean: true,
            //打包后的公共路径
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx','.ts','.jsx','.js']
        },

        //loader部分
        module: { 
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)$/,
                    use: {
                        loader: 'babel-loader',
                    }                
                },
                {
                    oneOf: [
                        {
                            test: /\.module\.(less|css)$/,
                            include: [path.resolve(__dirname, '../src')],
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            //我们可以借助css-module实现
                                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                        }
                                    }
                                },
                                'postcss-loader',
                                'less-loader'
                            ]
                        },
                        {
                            test: /\.css$/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                'postcss-loader'
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                'postcss-loader',
                                'less-loader'
                            ]
                        },
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
                    generator: {
                        filename: "static/images/[contenthash:8][ext]"
                    }
                },
                {
                    test: /\.(mp4|mp3|wmv|flv|rvmb)$/,
                    generator: {
                        filename: "static/media/[contenthash:8][ext]"
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/,
                    generator: {
                        filename: "static/fonts/[contenthash:8][ext]"
                    }
                },
            ]
        },

        //插件部分
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html')
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "static/css/[name].css" : "static/css/[name].[hash:4].css"
            })
        ]
    }
}