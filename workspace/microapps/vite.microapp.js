import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const createMicroAppConfig = ({ root, appId, globalName, port }) =>
  defineConfig(({ command }) => ({
    root,
    base: command === 'serve' ? '/' : `/workbench/microapps/${appId}/`,
    define: {
      'process.env.NODE_ENV': JSON.stringify(command === 'serve' ? 'development' : 'production'),
    },
    plugins: [
      react(),
      {
        name: 'ffax-microapp-html-entry',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'index.html',
            source:
              '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="./style.css"></head><body><div data-ffax-micro-root></div><script src="./app.umd.js"></script></body></html>',
          });
        },
      },
    ],
    server: { host: '0.0.0.0', port, cors: true, allowedHosts: true },
    build: {
      outDir: path.join(workspaceRoot, 'dist', 'microapps', appId),
      emptyOutDir: false,
      cssCodeSplit: false,
      sourcemap: false,
      lib: {
        entry: path.join(root, 'src', 'main.jsx'),
        name: globalName,
        formats: ['umd'],
        cssFileName: 'style',
        fileName: () => 'app.umd.js',
      },
    },
  }));
