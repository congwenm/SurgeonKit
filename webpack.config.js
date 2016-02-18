module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    library: 'surgeonkit',
    libraryTarget: 'umd',
    path: './build',
    filename: './index.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
