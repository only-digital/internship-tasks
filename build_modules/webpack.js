const path  = require('path');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const bodyParser = require('body-parser')

module.exports = {
    mode: 'development',
    entry: {
        common: path.resolve(__dirname, 'common.js'),
    },
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'video',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'picture',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'srcset',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'source',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'link',
                                        attribute: 'href',
                                        type: 'src',
                                    }
                                ]
                            }
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js'),
                                sourceMap: true,
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff2|woff|ttf|otf)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts',
                        publicPath: path.join(__dirname, '..', 'src', 'assets', 'fonts')
                    },
                },
            },
            {
                test: /\.(png|jpe?g|avif|webp|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[hash:8].[ext]',
                    },
                },
                include: path.join(__dirname, '..', 'src', 'assets', 'images'),
            },
            {
                test: /\.(mp4|avi)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/videos/[name].[ext]',
                    },
                },
                include: path.join(__dirname, '..', 'src', 'assets', 'videos'),
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            outputPath: 'assets/sprites',
                        },
                    },
                    'svg-transform-loader',
                ],
                include: path.join(__dirname, '..', 'src', 'assets', 'icons'),
            }
        ]
    },
    devtool: 'source-map',
    target: ['web', 'es5'],
    devServer: {
        port: 3000,
        hot: true,
        open: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '..', 'src', 'pages', 'index.pug'),
        }),
        new SpriteLoaderPlugin({ plainSprite: true }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        })
    ]
}