# Agent Instructions

Atlas is a collection of reusable Laravel packages and Vue 3 UI components
that consumers can drop into their own applications. This file summarizes the
coding conventions and expectations for contributors.

## Where things live
- `laravel/`: base Laravel framework package.
- `ui/`: reusable Vue 3 component library.
- `playground/`: Vite + Vue sandbox for manual UI testing.
- `docs/`: architecture and convention references.

## Coding guidelines

### Laravel / PHP
- Follow the architecture and rules in [docs/backend-guide.md](docs/backend-guide.md).
- Use PHP 8+ features with strict types and typed properties.
- Follow PSR-12 formatting (enforced via Laravel Pint).
- Keep controllers thin; business logic belongs in service classes.
- Write tests for new features and run `composer test` before committing.

### Vue / JS
- Follow [docs/frontend-guide.md](docs/frontend-guide.md).
- Use the Composition API with `<script setup>` syntax.
- Order Vue SFC blocks as `<template>`, then `<script>`, then `<style>`.
- Use this template as a starting point for new Vue components:

```vue
<template>
  <!-- Markup first, styled with Tailwind classes -->
  <button
    class="px-4 py-2 bg-primary-500 text-white rounded"
    @click="emit('submit')"
  >
    {{ label }}
  </button>
</template>

<script setup>
// Props and emits defined with runtime options
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['submit'])
</script>

<style scoped>
/* Optional: add component-specific CSS overrides here */
</style>
```

- The `<template>` block is optional for script-only components but belongs at the top when present.
- Components are plain JavaScript by default; add `lang="ts"` to `<script setup>` only when TypeScript is required.
- Tailwind CSS classes handle most styling; place any additional rules in a `<style scoped>` block at the end of the file.
- Components are presentational; extract logic to composables or services.
- PascalCase components, camelCase composables and utils.
- Run `npm test` for any changes affecting the UI package.
- UI docs:
  - [Components](docs/ui.md)
  - [Composables](docs/ui/composables.md)
  - [Utils](docs/ui/utils.md)
- When updating UI documentation that covers a component API, link to the
  corresponding PrimeVue docs. If no page exists, document the API yourself so
  consumers understand how to use it.

## Testing
- Run front-end tests with `npm test` inside `ui/`.
- Run Laravel package tests with `composer test` inside `laravel/`.

## Pull requests
- Keep commits focused and reference relevant documentation when introducing new patterns.
- Update this file and other docs as conventions evolve.

