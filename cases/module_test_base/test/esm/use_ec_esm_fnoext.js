/**
 * In this case:
 * + ESM
 * + File extensions are NOT fully specified.
 * + JS (not TS)
 */

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


// -------------------------
// echarts basic usage
// -------------------------
import * as echarts from 'echarts';
import * as echartsCore from 'echarts/core';
import * as echartsLibECharts from 'echarts/lib/echarts';

expect(isFunction(echarts.init));
expect(isFunction(echartsCore.init));
expect(isFunction(echartsLibECharts.init));

// Import bar charts, all suffixed with Chart
import { BarChart } from 'echarts/charts';

expect(isFunction(BarChart));

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

expect(isFunction(TitleComponent));
expect(isFunction(TooltipComponent));
expect(isFunction(GridComponent));
expect(isFunction(DatasetComponent));
expect(isFunction(TransformComponent));

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

expect(isFunction(LabelLayout));
expect(isFunction(UniversalTransition));

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

expect(isFunction(CanvasRenderer));

// Register the required components
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);


// ---------------------------
// echarts built-in extensions
// ---------------------------
import { gexf as gexf1 } from 'echarts/extension/dataTool';
import { gexf as gexf2 } from 'echarts/extension/dataTool/index';
import * as gexf4 from 'echarts/extension/dataTool/gexf';
expect(isFunction(gexf1.parse));
expect(isFunction(gexf2.parse));
expect(isFunction(gexf4.parse));


// ------------------------------
// echarts import export directly
// ------------------------------
import { extendComponentModel } from 'echarts/lib/export/api';
expect(isFunction(extendComponentModel));


// -------------------------
// zrender
// -------------------------
import * as zrender from 'zrender';
import * as zrUtil from 'zrender/lib/core/util';
expect(isFunction(zrender.init));
expect(isFunction(zrUtil.isTypedArray));


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

export function getOK() {
  return _isOK;
}
