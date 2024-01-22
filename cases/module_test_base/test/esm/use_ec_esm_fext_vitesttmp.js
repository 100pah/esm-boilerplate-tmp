/**
 * In this case:
 * + ESM
 * + File extensions are fully specified.
 * + JS (not TS)
 * + vitest
 */


// import VChart from 'vue-echarts';
import { describe, it, expect } from 'vitest';
// import { getOK } from './use_ec_esm_fext.js';
import {stop} from './use_ec_esm_fext_vitesttmp_sub.js';

stop();
import * as echartsCore2 from 'echarts/charts';


describe('use_ec.esm', () => {
  it('foo', () => {

    console.log(echartsCore2);

    // expect(getOK()).toBe(true);
    // console.log(obj);
  });
});
