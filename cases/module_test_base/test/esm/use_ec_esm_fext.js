/**
 * In this case:
 * + ESM
 * + File extensions are fully specified.
 * + JS (not TS)
 */

let _isOK = true;
export function expect(cond) {
  if (!cond) {
    _isOK = false;
    throw new Error('expect failed'); // not work in vitest
  }
}

export function isFunction(obj) {
  return typeof obj === 'function';
}


// -------------------------
// echarts basic usage
// -------------------------
import * as echarts from 'echarts';
import * as echartsCore1 from 'echarts/core';
import * as echartsCore2 from 'echarts/core.js';
import * as echartsLibECharts from 'echarts/lib/echarts.js';

expect(isFunction(echarts.init));
expect(isFunction(echartsCore1.init));
expect(isFunction(echartsCore2.init));
expect(isFunction(echartsLibECharts.init));

// Import bar charts, all suffixed with Chart
import { BarChart } from 'echarts/charts.js';

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
import { LabelLayout, UniversalTransition } from 'echarts/features.js';

expect(isFunction(LabelLayout));
expect(isFunction(UniversalTransition));

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers.js';

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
import { gexf as gexf3 } from 'echarts/extension/dataTool/index.js';
import * as gexf5 from 'echarts/extension/dataTool/gexf.js';
expect(isFunction(gexf3.parse));
expect(isFunction(gexf5.parse));


// ------------------------------
// echarts import export directly
// ------------------------------

import { extendComponentModel } from 'echarts/lib/export/api.js';
expect(isFunction(extendComponentModel));


// -------------------------
// zrender
// -------------------------
import * as zrender from 'zrender';
import * as zrUtil from 'zrender/lib/core/util.js';

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
