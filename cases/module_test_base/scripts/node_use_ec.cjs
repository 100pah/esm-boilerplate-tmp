#!/usr/bin/env node

const nodeFS = require('fs');
const nodePath = require('path');
const {cmd} = require('./helper.cjs');
const {getNodeSrcList} = require('./config.cjs');


async function callNode(rawPath) {
  const path = nodePath.normalize(rawPath);
  try {
    await cmd(`node ${path}`, {NODE_RUNTIME_MODULE_LOADER: true});
  }
  catch (err) {
    console.error(err);
  }
}

async function main() {
  for (const item of getNodeSrcList()) {
    const absolutePath = nodePath.join(__dirname, '..', item.src);
    const tmpMJSFile = absolutePath.replace(/\.js$/, '_tmp.mjs');

    if (item.copyAsESMFile) {
      // The src file is '.js', because '.mjs' or package.json {"type": "module"} forces that
      // the request path in `import` has file extension fully specified, or need to set alias
      // in package.json {"exports": ...}. (webpack also follows this nodejs rules since v5).
      // So if we make src file as '.mjs' or package.json {"type": "module"}, it brings
      // unconvinience to run the cases in webpack5 on the previous version of echarts.
      // But we want to support this case run in nodejs, which requires '.mjs' or
      // package.json {"type": "module"} to make nodejs recogonize the file as ESM.
      // So we copy it to '.mjs' for running in nodejs.
      nodeFS.copyFileSync(absolutePath, tmpMJSFile);
    }

    await callNode(tmpMJSFile);

    if (item.copyAsESMFile) {
      nodeFS.rmSync(tmpMJSFile);
    }
  }
}

main();
