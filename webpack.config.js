const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaderQuery = {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    localIdentName: '[local]__[hash:base64:5]'
  };

const extractTextPluginOptions = {
  fallback: 'style-loader', use: [{ loader: 'css-loader', query: cssLoaderQuery }]
}

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
      { test: /\.css$/, use: ExtractTextPlugin.extract(extractTextPluginOptions) }
    ]
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) })
  ]
};

module.exports = devCilentConfig;
