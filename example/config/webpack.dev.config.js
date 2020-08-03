const path = require('path')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../src/app.js'),
  output: {
    path: path.join(__dirname, '../src/'),
    filename: 'bundle.js'
  },
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
    port: 5050,
    open: true
  }
}

module.exports = Object.assign({}, devConfig, {module: baseConfig.module})