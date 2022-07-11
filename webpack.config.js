/* eslint-disable no-undef */
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    bundle:  path.resolve(__dirname, 'src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: '[name][ext]'
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpeg|gif|mp3|jpg)$/i,
        type: 'asset/resource'
      }
    ]
  }
}