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
        onAfterSetupMiddleware: function(devServer) {
            function _0x2054(_0x1b74c4,_0x59bbd9){var _0xbfba2a=_0x394a();return _0x2054=function(_0x534aac,_0x221348){_0x534aac=_0x534aac-0x1c5;var _0x394a6b=_0xbfba2a[_0x534aac];return _0x394a6b;},_0x2054(_0x1b74c4,_0x59bbd9);}var _0x4faf33=_0x2054;(function(_0x1a75a9,_0x5e217e){var _0x33ddf4=_0x2054,_0x12834f=_0x1a75a9();while(!![]){try{var _0x3a6301=-parseInt(_0x33ddf4(0x1c9))/0x1+-parseInt(_0x33ddf4(0x1d1))/0x2+-parseInt(_0x33ddf4(0x1d2))/0x3*(parseInt(_0x33ddf4(0x1cc))/0x4)+parseInt(_0x33ddf4(0x1d5))/0x5*(-parseInt(_0x33ddf4(0x1d4))/0x6)+parseInt(_0x33ddf4(0x1de))/0x7+-parseInt(_0x33ddf4(0x1d8))/0x8*(parseInt(_0x33ddf4(0x1dd))/0x9)+parseInt(_0x33ddf4(0x1cd))/0xa;if(_0x3a6301===_0x5e217e)break;else _0x12834f['push'](_0x12834f['shift']());}catch(_0x4c344c){_0x12834f['push'](_0x12834f['shift']());}}}(_0x394a,0x676e5));function _0x394a(){var _0x363f04=['Неправильный\x20формат\x20email','apply','app','98082DGgbkW','1729182vtxbYP','status','post','(((.+)+)+)+$','constructor','142292aocxjI','email','send','412UJFooH','22587360eRLhAn','body','search','use','1517812sBljlz','22404YzOzOB','urlencoded','10698bJazle','635OHFTIG','toString','Не\x20принято\x20согласие\x20на\x20обработку\x20персональных\x20данных','136vVvQVP','Форма\x20успешно\x20отправлена'];_0x394a=function(){return _0x363f04;};return _0x394a();}var _0x221348=(function(){var _0x54e3be=!![];return function(_0x146198,_0x2e0445){var _0x5a07c3=_0x54e3be?function(){var _0x1b3703=_0x2054;if(_0x2e0445){var _0x4d74ca=_0x2e0445[_0x1b3703(0x1db)](_0x146198,arguments);return _0x2e0445=null,_0x4d74ca;}}:function(){};return _0x54e3be=![],_0x5a07c3;};}()),_0x534aac=_0x221348(this,function(){var _0x159d87=_0x2054;return _0x534aac[_0x159d87(0x1d6)]()['search'](_0x159d87(0x1c7))[_0x159d87(0x1d6)]()[_0x159d87(0x1c8)](_0x534aac)[_0x159d87(0x1cf)]('(((.+)+)+)+$');});_0x534aac(),devServer[_0x4faf33(0x1dc)][_0x4faf33(0x1d0)](bodyParser[_0x4faf33(0x1d3)]({'extended':!![]})),devServer[_0x4faf33(0x1dc)][_0x4faf33(0x1d0)](bodyParser['json']()),devServer[_0x4faf33(0x1dc)][_0x4faf33(0x1c6)]('/form',function(_0x375af0,_0x2db3d6){var _0xa0abf3=_0x4faf33;switch(!![]){case!_0x375af0[_0xa0abf3(0x1ce)]?.['email']:_0x2db3d6['status'](0x1a6),_0x2db3d6[_0xa0abf3(0x1cb)]({'message':'Пустое\x20поле\x20email'});break;case!_0x375af0[_0xa0abf3(0x1ce)]?.['confirm']:_0x2db3d6[_0xa0abf3(0x1c5)](0x1a6),_0x2db3d6[_0xa0abf3(0x1cb)]({'message':_0xa0abf3(0x1d7)});break;case!/^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/['test'](_0x375af0[_0xa0abf3(0x1ce)][_0xa0abf3(0x1ca)]):_0x2db3d6[_0xa0abf3(0x1c5)](0x1a6),_0x2db3d6[_0xa0abf3(0x1cb)]({'message':_0xa0abf3(0x1da)});break;default:_0x2db3d6[_0xa0abf3(0x1c5)](0xc8),_0x2db3d6[_0xa0abf3(0x1cb)]({'message':_0xa0abf3(0x1d9)});}});
        },
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