<template>
  <div>
    <button
      class="fixed z-50 top-1/2 -right-2 transform -translate-y-1/2 bg-primary-500 text-white p-3 rounded-l shadow flex items-center justify-center cursor-pointer"
      @click="visible = true"
    >
      <span class="pi pi-cog"></span>
    </button>
    <UiDrawer
      v-model:visible="visible"
      position="right"
      :modal="false"
      header="Customize"
    >
      <div class="p-4 space-y-6">
        <div class="flex items-center justify-between">
          <span class="font-medium">Dark mode</span>
          <ToggleSwitch v-model="dark" />
        </div>
        <div class="flex items-center justify-between">
          <span class="font-medium">Top navigation</span>
          <ToggleSwitch v-model="topNav" />
        </div>
        <div>
          <span class="block mb-2 font-medium">Primary</span>
          <div class="flex gap-2">
              <button
                v-for="option in primaryOptions"
                :key="option.value"
                :class="['w-6 h-6 rounded-full border cursor-pointer', option.class, primary === option.value ? 'ring-2 ring-offset-2 ring-primary-500' : 'hover:ring-2 hover:ring-offset-2 hover:ring-primary-500']"
                @click="primary = option.value"
                :aria-label="option.label"
                v-tooltip.bottom="{ value: option.label }"
              ></button>
          </div>
        </div>
        <div>
          <span class="block mb-2 font-medium">Surface</span>
          <div class="flex gap-2">
              <button
                v-for="option in surfaceOptions"
                :key="option.value"
                :class="['w-6 h-6 rounded-full border cursor-pointer', option.class, surface === option.value ? 'ring-2 ring-offset-2 ring-primary-500' : 'hover:ring-2 hover:ring-offset-2 hover:ring-primary-500']"
                @click="surface = option.value"
                :aria-label="option.label"
                v-tooltip.bottom="{ value: option.label }"
              ></button>
          </div>
        </div>
        <div>
          <span class="block mb-2 font-medium">Rounding</span>
          <div class="flex gap-2">
              <button
                v-for="option in roundedOptions"
                :key="option.value"
                :class="['w-6 h-6 border cursor-pointer bg-surface-0 dark:bg-surface-900', option.class, rounded === option.value ? 'ring-2 ring-offset-2 ring-primary-500' : 'hover:ring-2 hover:ring-offset-2 hover:ring-primary-500']"
                @click="rounded = option.value"
                :aria-label="option.label"
                v-tooltip.bottom="{ value: option.label }"
              ></button>
          </div>
        </div>
      </div>
    </UiDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UiDrawer from '@atlas/ui/components/Drawer.vue';
import ToggleSwitch from '@atlas/ui/components/ToggleSwitch.vue';
import { useSettings } from '../composables/useSettings';

const visible = ref(false);
const { dark, topNav, primary, surface, rounded } = useSettings();
const primaryOptions = [
    { label: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { label: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { label: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
    { label: 'Teal', value: 'teal', class: 'bg-teal-500' },
    { label: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { label: 'Gray', value: 'gray', class: 'bg-gray-500' },
    { label: 'Green', value: 'green', class: 'bg-green-500' },
    { label: 'Orange', value: 'orange', class: 'bg-orange-500' },
];
const surfaceOptions = [
    { label: 'Blue', value: 'blue', class: 'bg-blue-50 dark:bg-blue-900' },
    { label: 'Gray', value: 'gray', class: 'bg-gray-50 dark:bg-gray-900' },
    { label: 'Purple', value: 'purple', class: 'bg-purple-50 dark:bg-purple-900' },
    { label: 'Pink', value: 'pink', class: 'bg-pink-50 dark:bg-pink-900' },
    { label: 'Slate', value: 'slate', class: 'bg-slate-50 dark:bg-slate-900' },
    { label: 'Zinc', value: 'zinc', class: 'bg-zinc-50 dark:bg-zinc-900' },
];
const roundedOptions = [
    { label: '0', value: '0', class: 'rounded-[var(--p-rounded-0)]' },
    { label: '0.25', value: '1', class: 'rounded-[var(--p-rounded-1)]' },
    { label: '0.50', value: '2', class: 'rounded-[var(--p-rounded-2)]' },
    { label: '0.75', value: '3', class: 'rounded-[var(--p-rounded-3)]' },
];
</script>

<style scoped>
</style>
