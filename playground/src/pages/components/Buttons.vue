<template>
  <section class="space-y-4">
    <Card v-for="group in groups" :key="group.title">
      <template #header>
        <h3 class="text-lg font-semibold">{{ group.title }}</h3>
      </template>
      <template #content>
        <div class="flex flex-wrap gap-4 mb-4">
          <Button
            v-for="state in states"
            :key="state.label"
            v-bind="{ ...group.attrs, ...state.attrs }"
            :label="state.label"
          />
        </div>
        <div class="flex flex-wrap gap-4 mb-4">
          <Button
            v-for="state in states"
            :key="`${state.label}-icon`"
            v-bind="{ ...group.attrs, ...state.attrs }"
            :label="state.label"
            icon="pi pi-check"
          />
        </div>
        <div class="flex flex-wrap gap-4">
          <Button
            v-for="state in iconStates"
            :key="state.icon"
            v-bind="{ ...group.attrs, ...state.attrs }"
            :icon="state.icon"
            :aria-label="state.ariaLabel"
          />
        </div>
      </template>
    </Card>
  </section>
</template>

<script setup>
import Button from '@atlas/ui/components/Button.vue';
import Card from '@atlas/ui/components/Card.vue';

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

const iconStates = [
  { icon: 'pi pi-check', attrs: {}, ariaLabel: 'Check' },
  { icon: 'pi pi-search', attrs: { raised: true }, ariaLabel: 'Search' },
  { icon: 'pi pi-times', attrs: { rounded: true }, ariaLabel: 'Close' },
  { icon: 'pi pi-refresh', attrs: { loading: true }, ariaLabel: 'Refresh' },
  { icon: 'pi pi-trash', attrs: { disabled: true }, ariaLabel: 'Delete' },
];
</script>
