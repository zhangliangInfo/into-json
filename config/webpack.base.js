module.exports = {
	port: 6001,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(tsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}