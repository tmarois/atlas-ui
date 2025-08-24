<template>
  <div class="flex items-center justify-center py-2">
    <span class="text-sm text-slate-500">Pagination placeholder</span>
  </div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  linkComponent: {
    type: String,
    default: 'a',
  },
});
</script>
