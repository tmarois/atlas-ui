<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
    :topBarItems="topBarItems"
    :pageNavItems="pageNavItems"
    :pageTabs="pageTabs"
    :linkComponent="RouterLink"
    :isSideNav="!topNav"
    :widthClass="'w-full'"
  >
    <template #navLogo>
      <img src="/atlas.png" alt="Atlas" class="h-8 w-8 rounded-full" />
    </template>
    <template #navActions>
      <ProfileMenu
        :user="user"
        :items="profileMenuItems"
        :avatar-only="true"
        headerLink="/"
        :linkComponent="RouterLink"
      />
    </template>
    <RouterView />
  </UiApp>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@atlas/ui/components/App/Index.vue';
import ProfileMenu from '@atlas/ui/components/App/Nav/ProfileMenu.vue';
import RouterLink from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems';
import { useSettings } from '../composables/useSettings';
import { useProfileMenu } from '../composables/useProfileMenu';

const route = useRoute();
const { topNav } = useSettings();
const topBarItems = computed(() => sideBarItems.flatMap((section) => section.children));
const { user, profileMenuItems } = useProfileMenu();

const pageNavItems = [
  {
    label: 'Components',
    children: [
      { label: 'Buttons', href: '/components/buttons' },
      { label: 'Forms', href: '/components/forms', parent: '/components/forms' },
      { label: 'Tables', href: '/components/tables' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Overlays', href: '/components/overlays' },
      { label: 'Feedback', href: '/components/feedback', parent: '/components/feedback' },
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
      { label: 'Plans', href: '/billing/plans', disabled: true },
      {
        label: 'Invoices',
        href: '/billing/invoices',
        disabled: true,
        lockTooltipText: 'Coming soon',
      },
      {
        label: 'Subscriptions',
        href: '/billing/subscriptions',
        disabled: true,
        lockTooltipText: 'Coming soon',
      },
    ],
  },
];

const pageTabs = computed(() => {
  if (route.path.startsWith('/components/tables')) {
    return [
      { title: 'General', href: '/components/tables' },
      { title: 'Sorting', href: '/components/tables/sorting' },
      { title: 'Multiple tables', href: '/components/tables/multiple' },
    ];
  }
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
  if (route.path.startsWith('/components/feedback')) {
    return [
      { title: 'Alerts', href: '/components/feedback' },
      { title: 'Errors', href: '/components/feedback/errors' },
      { title: 'Toast', href: '/components/feedback/toast' },
      { title: 'ProgressBar', href: '/components/feedback/progressbar' },
    ];
  }
  return [];
});

const pageTitle = computed(() => route.meta.title || '');
</script>
