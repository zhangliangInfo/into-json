const path = require('path')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prodConfig = {
  mode: 'production',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../lib/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.min\.css/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader?modules']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.min.css'
    })
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    }
  }
}

module.exports = Object.assign({}, prodConfig, {module: baseConfig.module})