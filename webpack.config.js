const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin')


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
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js'
  },
  module: {
    rules: [pug, styles, img, etc]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true
      }
    }),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new ManifestPlugin({ fileName: 'asset-manifest.json', })
  ]
};
module.exports = config;