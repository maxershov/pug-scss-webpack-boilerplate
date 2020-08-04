const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const pug = {
  test: /\.pug$/,
  loaders: ['html-loader', 'pug-html-loader']
};
const styles = {
  test: /\.(sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { importLoaders: 1 } },
    'postcss-loader',
    'sass-loader',
  ],
};
const img = {
  test: /\.(jpeg|jpg|png|gif|svg)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'images/',
      esModule: false
    }
  }]
};

const etc = {
  loader: require.resolve("file-loader"),
  exclude: [/\.(js|mjs|jsx|ts|tsx|jpe?g|png|gif|pug|svg|html|json|(sc|c)ss)$/],
  options: {
    name: "static/media/[name].[hash:8].[ext]",
    esModule: false
  }
};

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    watchContentBase: true,
    writeToDisk: true,
    progress: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true, // on 404 load publicPath => for BrowserRouter on refresh
  },
  module: {
    rules: [pug, styles, img, etc]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
    }),
    new MiniCssExtractPlugin()
  ]
};
module.exports = config;