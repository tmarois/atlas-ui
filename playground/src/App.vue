<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from './components/RouterLink.vue';
import { IconHome, IconHandClick, IconForms, IconTable } from '@tabler/icons-vue';

const route = useRoute();

const sideBarItems = computed(() => [
  {
    children: [
      { label: 'Home', href: '/', icon: IconHome, activeIcon: IconHome },
      { label: 'Buttons', href: '/buttons', icon: IconHandClick, activeIcon: IconHandClick },
      { label: 'Form', href: '/form', icon: IconForms, activeIcon: IconForms },
      { label: 'Data', href: '/data', icon: IconTable, activeIcon: IconTable },
    ],
  },
]);

const pageNavItems = computed(() => [
  { label: 'Home', href: '/' },
  { label: 'Buttons', href: '/buttons' },
  { label: 'Form Inputs', href: '/form' },
  { label: 'Data Table', href: '/data' },
]);

const pageTitle = computed(() => route.meta.title || '');
</script>

<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
    :pageNavItems="pageNavItems"
    :linkComponent="RouterLink"
    :isSideNav="true"
  >
    <RouterView />
  </UiApp>
</template>
