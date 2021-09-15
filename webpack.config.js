const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            modules: true
          }
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new CopyPlugin([
      { from: 'src/index.html', to: 'index.html' }
    ]),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};
