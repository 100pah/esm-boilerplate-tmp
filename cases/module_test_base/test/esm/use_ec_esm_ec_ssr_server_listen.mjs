#!/usr/bin/env node

import nodeHTTP from 'node:http';
import nodeURL from 'node:url';
import nodeQueryString from 'node:querystring';
import * as echarts from 'echarts';


const HTTP_PORT = 58123;
const DEBUG = 1;

function debugLog() {
  if (DEBUG) {
    console.log.apply(console, arguments);
  }
}

function makeECOption(chartMutableOption) {
  const seriesData = [{
    type: 'bar',
    name: 'a',
    data: [31, 43, 23, 54, 65, 23, 43]
  }, {
    type: 'bar',
    name: 'b',
    data: [63, 53, 73, 23, 43, 23, 43]
  }, {
    type: 'bar',
    name: 'silent',
    data: [32, 55, 31, 65, 54, 43, 65],
    silent: true
  }];

  const option = {
    legend: {
      data: ['a', 'b'],
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      // show: false
    },
    yAxis: {
      // show: false
    },
    series: seriesData
  };

  return echarts.util.merge(option, chartMutableOption, true);
}

function renderChart(chartMutableOption) {
  const ecOption = makeECOption(chartMutableOption);

  // During transition
  const serverChart = echarts.init(null, null, {
    width: 500,
    height: 300,
    renderer: 'svg',
    ssr: true,
  });

  const width = serverChart.getWidth();
  const height = serverChart.getHeight();
  debugLog(`[serverChart] width: ${width}, height: ${height}`);

  serverChart.setOption(ecOption);
  debugLog('before serverChart.renderToSVGString()');
  const svg = serverChart.renderToSVGString()
  debugLog('after serverChart.renderToSVGString()');
  serverChart.dispose();

  return svg;
}

function handleRequest(req, res) {
  debugLog('received', req.method);

  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const chartStateStr = url.searchParams.get('chartMutableOption');
      const chartMutableOption = JSON.parse(chartStateStr);
      debugLog(chartMutableOption);

      const ecSVG = renderChart(chartMutableOption);

      writeJSONPResEnd(res, 200, {errno: 0, ecSVG});
    }
  }
  catch (err) {
    writeJSONPResEnd(res, 200, {errno: 1, msg: err.message});
  }
}

function writeJSONPResEnd(res, code, jsonBody) {
    const bodyStr = `
      __chart_ssr_cb__(
        ${JSON.stringify(jsonBody)}
      )
    `;
    var headers = {
        'Content-Type': 'text/javascript',
        'Content-Length': Buffer.byteLength(bodyStr),
    };
    res.writeHead(code, headers);
    res.end(bodyStr);
}

function serverMain() {
  debugLog('server started at port: ', HTTP_PORT);
  nodeHTTP.createServer(handleRequest).listen(HTTP_PORT);
}

serverMain();
