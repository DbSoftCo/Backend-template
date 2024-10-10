import path from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // exclude: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test'),
    },
    root: './',
    // environment: 'node',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
