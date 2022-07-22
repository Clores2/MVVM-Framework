// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {

    // 指定入口文件
    entry: "./src/index.js",

    // 指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        //打包后文件的名字
        filename: "bundle.js",
        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false //兼容ie10
        }
    


    },
    //指定webpack打包时要使用的模块
    module: {
        // 指定要loader加载的规则
        rules: [
            // 设置js文件的处理
            {
                // test指定的时规则生效的文件
                test: /\.js$/,//以js结尾的文件
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器及版本
                                        targets: {
                                            "chrome": "58",
                                            "ie": "8"
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式 "usage"  表示按需加载
                                        "useBuiltIns": "usage" 
                                    }

                                ]
                            ]
                        }
                    },
                
                ],
                // 要排除的文件
                exclude: /node-modules/
            },
            // 设置css文件的处理
            {
                test: /\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //  引入postcss
                    {
                        loader: "postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions',//兼容每个浏览器最新的两个版本
                                        }
                                    ]
                                ]
                            }
                        }

                    },
                    // "less-loader"
                ]
            }

        ]
    },
    mode: "development", //设置mode
    watch: true,
    // devServer: {
    //     static: {                               
    //       directory: path.join(__dirname, './dist'),  
    //       watch: true
    //     }
    // },


    //配置Webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
          
            template: "./demo/index.html" 
        }),
    ],

    // 用来设置引用模块，可以将这些文件识别为模块
    resolve: {
        extensions: ['.js']
    }
}
