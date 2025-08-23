<script setup>
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import UiApp from '@ui/components/App/Index.vue';
import RouterLink from '../components/RouterLink.vue';
import { sideBarItems } from '../sideBarItems';

const route = useRoute();
const pageTitle = computed(() => route.meta.title || '');
</script>

<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
    :linkComponent="RouterLink"
    :isSideNav="true"
    :widthClass="'w-full'"
  >
    <template #navLogo>
      <img src="/atlas.png" alt="Atlas" class="h-8 w-8 rounded-full" />
    </template>
    <RouterView />
  </UiApp>
</template>
