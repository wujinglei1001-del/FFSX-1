import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const port = Number(env.VITE_APP_PORT ?? 5002);
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
      ...(mode !== 'production'
        ? [
            checker({
              eslint: {
                lintCommand: 'eslint src',
              },
              overlay: {
                initialIsOpen: false,
              },
            }),
          ]
        : []),
    ],

    publicDir: 'public',

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
          replacement: path.resolve('src/routes/router.jsx'),
        },
        {
          find: /^routes\/paths$/,
          replacement: path.resolve('src/routes/paths.js'),
        },
        {
          find: /^routes\/sitemap$/,
          replacement: path.resolve('src/routes/sitemap.js'),
        },
        {
          find: /^locales\/langs\/en\.json$/,
          replacement: path.resolve('src/locales/langs/en.json'),
        },
        {
          find: /^locales\/langs\/zh\.json$/,
          replacement: path.resolve('src/locales/langs/zh.json'),
        },
      ],
    },
  };
});
