const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry: [
    path.join(process.cwd(), './src/app-client.js')
  ],
  output: {
    path: path.join(__dirname, 'src'),
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
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader' // transpile from .hbs to .html
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
      template: './src/views/main.hbs'
    })
  ],
  devServer: {
    open: true, // to open the local server in browser
    contentBase: __dirname + '/src',
  }
};
