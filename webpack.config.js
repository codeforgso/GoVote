const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    //'webpack-hot-middleware/client',
    path.join(process.cwd(), './src/app-client.js')
  ],
  output: {
    path: path.join(__dirname, 'src', 'static', 'scripts'),
    filename: 'bundle.js',
    publicPath: './src/static'
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),

    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: false,
    //   sourcemap: true,
    //   beautify: false,
    //   dead_code: false,
    // }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src/static'),  // New
  },
};
