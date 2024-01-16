/**
 * In this case:
 * + CJS
 * + Running in node is supported.
 * + JS (not TS)
 */

// Node runtime module loader does not support cjs require esm, but bundlers do.
function detectIsNodeRuntimeModuleLoader() {
  return typeof process !== 'undefined' && process.env && process.env.NODE_RUNTIME_MODULE_LOADER;
}
const isNodeRuntimeModuleLoader = detectIsNodeRuntimeModuleLoader();


function expect(cond) {
  if (!cond) {
    throw new Error('expect failed');
  }
}

function isFunction(obj) {
  return typeof obj === 'function';
}


// -------------------------
// echarts basic usage
// -------------------------
const echarts = require('echarts');
expect(isFunction(echarts.init));


// --------------------------
// echarts built-in extension
// --------------------------
if (!isNodeRuntimeModuleLoader) {
  const { gexf: gexf1 } = require('echarts/extension/dataTool');
  const { gexf: gexf2 } = require('echarts/extension/dataTool/index');
  const { gexf: gexf3 } = require('echarts/extension/dataTool/index.js');
  const gexf4 = require('echarts/extension/dataTool/gexf');
  const gexf5 = require('echarts/extension/dataTool/gexf.js');
  expect(isFunction(gexf1));
  expect(isFunction(gexf2));
  expect(isFunction(gexf3));
  expect(isFunction(gexf4));
  expect(isFunction(gexf5));
}


// -------------------------
// zrender
// -------------------------
const zrender = require('zrender');
expect(isFunction(zrender.init));


// -------------------------
// echarts setOption
// -------------------------
function createChart() {
  if (typeof window === 'undefined') {
    return;
  }
  const dom = document.getElementById('main0');
  const chart = echarts.init(dom);
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  chart.setOption(option);
}

createChart();

console.log('Test passed.');

module.exports.isOK = true;
