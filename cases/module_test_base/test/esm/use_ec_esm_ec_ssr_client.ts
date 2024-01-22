import * as ssrClient from 'echarts/ssr/client/index';
import type {
  // The component option types are defined with the ComponentOption suffix
  LegendComponentOption,
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';


const SSR_URL = 'http://127.00.1:58123/chart_ssr';

// FIXME: should receive from server, rather than defined here.
const SERIES_NAMES = ['a', 'b', 'silent'];

// Create an Option type with only the required components and charts via ComposeOption
type ECOption = ComposeOption<
  LegendComponentOption
>;

const _chartMutableOption: ECOption = {
  legend: {
    selected: {}
  }
};

function clientMain(): void {
  requestRenderServerChart();
}

function requestRenderServerChart() {
  const url = new URL(SSR_URL);
  url.searchParams.append('chartMutableOption', JSON.stringify(_chartMutableOption));

  const script = document.createElement('script');
  (window as any)['__chart_ssr_cb__'] = function (res: {
    errno: number; ecSVG: string; msg: string
  }) {
    if (res.errno) {
      console.error(res.msg);
      return;
    }
    document.body.removeChild(script);
    updateChart(res.ecSVG);
  }
  script.src = url.toString();
  document.body.appendChild(script);
}

function updateChart(ecSVG: string): void {
  const main = document.getElementById('main0')!;
  main.innerHTML = ecSVG;

  ssrClient.hydrate(main, {
    on: {
      mouseover: (params) => {
        // console.log(params);
      },
      mouseout: (params) => {
        // console.log(params);
      },
      click: (params) => {
        console.log(`[hydrate] on click`);
        // This is for demo only. In practice, the
        // client should call API to get the new chart
        // and `serverChart.dispatchAction` should be
        // done on the server.
        if (params.ssrType === 'legend') {
          const serverName = SERIES_NAMES[params.seriesIndex!];
          const selected = (_chartMutableOption.legend! as LegendComponentOption).selected!;
          let currVal;
          if (!selected.hasOwnProperty(serverName)) {
            currVal = true;
          }
          else {
            currVal = selected[serverName];
          }
          (_chartMutableOption.legend! as LegendComponentOption).selected![serverName] = !currVal;

          requestRenderServerChart();
        }
      },
    },
  });
}

clientMain();
