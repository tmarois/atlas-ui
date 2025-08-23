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
        { label: 'Editor', href: '/components/editor', parent: '/components/editor' },
        {
          label: 'My Account',
          children: [
            { label: 'Account', href: '/account' },
            { label: 'Security', href: '/account/security' },
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
        {
          label: 'Integrations',
          children: [
            { label: 'Google', href: '/integrations/google' },
            { label: 'Slack', href: '/integrations/slack' },
            { label: 'Dropbox', href: '/integrations/dropbox' },
            { label: 'Mailchimp', href: '/integrations/mailchimp' },
            { label: 'Stripe', href: '/integrations/stripe' },
          ],
        },
      ];
    }

    return [];
  });

  const pageTabs = computed(() => {
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
    <RouterView />
  </UiApp>
</template>
