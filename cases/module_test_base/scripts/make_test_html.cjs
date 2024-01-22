#!/usr/bin/env node

const nodeFS = require('fs');
const nodePath = require('path');
const {parseArgs} = require('util');
const {
  getBundlerEntries,
  getTSOut,
  specifyPackageName,
  getPackageName
} = require('./config.cjs');
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

const makeIframeBundleHTML = (jsPath) => `
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
        padding: 0;
        margin: 0;
      }
    </style>
    <div id="main0"></div>
    <script src="${jsPath}"></script>
  </body>
</html>
`;

const makeIframeESMHTML = ({importMapJSONString, jsPath}) => `
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
        padding: 0;
        margin: 0;
      }
    </style>
    <div id="main0"></div>
    <script type="importmap">
      ${importMapJSONString}
    </script>
    <script type="module" src="${jsPath}"></script>
  </body>
</html>
`;


function createHTML(pkgName) {
  const ifrHTMLFileNameList = [];

  const distDirPath = nodePath.resolve(__dirname, `../dist/${pkgName}`);
  if (!nodeFS.existsSync(distDirPath)) {
    nodeFS.mkdirSync(distDirPath);
  }

  Object.keys(getBundlerEntries()).forEach(entryPath => {
    const ifrHTMLPath = nodePath.join(distDirPath, `${entryPath}.html`);
    console.log(`[test_html] ${ifrHTMLPath}`);

    const ifrContent = makeIframeBundleHTML(entryPath);

    nodeFS.writeFileSync(ifrHTMLPath, ifrContent);
    ifrHTMLFileNameList.push(`${pkgName}/${entryPath}.html`);
  });

  const distTSDirPath = nodePath.resolve(__dirname, `../dist/${pkgName}/ts_out`);
  if (!nodeFS.existsSync(distTSDirPath)) {
    nodeFS.mkdirSync(distTSDirPath);
  }

  const tsOut = getTSOut();
  tsOut.entryPathList.forEach(entryPath => {
    const ifrHTMLPath = nodePath.join(distTSDirPath, `${entryPath}.html`);
    console.log(`[test_html_ts] ${ifrHTMLPath}`);

    const ifrContent = makeIframeESMHTML({
      importMapJSONString: JSON.stringify(tsOut.importMap),
      jsPath: nodePath.basename(entryPath)
    });

    nodeFS.writeFileSync(ifrHTMLPath, ifrContent);
    ifrHTMLFileNameList.push(`${pkgName}/ts_out/${entryPath}.html`);
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
