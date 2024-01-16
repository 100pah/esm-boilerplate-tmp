/**
 * In this case:
 * + CJS
 * + Running in node is not supported
 *   (because echarts theme and i18n do not support it yet).
 * + JS (not TS)
 */

// -------------------------
// echarts theme
// -------------------------
require('echarts/theme/vintage');


// -------------------------
// echarts i18n
// -------------------------
require('echarts/i18n/langCS');
require('echarts/i18n/langCS.js');
require('echarts/i18n/langCS-obj');
require('echarts/i18n/langCS-obj.js');


// -------------------------
// other cases
// -------------------------
require('./use_ec_cjs.cjs');
