# Component Guide

Use this template as a starting point for new Vue components. Blocks should appear in this order: template, script, then optional scoped styles.

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
