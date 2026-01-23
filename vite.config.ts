import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
      '@locales': path.resolve(__dirname, 'src/locales'),
    }
  },
  base: './',
  root: '.', // We will move index.html to src/renderer but vite expects it in root or we config it.
  // Better to set root to src/renderer? No, then resolving node_modules is harder.
  // We will keep root at project root and point input to src/renderer/index.html
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderer/index.html')
    }
  },
  server: {
    port: 5173,
    strictPort: true,
  }
});
