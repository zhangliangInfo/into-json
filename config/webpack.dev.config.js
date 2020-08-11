const path = require('path')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../example/src/index.tsx'),
  output: {
    path: path.join(__dirname, '../example/src/'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.min\.css/,
        loader: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.min\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../example/src/'),
    compress: true,
    host: '127.0.0.1',
    port: baseConfig.port,
    open: true
  }
}
const options = merge(devConfig, {module: baseConfig.module, resolve: baseConfig.resolve})
module.exports = options