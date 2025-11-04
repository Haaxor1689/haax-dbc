import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/dbc/index.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  external: ['bun:jsc']
});
