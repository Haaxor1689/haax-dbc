import { defineConfig } from 'tsup';

export default defineConfig([
  // CLI build (ESM only)
  {
    entry: { cli: 'src/index.ts' },
    format: ['esm'],
    dts: false,
    minify: true,
    splitting: false,
    clean: true,
    shims: false,
    sourcemap: false,
    external: ['bun:jsc'],
    outDir: 'dist'
  },
  // Library build (ESM + CJS)
  {
    entry: ['src/dbc/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    minify: true,
    clean: false,
    sourcemap: false,
    outDir: 'dist'
  }
]);
