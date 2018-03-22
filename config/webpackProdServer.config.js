const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
  },
  devtool: 'source-map',
  stats: {
    colors: true,
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
    },
  },
};
