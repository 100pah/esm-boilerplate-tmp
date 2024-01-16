const nodePath = require('path');
const {getBundlerEntries, getPackageName} = require('./config.cjs');

const PROJECT_ROOT = nodePath.join(__dirname, '..')

module.exports = {
  entry: getBundlerEntries(),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.m?js$/,
        // Also transform node_modules.
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
        vue: 'vue/dist/vue.js'
    },
  },
  output: {
    filename: '[name]',
    path: nodePath.resolve(PROJECT_ROOT, 'dist', getPackageName()),
    library: {
      type: 'umd',
      name: 'csc-scratch-demo',
    },
  },
  plugins: [
  ],

  devtool: 'inline-source-map',
  mode: 'development',

  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  devServer: {
    static: {
      directory: nodePath.join(PROJECT_ROOT, 'dist'),
    },
    // compress: true,
    port: 8765,
  },

};
