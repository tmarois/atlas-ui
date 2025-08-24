<template>
  <div>
    <button
      class="fixed z-50 top-1/2 -right-2 transform -translate-y-1/2 bg-primary-500 text-white p-3 rounded-l shadow flex items-center justify-center cursor-pointer"
      @click="visible = true"
    >
      <span class="pi pi-cog"></span>
    </button>
    <UiDrawer v-model:visible="visible" position="right" :modal="false">
      <div class="p-4 space-y-4">
        <h2 class="text-xl font-semibold">Settings</h2>
        <div class="flex items-center justify-between">
          <span>Dark mode</span>
          <ToggleSwitch v-model="dark" />
        </div>
        <div class="flex items-center justify-between">
          <span>Top navigation</span>
          <ToggleSwitch v-model="topNav" />
        </div>
        <div class="flex items-center justify-between">
          <span>Theme</span>
          <Select
            v-model="theme"
            :options="themeOptions"
            option-label="label"
            option-value="value"
            class="w-40"
            size="small"
          />
        </div>
      </div>
    </UiDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UiDrawer from '@atlas/ui/components/Drawer.vue';
import ToggleSwitch from '@atlas/ui/components/ToggleSwitch.vue';
import Select from '@atlas/ui/components/Select.vue';
import { useSettings } from '../composables/useSettings';

const visible = ref(false);
const { dark, topNav, theme } = useSettings();
const themeOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Teal', value: 'teal' },
  { label: 'Pink', value: 'pink' },
  { label: 'Gray', value: 'gray' },
  { label: 'Green', value: 'green' },
  { label: 'Orange', value: 'orange' },
];
</script>

<style scoped>
</style>
