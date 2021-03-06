const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'development',
  // 入口文件
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js',
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    shared: 'lodash',
  },
  // 错误跟踪
  devtool: 'inline-source-map',
  // 输出文件
  output: {
    filename: './static/js/[name]-[contenthash].js',
    // path.resolve() 解析路劲为绝对路径
    path: path.resolve(__dirname,'dist'),
    clean: true
  },
  module:{
    rules:[
      {
        test:/\.css$/i,
        use:[
          'style-loader',
          'css-loader',
        ]
      },
      {
        // 处理图片资源
        test: /\.(png|jpg|gif|svg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './static/img/[name]-[hash].[ext]',
        }
      },
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }
    ]
  },
  // webpack-dev-server 配置
  devServer:{
    static: './dist', 
    hot: true, // 热重载
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'bzpen',
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "./public", to: "./public/" 
      }]
    })
  ],
  // optimization:{
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // }
}
