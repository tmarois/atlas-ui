# Atlas UI

The front end centers on a reusable UI library powered by **Vue 3**, **PrimeVue 4**, and **Tailwind CSS 4**. It pairs naturally with Laravel through Inertia but can also slot into any Vue 3 application.

## Installation

Install the package and its peer dependencies:

```bash
npm install @tmarois/atlas-ui primevue primeicons tailwindcss tailwindcss-primeui @tailwindcss/forms @tailwindcss/typography @tailwindcss/container-queries tailwind-merge @tabler/icons-vue @tiptap/vue-3 @tiptap/starter-kit vuedraggable lodash
```

Configure your bundler to resolve the `@atlas/ui` alias to the package. With Vite:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@atlas/ui': path.resolve(__dirname, 'node_modules/@tmarois/atlas-ui'),
    },
  },
})
```

Import the styles once in your app:

```ts
import '@tmarois/atlas-ui/style.css'
```

## Documentation

- [Frontend Guide](../docs/frontend-guide.md)
- [Components](../docs/ui.md)
- [Composables](../docs/ui/composables.md)
- [Utils](../docs/ui/utils.md)

## Playground

A local Vite + Vue 3 sandbox lives in `../playground/` for manually testing components during development. It's not part of the production package. See [playground/README.md](../playground/README.md) for setup and usage.

## Testing

Run unit tests with:

```bash
npm test
```

