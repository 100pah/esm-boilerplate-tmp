/**
 * In this case:
 * + ESM
 * + File extensions are NOT fully specified.
 * + TS
 */


export type Expect<T extends true> = T;

let _isOK = true;
export function expect(cond: unknown): void {
  if (!cond) {
    _isOK = false;
    throw new Error('expect failed');
  }
}

export function isFunction(obj: unknown): boolean {
  return typeof obj === 'function';
}


// -------------------------
// echarts basic usage
// -------------------------
import * as echarts from 'echarts';
import * as echartsCore from 'echarts/core';

// 'echarts/lib/echarts' is a deprecated usage, where TS not definded.
// import * as echartsLibECharts from 'echarts/lib/echarts';

type EChartsInitType = typeof echarts.init;

expect(isFunction(echarts.init));
expect(isFunction(echartsCore.init));
// expect(isFunction(echartsLibECharts.init));

// Import bar charts, all suffixed with Chart
import {
  BarChart,
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts';

type BarChartType = typeof BarChart;

expect(isFunction(BarChart));

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,

  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';

expect(isFunction(TitleComponent));
expect(isFunction(TooltipComponent));
expect(isFunction(GridComponent));
expect(isFunction(DatasetComponent));
expect(isFunction(TransformComponent));

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';

// type LabelLayoutTypeExpected = (registers: EChartsExtensionInstallRegisters) => void

type LabelLayoutType = typeof LabelLayout;


expect(isFunction(LabelLayout));
expect(isFunction(UniversalTransition));

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

type CanvasRendererType = typeof CanvasRenderer;

expect(isFunction(CanvasRenderer));

import type {
  ComposeOption,
} from 'echarts/core';

// Create an Option type with only the required components and charts via ComposeOption
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// Type error: need to fix.
// Register the required components
// echarts.use([
//   BarChart,
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);


// -------------------------
// echarts i18n
// -------------------------
import 'echarts/i18n/langCS';
import 'echarts/i18n/langCS-obj';


// -------------------------
// echarts theme
// -------------------------
import 'echarts/theme/vintage';


// --------------------------
// echarts built-in extension
// --------------------------
// echarts built-in extension TS is not defineded.


// ------------------------------
// echarts import export directly
// ------------------------------

// 'echarts/lib' is a deprecated usage, where TS is not defineded.
// import { extendComponentModel } from 'echarts/lib/export/api';
// expect(isFunction(extendComponentModel));


// -------------------------
// zrender
// -------------------------
import * as zrender from 'zrender';
import * as zrUtil from 'zrender/lib/core/util';

expect(isFunction(zrender.init));
expect(isFunction(zrUtil.isTypedArray));


function createChart(): void {
  if (typeof window === 'undefined') {
    return;
  }
  const dom = document.getElementById('main0');
  const chart = echarts.init(dom);
  const option: ECOption = {
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
