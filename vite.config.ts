import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3001,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(
        env.GEMINI_API_KEY,
      ),
      'process.env.GEMINI_API_KEY':
        JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      cssMinify: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 725,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId =
              id.replace(/\\/g, '/');

            if (
              !normalizedId.includes('node_modules')
            ) {
              return;
            }

            if (
              normalizedId.includes('/react/') ||
              normalizedId.includes('/react-dom/') ||
              normalizedId.includes(
                '/react-router-dom/',
              )
            ) {
              return 'react-vendor';
            }

            if (
              normalizedId.includes(
                '/framer-motion/',
              )
            ) {
              return 'framer-motion';
            }

            if (
              normalizedId.includes(
                '/react-markdown/',
              ) ||
              normalizedId.includes('/remark-') ||
              normalizedId.includes('/rehype-') ||
              normalizedId.includes('/micromark/') ||
              normalizedId.includes('/mdast-') ||
              normalizedId.includes('/hast-') ||
              normalizedId.includes('/unist-') ||
              normalizedId.includes('/unified/')
            ) {
              return 'markdown-vendor';
            }

            if (
              normalizedId.includes(
                '/@react-three/drei/',
              ) ||
              normalizedId.includes(
                '/three-stdlib/',
              ) ||
              normalizedId.includes(
                '/meshline/',
              )
            ) {
              return 'three-helpers';
            }

            if (
              normalizedId.includes(
                '/@react-three/fiber/',
              )
            ) {
              return 'three-fiber';
            }

            if (
              normalizedId.includes('/three/')
            ) {
              return 'three-core';
            }
          },
        },
      },
    },
  };
});
// Trigger HMR reset v2
