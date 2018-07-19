const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const devCilentConfig = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist'),
    libraryTarget: 'commonjs'
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    rules: [

      { 
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader' 
      },{ 
        test: /\.css$/, 
        use: [ 
          { 
            loader: 'style-loader' 
          },{ 
            loader: 'css-loader', 
            options: {
              module: true,
              sourceMap: true,
              localIdentName: '[local]__[hash:base64:5]'
            } 
          }
        ]
      }

    ]
  }
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) })
  ]
};

module.exports = devCilentConfig;
