const nodePath = require('path');
const {getBundlerEntries, getPackageName} = require('./config.cjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');


module.exports = {
// input: getBundlerEntries(),
  input: './test/esm/use_ec_esm_fext.js',
  output: {
    name: 'use_ec_esm_fext.js',
    dir: nodePath.join('dist', getPackageName()),
    format: 'umd',
  },
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
};
