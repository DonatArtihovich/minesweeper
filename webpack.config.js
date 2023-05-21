const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './minesweeper/src/index.js',
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext]`;
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Minesweeper',
    }),
    new FaviconsWebpackPlugin({
      logo: './minesweeper/src/assets/images/icon.png',
    }),
  ],
};
