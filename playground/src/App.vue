<template>
  <RouterView />
  <ConfigDrawer />
  <UiToast />
</template>

<script setup>
import { RouterView } from 'vue-router';
import ConfigDrawer from './components/ConfigDrawer.vue';
import UiToast from '@atlas/ui/components/Toast.vue';
</script>
