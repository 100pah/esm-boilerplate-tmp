import { defineConfig } from 'vitest/config';
import { getVitestIncludePattern } from './config.cjs';

export default defineConfig({
  test: {
    include: getVitestIncludePattern()
  },
});
