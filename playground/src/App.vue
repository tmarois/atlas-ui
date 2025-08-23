<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from './components/RouterLink.vue';
import { IconHome, IconUsers, IconSettings } from '@tabler/icons-vue';
import { Button, useModal } from '@atlas/ui';

const route = useRoute();
const { open } = useModal();

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
        {
          label: 'Components',
          children: [
              { label: 'Buttons', href: '/components/buttons' },
              { label: 'Forms', href: '/components/forms' },
              { label: 'Tables', href: '/components/tables' },
              { label: 'Tabs', href: '/components/tabs' },
              { label: 'Overlays', href: '/components/overlays' },
              { label: 'Editor', href: '/components/editor', parent: '/components/editor' },
          ],
        },
        {
          label: 'Notifications',
          children: [
            { label: 'Email', href: '/notifications/email' },
            { label: 'Push', href: '/notifications/push' },
          ],
        },
        {
          label: 'Security',
          children: [
            { label: 'Password', href: '/security/password' },
            { label: 'Two Factor', href: '/security/two-factor' },
          ],
        },
        {
          label: 'Billing',
          children: [
            { label: 'Plans', href: '/billing/plans' },
            { label: 'Invoices', href: '/billing/invoices' },
            { label: 'Subscriptions', href: '/billing/subscriptions' },
          ],
        },
      ];
    }

    return [];
  });

  const pageTabs = computed(() => {
    if (route.path.startsWith('/components/forms')) {
      return [
        { title: 'General', href: '/components/forms' },
        { title: 'Sizing', href: '/components/forms/sizing' },
        { title: 'Errors', href: '/components/forms/errors' },
      ];
    }
    if (route.path.startsWith('/components/editor')) {
      return [
        { title: 'Overview', href: '/components/editor' },
        { title: 'Variants', href: '/components/editor/variant' },
        { title: 'Text', href: '/components/editor/text' },
      ];
    }

    return [];
  });

  const pageTitle = computed(() => route.meta.title || '');

const userItem = computed(() => {
  if (route.path.startsWith('/users/') && route.params.id) {
    const id = route.params.id;
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
    };
  }
  return null;
});
</script>

<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
    :pageNavItems="pageNavItems"
    :pageTabs="pageTabs"
    :linkComponent="RouterLink"
    :isSideNav="true"
  >
      <template #navLogo>
          <img src="/atlas.png" alt="Atlas" class="h-8 w-8 rounded-full" />
      </template>
      <template v-if="userItem" #headerTitle>
        <div class="pr-2">
          <Button
            as="RouterLink"
            text
            icon="pi pi-arrow-left"
            size="small"
            href="/users"
          />
        </div>
        <div class="flex flex-col space-y-0 py-3">
          <div class="text-md font-medium">{{ userItem.name }}</div>
          <div class="text-sm text-slate-500">{{ userItem.email }}</div>
        </div>
      </template>
      <template v-if="userItem" #headerAction>
        <Button size="small" label="Edit" @click="open('ADD_EDIT_USER', userItem)" />
      </template>
      <template v-if="userItem" #pageSideContent>
        <div class="h-[1000px] w-[350px] p-4">
          <div>This is my side content</div>
        </div>
      </template>
    <RouterView />
  </UiApp>
</template>
