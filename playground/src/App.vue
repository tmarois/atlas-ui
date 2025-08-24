<template>
  <RouterView />
  <ConfigDrawer />
</template>

<script setup>
import { RouterView } from 'vue-router';
import ConfigDrawer from './components/ConfigDrawer.vue';
</script>
