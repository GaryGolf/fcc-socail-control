const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const options = {
    module: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]'
  };

const devCilentConfig = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader', options }] }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) })
  ]
};

module.exports = devCilentConfig;
