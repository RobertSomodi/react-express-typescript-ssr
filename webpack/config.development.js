'use strict';

const path = require('path');
const webpack = require("webpack");

const config = require('../config')(process.env.NODE_ENV);
const common = require('./common');

module.exports = function getDevelopmentConfig (dirname) {
  return {
    devtool: 'inline-source-map',
    entry: {
      app: [
        "react-hot-loader/patch",
        path.join(config.SRC_CLIENT_FOLDER, 'index'),
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server'
      ]
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          use: [ 'react-hot-loader/webpack', 'awesome-typescript-loader' ],
          include: config.SRC_CLIENT_FOLDER,
          exclude: path.resolve(dirname, 'node_modules')
        },
        {
          test: /\.scss$/,
          use: [ "style-loader", ...common.scssLoader ]
        },
        {
          test: /\.css$/,
          use: ['style-loader','css-loader']
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  };
};
