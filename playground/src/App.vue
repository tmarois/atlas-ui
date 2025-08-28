<template>
  <RouterView />
  <ConfigDrawer />
  <Toast />
</template>

<script setup>
import { RouterView } from 'vue-router';
import ConfigDrawer from './components/ConfigDrawer.vue';
import Toast from '@atlas/uiupda/components/Toast.vue';
</script>
