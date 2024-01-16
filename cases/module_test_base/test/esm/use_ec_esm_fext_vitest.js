/**
 * In this case:
 * + ESM
 * + File extensions are fully specified.
 * + JS (not TS)
 * + vitest
 */


// import VChart from 'vue-echarts';
import { describe, it, expect } from 'vitest';
import { getOK } from './use_ec_esm_fext.js';


describe('use_ec.esm', () => {
  it('foo', () => {
    expect(getOK()).toBe(true);
  });
});
