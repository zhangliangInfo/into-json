const path = require('path')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NODE_ENV = process.env.NODE_ENV

let output = {}
if(NODE_ENV === 'production') {
  output = {
    path: path.join(__dirname, '../lib/'),
    filename: '[name].js',
  }
} else if(NODE_ENV === 'umd') {
  output = {
    path: path.join(__dirname, '../umd/'),
    filename: 'index.js',
    library: 'IntoJSON',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
}

const prodConfig = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, '../src/index.js')
  },
  output,
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