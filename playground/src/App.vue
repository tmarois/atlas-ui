<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from './components/RouterLink.vue';

const route = useRoute();

const topBarItems = [
  { label: 'Home', href: '/' },
  { label: 'Buttons', href: '/buttons' },
  { label: 'Form', href: '/form' },
  { label: 'Data', href: '/data' },
];

const pageTitle = computed(() => route.meta.title || '');
</script>

<template>
  <UiApp
    :pageUrl="route.path"
    :pageTitle="pageTitle"
    :topBarItems="topBarItems"
    :linkComponent="RouterLink"
    :isSideNav="false"
  >
    <RouterView />
  </UiApp>
</template>
