const path = require('path')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV

let output = {}
let umdPlugin = {}

if(NODE_ENV === 'production') {
  output = {
    path: path.join(__dirname, '../lib/'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  }
} else if(NODE_ENV === 'umd') {
  output = {
    path: path.join(__dirname, '../umd/'),
    filename: 'index.js',
    library: 'IntoJSON',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }

  umdPlugin = {
    test: /\.((js|ts)x?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          ['@babel/plugin-transform-modules-umd', {
            "globals": {
              "es6-promise": "Promise"
            }
          }]
        ]
      }
    }
  }
}

const prodConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.tsx'),
  output,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.min\.css/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader?modules']
      },
      {
        ...umdPlugin
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.min.css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
}

const options = merge(prodConfig, {module: baseConfig.module, resolve: baseConfig.resolve})

module.exports = options