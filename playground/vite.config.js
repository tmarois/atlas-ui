import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../ui/src'),
      '@inertiajs/vue3': path.resolve(__dirname, './src/inertia.js')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
