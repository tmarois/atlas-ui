<script setup>
import Button from '@ui/components/Button.vue';

const groups = [
  { title: 'Buttons (regular)', attrs: {} },
  { title: 'Buttons (regular-outlined)', attrs: { outlined: true } },
  { title: 'Buttons (regular-text)', attrs: { text: true } },
  { title: 'Buttons (small)', attrs: { size: 'small' } },
  { title: 'Buttons (small-outlined)', attrs: { size: 'small', outlined: true } },
  { title: 'Buttons (small-text)', attrs: { size: 'small', text: true } },
  { title: 'Buttons (large)', attrs: { size: 'large' } },
  { title: 'Buttons (large-outlined)', attrs: { size: 'large', outlined: true } },
  { title: 'Buttons (large-text)', attrs: { size: 'large', text: true } },
];

const states = [
  { label: 'Default', attrs: {} },
  { label: 'Raised', attrs: { raised: true } },
  { label: 'Rounded', attrs: { rounded: true } },
  { label: 'Loading', attrs: { loading: true } },
  { label: 'Disabled', attrs: { disabled: true } },
];
</script>

<template>
  <section class="p-4 space-y-4">
    <h2 class="text-xl font-semibold">Buttons</h2>
    <div v-for="group in groups" :key="group.title" class="space-y-2">
      <h3 class="text-lg font-semibold">{{ group.title }}</h3>
      <div class="flex flex-wrap gap-4">
        <Button
          v-for="state in states"
          :key="state.label"
          v-bind="{ ...group.attrs, ...state.attrs }"
        >
          {{ state.label }}
        </Button>
      </div>
    </div>
  </section>
</template>
