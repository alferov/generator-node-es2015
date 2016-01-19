var webpack = require('webpack');

module.exports = {
  entry: './src/module.js',
  output: {
    path: './dist',
    filename: 'module.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
