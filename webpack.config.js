const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry: [
    path.join(process.cwd(), './src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist/scripts'),
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        options: {
          presets: [ 'react-hmre' ]
        }
      },
      // {
      //   test: /\.hbs$/,
      //   loader: 'handlebars-loader' // transpile from .hbs to .html
      // },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/, // Check for css file names
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html'
    })
  ],
  devServer: {
    open: true, // to open the local server in browser
    contentBase: path.join(__dirname, '/src')
  }
};
