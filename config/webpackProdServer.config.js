const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js'
  },
  devtool: 'source-map',
  stats: {
         colors: true
     },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
};
