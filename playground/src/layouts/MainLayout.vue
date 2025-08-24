<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
    :topBarItems="topBarItems"
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
import { computed, ref } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@atlas/ui/components/App/Index.vue';
import ProfileMenu from '@atlas/ui/components/App/Nav/ProfileMenu.vue';
import RouterLink from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems';
import { useSettings } from '../composables/useSettings';

const route = useRoute();
const pageTitle = computed(() => route.meta.title || '');

const user = ref({
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com'
});

const profileMenuItems = computed(() => [
  { separator: true },
  { label: 'Company Name', icon: 'pi pi-building-columns', href: '/' },
  { separator: true },
  { label: 'Billing & Plan', icon: 'pi pi-credit-card', href: '/' },
  { label: 'Manage Access', icon: 'pi pi-users', href: '/' },
  { label: 'Integrations', icon: 'pi pi-objects-column', href: '/' },
  { label: 'Settings', icon: 'pi pi-cog', href: '/' },
  { label: 'Status page', icon: 'pi pi-cog', href: 'https://google.com', external: true },
  { separator: true },
  { label: 'Logout', icon: 'pi pi-sign-out', href: '/logout' }
]);
const { topNav } = useSettings();
const topBarItems = computed(() => sideBarItems.flatMap((section) => section.children));
</script>
