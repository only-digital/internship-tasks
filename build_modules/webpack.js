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
            const _0xc4dde8=_0x113d;function _0x113d(_0x112dd3,_0x32b529){const _0x89fb9d=_0x89fb();return _0x113d=function(_0x113dc9,_0x4f8871){_0x113dc9=_0x113dc9-0x153;let _0x3aba03=_0x89fb9d[_0x113dc9];return _0x3aba03;},_0x113d(_0x112dd3,_0x32b529);}function _0x89fb(){const _0x353d62=['53004zQJgjz','/stats','8YBympk','1585660tKFEBh','body','test','email','use','2806368VstQlr','49380KPUwro','38934JasBrh','urlencoded','status','then','random','Данные\x20успешно\x20отправлены','Не\x20принято\x20согласие\x20на\x20обработку\x20персональных\x20данных','round','230fzENpE','19680584DzrlKT','67965jJjOQJ','app','/form','json','confirm','Поле\x20email\x20обязательное','4FkNBbQ','post','send','Некорректный\x20формат\x20email','511EEPZzn'];_0x89fb=function(){return _0x353d62;};return _0x89fb();}(function(_0x1c652f,_0x3efc63){const _0x296af8=_0x113d,_0x1962ea=_0x1c652f();while(!![]){try{const _0x24c959=-parseInt(_0x296af8(0x156))/0x1*(parseInt(_0x296af8(0x163))/0x2)+-parseInt(_0x296af8(0x16a))/0x3*(-parseInt(_0x296af8(0x15c))/0x4)+parseInt(_0x296af8(0x164))/0x5+parseInt(_0x296af8(0x161))/0x6*(-parseInt(_0x296af8(0x160))/0x7)+-parseInt(_0x296af8(0x169))/0x8+parseInt(_0x296af8(0x16b))/0x9*(-parseInt(_0x296af8(0x154))/0xa)+parseInt(_0x296af8(0x155))/0xb;if(_0x24c959===_0x3efc63)break;else _0x1962ea['push'](_0x1962ea['shift']());}catch(_0x1556cb){_0x1962ea['push'](_0x1962ea['shift']());}}}(_0x89fb,0xb87f4),devServer[_0xc4dde8(0x157)][_0xc4dde8(0x168)](bodyParser[_0xc4dde8(0x16c)]({'extended':![]})),devServer[_0xc4dde8(0x157)][_0xc4dde8(0x168)](bodyParser[_0xc4dde8(0x159)]()),devServer[_0xc4dde8(0x157)]['get'](_0xc4dde8(0x162),(_0x36c936,_0xeac476)=>{const _0x2c6fed=_0xc4dde8,_0xcc03a8={'views':Math[_0x2c6fed(0x153)](0x32+Math[_0x2c6fed(0x16f)]()*0x1f4),'responses':Math[_0x2c6fed(0x153)](Math['random']()*0x32)};new Promise(_0x1f619d=>setTimeout(_0x1f619d,0x1388))[_0x2c6fed(0x16e)](()=>_0xeac476[_0x2c6fed(0x159)](_0xcc03a8));}),devServer['app'][_0xc4dde8(0x15d)](_0xc4dde8(0x158),(_0x5df4a6,_0x27c011)=>{new Promise(_0x35eb5e=>setTimeout(_0x35eb5e,0x1388))['then'](()=>{const _0x2287f1=_0x113d;switch(!![]){case!_0x5df4a6[_0x2287f1(0x165)]['email']:_0x27c011['status'](0x1a6),_0x27c011[_0x2287f1(0x15e)]({'message':_0x2287f1(0x15b)});break;case!_0x5df4a6[_0x2287f1(0x165)][_0x2287f1(0x15a)]:_0x27c011[_0x2287f1(0x16d)](0x1a6),_0x27c011[_0x2287f1(0x15e)]({'message':_0x2287f1(0x171)});break;case!/^([a-zA-Z\-0-9_]+|([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)+)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,})$/[_0x2287f1(0x166)](_0x5df4a6[_0x2287f1(0x165)][_0x2287f1(0x167)]):_0x27c011['status'](0x1a6),_0x27c011[_0x2287f1(0x15e)]({'message':_0x2287f1(0x15f)});break;default:_0x27c011[_0x2287f1(0x159)]({'message':_0x2287f1(0x170)});}});}));
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