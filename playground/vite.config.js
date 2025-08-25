import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // Map the playground's @atlas/ui alias directly to the package source.
      // The previous path pointed to a non-existent ../ui/src directory,
      // breaking component imports within the playground.
      '@atlas/ui': path.resolve(__dirname, '../src'),
      '@inertiajs/vue3': path.resolve(__dirname, './src/inertia.js')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
