<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems';

const route = useRoute();

const props = defineProps({
  pageTitle: String,
  containerClass: String,
  noScroll: Boolean,
});

const pageNavItems = [
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

const pageTitle = computed(
  () => props.pageTitle ?? route.meta.title ?? ''
);
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
    :widthClass="'w-full'"
    :containerClass="props.containerClass"
    :noScroll="props.noScroll"
  >
    <template #navLogo>
      <img src="/atlas.png" alt="Atlas" class="h-8 w-8 rounded-full" />
    </template>
    <template v-if="$slots.headerTitle" #headerTitle>
      <slot name="headerTitle" />
    </template>
    <template v-if="$slots.headerAction" #headerAction>
      <slot name="headerAction" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.footerAction" #footerAction>
      <slot name="footerAction" />
    </template>
    <template v-if="$slots.pageSideContent" #pageSideContent>
      <slot name="pageSideContent" />
    </template>
    <slot />
  </UiApp>
</template>
