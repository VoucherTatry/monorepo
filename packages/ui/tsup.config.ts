/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.tsx'],
  splitting: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
});
