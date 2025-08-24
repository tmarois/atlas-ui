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
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@atlas/ui/components/App/Index.vue';
import ProfileMenu from '@atlas/ui/components/App/Nav/ProfileMenu.vue';
import RouterLink from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems';
import { useSettings } from '../composables/useSettings';
import { useProfileMenu } from '../composables/useProfileMenu';

const route = useRoute();
const pageTitle = computed(() => route.meta.title || '');

const { user, profileMenuItems } = useProfileMenu();
const { topNav } = useSettings();
const topBarItems = computed(() => sideBarItems.flatMap((section) => section.children));
</script>
