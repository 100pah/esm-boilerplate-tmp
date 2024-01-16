#!/usr/bin/env node

const nodePath = require('path');
const {parseArgs} = require('util');
const {cmd, expect, setUsage} = require('./helper.cjs');


const USAGE = `
  [usage]:
    ./scripts/run.cjs --runtime webpack --package echarts
    ./scripts/run.cjs --runtime webpack --package vue-echarts
    ./scripts/run.cjs --runtime rollup
    ./scripts/run.cjs --runtime ts
    ./scripts/run.cjs --runtime node
    ./scripts/run.cjs --runtime vitest --package echarts
    ./scripts/run.cjs --runtime vitest --package vue-echarts
    ./scripts/run.cjs --runtime jest --package echarts
    ./scripts/run.cjs --runtime jest --package vue-echarts

  [options]:
    --runtime
      webpack, rollup, ts, node, vitest, jest
    --package
      npm package name. e.g., echarts, vue-echarts
`
setUsage(USAGE);

const basePath = nodePath.join(__dirname, '..');
const RUNTIME_CMD = {
  'webpack': `npx webpack --config "${basePath}/scripts/webpack.config.js"`,
  'rollup': `npx rollup --config "${basePath}/scripts/rollup.config.js"`,
  'ts': `npx tsc --noEmit`,
  'node': `node "${basePath}/scripts/node_use_ec.cjs"`,
  'vitest': `npx vitest --run --config "${basePath}/scripts/vitest.config.mjs"`,
  // 'jest': `NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest --debug --config "${basePath}/scripts/jest.config.mjs"`,
  'jest': `node --experimental-vm-modules ./node_modules/.bin/jest --debug --config "${basePath}/scripts/jest.config.mjs"`,
};


function main() {
  const argOptions = {
    'package': {
      type: 'string',
    },
    'runtime': {
      type: 'string',
      short: 'r',
    }
  };

  const parsedArgs = parseArgs({options: argOptions, args: process.argv, strict: false});
  const runtime = parsedArgs.values.runtime;
  expect(runtime, '--runtime is required.');
  const pkg = parsedArgs.values.package;
  expect(pkg, '--package is required.');

  const runtimeCmdStr = RUNTIME_CMD[runtime];
  expect(runtimeCmdStr, `--runtime ${runtime} is illegal.`);
  console.log(`[runtime] ${runtime}`);

  cmd(runtimeCmdStr, {cwd: basePath, env: {EC_MODULE_TEST_TARGET_PACKAGE: pkg}});

}

main();
