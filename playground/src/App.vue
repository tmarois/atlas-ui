<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from './components/RouterLink.vue';
import { IconHome, IconUsers, IconSettings } from '@tabler/icons-vue';

const route = useRoute();

const sideBarItems = computed(() => [
  {
    children: [
      { label: 'Home', href: '/', icon: IconHome, activeIcon: IconHome },
      { label: 'Users', href: '/users', icon: IconUsers, activeIcon: IconUsers },
      { label: 'Components', href: '/components/buttons', parent: '/components', icon: IconSettings, activeIcon: IconSettings },
    ],
  },
]);

const pageNavItems = computed(() => {
  if (route.path.startsWith('/components')) {
    return [
      { label: 'Buttons', href: '/components/buttons' },
      { label: 'Forms', href: '/components/forms' },
      { label: 'Tables', href: '/components/tables' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Overlays', href: '/components/overlays' },
    ];
  }

  return [];
});

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
      <template #navLogo>
          <img src="/atlas.png" alt="Atlas" class="h-8 w-8 rounded-full" />
      </template>
    <RouterView />
  </UiApp>
</template>
