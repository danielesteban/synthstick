const webpack = require('webpack');
const GHPagesSPAWebpackPlugin = require('ghpages-spa-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '..', 'src', 'renderer', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    alias: {
      electron: path.resolve(__dirname, 'clock.js'),
    },
  },
  devtool: false,
  performance: { hints: false },
  stats: { children: false, entrypoints: false, modules: false },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: false },
      template: path.join(__dirname, 'index.ejs'),
    }),
    new GHPagesSPAWebpackPlugin({
      domain: 'synthstick.gatunes.com',
    }),
  ],
};
