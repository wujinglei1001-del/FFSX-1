import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      'package.json': path.resolve('package.json'),
    },
  },
  build: {
    outDir: '../website/components/realtime-engagement',
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve('realtime-engagement-export.html'),
    },
  },
});
