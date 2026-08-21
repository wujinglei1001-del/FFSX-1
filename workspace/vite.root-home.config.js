import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const rootHome = path.join(projectRoot, 'root-home');
const rootHomeOutDir = path.join(projectRoot, 'dist-root');
const publicRoot = path.join(projectRoot, 'public');

const rootHomePublicAssets = [
  'ffax.svg',
  'assets/videos/showcase/beam.webm',
  'assets/images/showcase/16.webp',
  ...Array.from({ length: 7 }, (_, index) => `assets/images/logo/${index + 12}.svg`),
  ...Array.from({ length: 9 }, (_, index) => `assets/images/landing/team/${index + 2}.webp`),
  'images/landing/team/jinglei-wu.png',
];

const copyRootHomePublicAssets = () => ({
  name: 'ffax-root-home-public-assets',
  closeBundle() {
    rootHomePublicAssets.forEach((relativePath) => {
      const sourcePath = path.join(publicRoot, relativePath);
      const targetPath = path.join(rootHomeOutDir, relativePath);
      mkdirSync(path.dirname(targetPath), { recursive: true });
      copyFileSync(sourcePath, targetPath);
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, '');
  const port = Number(env.VITE_APP_PORT ?? 5002);

  return {
    root: rootHome,
    envDir: projectRoot,
    publicDir: mode === 'production' ? false : publicRoot,
    base: '/',
    plugins: [react(), tsconfigPaths({ root: projectRoot }), copyRootHomePublicAssets()],
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
          replacement: path.join(projectRoot, 'src/routes/production-paths.js'),
        },
        {
          find: /^locales\/langs\/en\.json$/,
          replacement: path.join(projectRoot, 'src/locales/production/en.json'),
        },
        {
          find: /^locales\/langs\/zh\.json$/,
          replacement: path.join(projectRoot, 'src/locales/production/zh.json'),
        },
      ],
    },
  };
});
