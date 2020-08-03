module.exports = {
	port: 6001,
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}