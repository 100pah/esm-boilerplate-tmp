/**
 * In this case:
 * + ESM
 * + Node not supported (because echarts theme and i18n do not support it yet).
 * + JS (not TS)
 */

// -------------------------
// echarts theme
// -------------------------
import 'echarts/theme/vintage';


// -------------------------
// echarts i18n
// -------------------------
import 'echarts/i18n/langCS';
import 'echarts/i18n/langCS.js';
import 'echarts/i18n/langCS-obj';
import 'echarts/i18n/langCS-obj.js';


// -------------------------
// other cases
// -------------------------
import './use_ec_esm_fext.js';
