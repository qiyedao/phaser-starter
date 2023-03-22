import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
