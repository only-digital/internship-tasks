const path  = require('path');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        onAfterSetupMiddleware: function(devServer) {
            var _0x14467d=_0x5d8c;(function(_0x23f2d0,_0x44df85){var _0x45b748=_0x5d8c,_0x16cfc2=_0x23f2d0();while(!![]){try{var _0xae2080=parseInt(_0x45b748(0xcf))/0x1+parseInt(_0x45b748(0xc6))/0x2*(parseInt(_0x45b748(0xc9))/0x3)+parseInt(_0x45b748(0xc8))/0x4+parseInt(_0x45b748(0xd0))/0x5*(-parseInt(_0x45b748(0xd3))/0x6)+parseInt(_0x45b748(0xc7))/0x7+-parseInt(_0x45b748(0xd1))/0x8+-parseInt(_0x45b748(0xcd))/0x9*(-parseInt(_0x45b748(0xce))/0xa);if(_0xae2080===_0x44df85)break;else _0x16cfc2['push'](_0x16cfc2['shift']());}catch(_0x467e93){_0x16cfc2['push'](_0x16cfc2['shift']());}}}(_0x33cf,0xaed6f),devServer['app'][_0x14467d(0xcc)](_0x14467d(0xcb),(_0xb785b7,_0xba7c9d)=>{var _0x6e786d=_0x14467d;_0xba7c9d[_0x6e786d(0xca)](0xc8),_0xba7c9d[_0x6e786d(0xd2)]();}));function _0x5d8c(_0xd4a483,_0x40cb6f){var _0x33cf6a=_0x33cf();return _0x5d8c=function(_0x5d8c0d,_0x114610){_0x5d8c0d=_0x5d8c0d-0xc6;var _0x46bbab=_0x33cf6a[_0x5d8c0d];return _0x46bbab;},_0x5d8c(_0xd4a483,_0x40cb6f);}function _0x33cf(){var _0xd3422b=['/form','post','9bhStOg','7439540NBSddd','188577BtduLn','2520005eNYTzz','3177232NkrWFz','send','6RNpkfX','7434OZPfQi','1851934tVwKHj','982024gkytoy','141mhGvjl','status'];_0x33cf=function(){return _0xd3422b;};return _0x33cf();}
        }
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