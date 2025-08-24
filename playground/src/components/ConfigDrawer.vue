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
              :class="['w-6 h-6 rounded-full border cursor-pointer', option.class, primary === option.value ? 'ring-2 ring-offset-2 ring-primary-500' : '']"
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
              :class="['w-6 h-6 rounded-full border cursor-pointer', option.class, surface === option.value ? 'ring-2 ring-offset-2 ring-primary-500' : '']"
              @click="surface = option.value"
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
const { dark, topNav, primary, surface } = useSettings();
const primaryOptions = [
    { label: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { label: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { label: 'Indigo', value: 'indigo', class: 'bg-indigo-500' },
    { label: 'Teal', value: 'teal', class: 'bg-teal-500' },
    { label: 'Pink', value: 'pink', class: 'bg-pink-500' },
    { label: 'Black', value: 'gray', class: 'bg-black' },
    { label: 'Green', value: 'green', class: 'bg-green-500' },
    { label: 'Orange', value: 'orange', class: 'bg-orange-500' },
];
const surfaceOptions = [
    { label: 'Blue', value: 'blue', class: 'bg-blue-200' },
    { label: 'Gray', value: 'gray', class: 'bg-gray-200' },
    { label: 'Purple', value: 'purple', class: 'bg-purple-200' },
    { label: 'Pink', value: 'pink', class: 'bg-pink-200' },
    { label: 'Slate', value: 'slate', class: 'bg-slate-200' },
    { label: 'Zinc', value: 'zinc', class: 'bg-zinc-200' },
];
</script>

<style scoped>
</style>
