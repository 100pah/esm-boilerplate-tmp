import { getJestPathConfig } from './config.cjs';

export default {
  ...getJestPathConfig(),
  transform: {},
  // preset: 'ts-jest',
  // transform: {"\\.m[jt]sx?$": "babel-jest"},
  // presets: ['@babel/preset-env']
};
