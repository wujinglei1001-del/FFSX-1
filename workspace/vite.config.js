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
      checker({
        eslint: {
          lintCommand: 'eslint src',
        },

        overlay: {
          initialIsOpen: false,
        },
      }),
    ],

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
      alias: {
        'package.json': path.resolve('package.json'),
      },
    },
  };
});
