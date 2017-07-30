const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(process.cwd(), './src/app-client.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
        test: /\.css$/, //Check for sass or scss file names
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
  ],
  devServer: {
    open: true, // to open the local server in browser
    contentBase: __dirname + '/src',
  }
};
