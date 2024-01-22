// const nodePath = require('path');


const BUNDLER_ENTRIES_MAP = {
  'echarts': {
    'use_ec_esm_fext.js': './test/esm/use_ec_esm_fext.js',
    'use_ec_esm_fnoext.js': './test/esm/use_ec_esm_fnoext.js',
    'use_ec_esm_nonode.js': './test/esm/use_ec_esm_nonode.js',
    'use_ec_cjs_nonode.js': './test/cjs/use_ec_cjs_nonode.cjs',
  },
  'vue-echarts': {
    'use_vue_ec_esm.js': './test/esm/use_vue_ec_esm.js',
  }
};

// See `node_use_ec.cjs` for desc of `copyAsESMFile`.
const NODE_SRC_LIST_MAP = {
  'echarts': [
    {src: './test/esm/use_ec_esm_fext.js', copyAsESMFile: true},
    {src: './test/esm/use_ec_esm_fnoext.js', copyAsESMFile: true},
    {src: './test/esm/use_ec_esm_ec_ssr_server_once.js', copyAsESMFile: true},
    {src: './test/cjs/use_ec_cjs.cjs'},
  ],
  'vue-echarts': [
    {src: './test/esm/use_vue_ec_esm.js', copyAsESMFile: true},
  ]
};

const TS_OUT_MAP = {
  'echarts': [
    'esm/use_ec_esm_ec_ssr_client.js',
    'esm/use_ec_esm_fnoext.js',
  ],
};

const TS_IMPORT_MAP = {
  'imports': {
    'echarts/ssr/client/index': '../../../../node_modules/echarts/ssr/client/index.js',
  }
};

// Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
const VITEST_INCLUDE_PATTERN_MAP = {
  'echarts': ['test/**/use_ec_*_vitest.?(c|m)[jt]s?(x)'],
  'vue-echarts': ['test/**/use_vue_ec_*_vitest.?(c|m)[jt]s?(x)']
};

// see https://jestjs.io/docs/configuration#modulefileextensions-arraystring
// default: (/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$
const JEST_CONFIG_MAP = {
  'echarts': {
    // roots: [nodePath.join(__dirname, '..')],
    testRegex: ['test/(.*/)?use_ec_[a-zA-Z0-9_-]+_jest\\.(c|m)?[jt]sx?$'],
    // extensionsToTreatAsEsm: ['.mjs'],
  },
  'vue-echarts': {
    // roots: [nodePath.join(__dirname, '..')],
    testRegex: ['test/(.*/)?use_vue_ec_[a-zA-Z0-9_-]+_jest\\.(c|m)?[jt]sx?$'],
    // extensionsToTreatAsEsm: ['.mjs'],
  }
};

// inline `assert` here for the unresolved issue:
// when esm import cjs, if using `const assert = require('assert')`,
// throw error: `Dynamic require of "assert" is not supported`.
function assert(cond) {
  if (!cond) {
    throw new Error('assert failed');
  }
}

function getPackageName() {
  let pkg = process.env.EC_MODULE_TEST_TARGET_PACKAGE;
  if (pkg == null) {
    pkg = _specifiedPackageName
  }
  assert(pkg);
  return pkg;
}
exports.getPackageName = getPackageName;

let _specifiedPackageName = null;
function specifyPackageName(pkgName) {
  _specifiedPackageName = pkgName;
}
exports.specifyPackageName = specifyPackageName;

exports.getBundlerEntries = function () {
  const pkg = getPackageName();
  assert(BUNDLER_ENTRIES_MAP[pkg]);
  return BUNDLER_ENTRIES_MAP[pkg];
};

exports.getVitestIncludePattern = function () {
  const pkg = getPackageName();
  assert(VITEST_INCLUDE_PATTERN_MAP[pkg]);
  return VITEST_INCLUDE_PATTERN_MAP[pkg];
};

exports.getJestPathConfig = function () {
  const pkg = getPackageName();
  assert(JEST_CONFIG_MAP[pkg]);
  return JEST_CONFIG_MAP[pkg];
};

exports.getNodeSrcList = function () {
  const pkg = getPackageName();
  assert(NODE_SRC_LIST_MAP[pkg]);
  return NODE_SRC_LIST_MAP[pkg];
};

exports.getTSOut = function () {
  const pkg = getPackageName();
  assert(TS_OUT_MAP[pkg]);
  return {
    entryPathList: TS_OUT_MAP[pkg],
    importMap: TS_IMPORT_MAP
  };
};
