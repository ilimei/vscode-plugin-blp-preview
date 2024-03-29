/* eslint-disable @typescript-eslint/naming-convention */
//@ts-check

'use strict';

const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: fs.readdirSync('./src/custom-editor').filter(v => !v.endsWith('.ts')).reduce((ret, v) => {
    ret[`media/${v}`] = `./src/custom-editor/${v}/index.ts`;
    return ret;
  }, {
    'media/message': './src/custom-editor/message.ts',
    'dist/extension': './src/extension.ts'
  }), // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: __dirname,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'nosources-source-map',
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vsceignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|war3-model/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      { test: /\.html$/i, use: 'raw-loader', },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader,
        { loader: "css-loader", options: { url: false } },
        {
          loader: "less-loader"
        }],
      },
    ]
  }
};
module.exports = config;