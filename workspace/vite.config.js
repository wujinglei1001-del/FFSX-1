import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const copyWorkbenchPublicAssets = () => ({
  name: 'ffax-workbench-public-assets',
  closeBundle() {
    const sourcePath = path.resolve('public/ffax.svg');
    const targetPath = path.resolve('dist/ffax.svg');
    mkdirSync(path.dirname(targetPath), { recursive: true });
    copyFileSync(sourcePath, targetPath);
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const port = Number(env.VITE_APP_PORT ?? 5002);
  const useProductionRouter =
    mode === 'production' && env.VITE_ENABLE_TEMPLATE_PREVIEW !== 'true';

  return {
    legacy: {
      inconsistentCjsInterop: true,
    },
    experimental: {
      enableNativePlugin: false, // or 'resolver' to only use the native resolver
    },

    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message?.includes('Use of direct `eval`')) {
            return;
          }

          warn(warning);
        },
      },
    },

    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        eslint: {
          lintCommand: 'eslint src',
        },

        overlay: {
          initialIsOpen: false,
        },
      }),
      ...(useProductionRouter ? [copyWorkbenchPublicAssets()] : []),
    ],

    publicDir: useProductionRouter ? false : 'public',

    server: {
      host: '0.0.0.0',
      port,
      allowedHosts: true,
    },

    preview: {
      port,
    },

    base: env.VITE_BASENAME ?? (mode === 'production' ? '/workbench/' : '/'),

    resolve: {
      alias: [
        {
          find: 'package.json',
          replacement: path.resolve('package.json'),
        },
        {
          find: /^routes\/router$/,
          replacement: path.resolve(
            useProductionRouter ? 'src/routes/production-router.jsx' : 'src/routes/router.jsx',
          ),
        },
        {
          find: /^routes\/paths$/,
          replacement: path.resolve(
            useProductionRouter ? 'src/routes/production-paths.js' : 'src/routes/paths.js',
          ),
        },
        {
          find: /^routes\/sitemap$/,
          replacement: path.resolve(
            useProductionRouter ? 'src/routes/production-sitemap.js' : 'src/routes/sitemap.js',
          ),
        },
        {
          find: /^locales\/langs\/en\.json$/,
          replacement: path.resolve(
            useProductionRouter
              ? 'src/locales/production/en.json'
              : 'src/locales/langs/en.json',
          ),
        },
        {
          find: /^locales\/langs\/zh\.json$/,
          replacement: path.resolve(
            useProductionRouter
              ? 'src/locales/production/zh.json'
              : 'src/locales/langs/zh.json',
          ),
        },
      ],
    },
  };
});
