#!/usr/bin/env node

const nodeFS = require('fs');
const nodePath = require('path');
const {parseArgs} = require('util');
const {getBundlerEntries, specifyPackageName, getPackageName} = require('./config.cjs');
const {setUsage, expect} = require('./helper.cjs');


const USAGE = `
  [usage]:
    ./scripts/make_test_html.cjs --package echarts
    ./scripts/make_test_html.cjs --package vue-echarts

  [options]:
    --package
      npm package name. e.g., echarts, vue-echarts
`
setUsage(USAGE);


const makeTopHTML = (iframePathList) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <style>
      html, body {
        padding: 0;
        margin: 0;
      }
      iframe {
        width: 80%;
        height: 300px;
        margin: 10px;
        padding: 0;
      }
    </style>
${
  iframePathList.map(
    ifrPath => `<h3>${ifrPath}</h3><iframe src="${ifrPath}"></iframe>`
  ).join('\n')
}
  </body>
</html>
`;

const makeIframeHTML = (jsPath) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <style>
      html, body {
        padding: 0;
        margin: 0;
      }
      #main0, x-vue-echarts {
        width: 600px;
        height: 400px;
        pading: 0;
        margin: 0;
      }
    </style>
    <div id="main0"></div>
    <script src="${jsPath}"></script>
  </body>
</html>
`;

function createHTML(pkgName) {
  const distDirPath = nodePath.resolve(__dirname, `../dist/${pkgName}`);
  if (!nodeFS.existsSync(distDirPath)) {
    nodeFS.mkdirSync(distDirPath);
  }

  const ifrHTMLFileNameList = [];
  Object.keys(getBundlerEntries()).forEach(entryName => {
    const ifrHTMLPath = nodePath.join(distDirPath, `${entryName}.html`);
    console.log(`[test_html] ${ifrHTMLPath}`);
    const ifrContent = makeIframeHTML(entryName);
    nodeFS.writeFileSync(ifrHTMLPath, ifrContent);
    ifrHTMLFileNameList.push(`${pkgName}/${entryName}.html`);
  });

  const mainHTMLPath = nodePath.resolve(__dirname, `../dist/main.html`);
  console.log(`[test_html] ${mainHTMLPath}`);
  nodeFS.writeFileSync(mainHTMLPath, makeTopHTML(ifrHTMLFileNameList));
}

function main() {
  const argOptions = {
    'package': {
      type: 'string',
    },
  };

  const parsedArgs = parseArgs({options: argOptions, args: process.argv, strict: false});
  let pkgName = parsedArgs.values.package;
  expect(pkgName, '--package is required.');

  specifyPackageName(pkgName);
  pkgName = getPackageName();

  createHTML(pkgName);
}

main();
