import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: ['vue'],
    alias: {
      vue: require.resolve('vue'),
    },
  },
  build: {
    rollupOptions: {
      external: ['vue'],
    },
  },
});
