const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  watch: ENV === 'development',
  target: 'electron-renderer',
  entry: './src/renderer_process.js',
  output: {
    path: __dirname + '/build',
    publicPath: '',
    filename: 'bundle.js'
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            "@babel/preset-react"
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' }
      ]
    }),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};
