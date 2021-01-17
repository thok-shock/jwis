
const path = require('path')
const CURR_PATH = process.env.NODE_ENV === 'prod' ? path.join(__dirname, 'dist/') : path.join(__dirname, 'dev/');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//console.log(path.resolve(__dirname, "dist"))

module.exports = {
    mode: 'development',
    entry: [
        './src/index.js',
        'webpack-hot-middleware/client'
    ],
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    devServer: {
      hot: true
    },
    output: {
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'development',
        template: 'dev/index.html',
        filename: 'dev/index.html',
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };