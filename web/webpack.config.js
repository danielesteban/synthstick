const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '..', 'src', 'renderer', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      electron: path.resolve(__dirname, 'clock.js'),
    },
  },
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  performance: { hints: false },
  stats: { children: false, entrypoints: false, modules: false },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true },
      template: path.join(__dirname, 'index.ejs'),
    }),
  ],
};
