import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const rootHome = path.join(projectRoot, 'root-home');
const rootHomeOutDir = path.join(projectRoot, 'dist-root');
const publicRoot = path.join(projectRoot, 'public');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, '');
  const port = Number(env.VITE_APP_PORT ?? 5002);

  return {
    root: rootHome,
    envDir: projectRoot,
    publicDir: publicRoot,
    base: '/',
    plugins: [react(), tsconfigPaths({ root: projectRoot })],
    server: {
      host: '0.0.0.0',
      port,
      allowedHosts: true,
    },
    preview: {
      port,
    },
    build: {
      outDir: rootHomeOutDir,
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message?.includes('Use of direct `eval`')) return;
          warn(warning);
        },
      },
    },
    resolve: {
      alias: [
        {
          find: 'package.json',
          replacement: path.join(projectRoot, 'package.json'),
        },
        {
          find: /^routes\/paths$/,
          replacement: path.join(projectRoot, 'src/routes/paths.js'),
        },
        {
          find: /^locales\/langs\/en\.json$/,
          replacement: path.join(projectRoot, 'src/locales/langs/en.json'),
        },
        {
          find: /^locales\/langs\/zh\.json$/,
          replacement: path.join(projectRoot, 'src/locales/langs/zh.json'),
        },
      ],
    },
  };
});
