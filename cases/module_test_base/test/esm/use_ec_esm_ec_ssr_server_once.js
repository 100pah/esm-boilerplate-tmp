import * as echarts from 'echarts';
import * as ssrClient from 'echarts/ssr/client/index';

let _isOK = true;
export function expect(cond) {
  if (!cond) {
    _isOK = false;
    throw new Error('expect failed');
  }
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

function serverMain() {
  console.log(ssrClient);
  // During transition
  const serverChart = echarts.init(null, null, {
    width: 500,
    height: 300,
    renderer: 'svg',
    ssr: true,
  });

  const width = serverChart.getWidth();
  const height = serverChart.getHeight();
  console.log(`[serverChart] width: ${width}, height: ${height}`);

  const seriesData = [
    {
      type: 'bar',
      name: 'a',
      data: [31, 43, 23, 54, 65, 23, 43],
    },
    {
      type: 'bar',
      name: 'b',
      data: [63, 53, 73, 23, 43, 23, 43],
    },
    {
      type: 'bar',
      name: 'silent',
      data: [32, 55, 31, 65, 54, 43, 65],
      silent: true,
    },
  ];

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
    series: seriesData,
  };

  serverChart.setOption(option);
  console.log('before serverChart.renderToSVGString()');
  const svg = serverChart.renderToSVGString()
  console.log('after serverChart.renderToSVGString()');
  serverChart.dispose();

  return svg;
}

serverMain();

export function getOK() {
  return _isOK;
}
