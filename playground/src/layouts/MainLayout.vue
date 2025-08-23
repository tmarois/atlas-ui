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

const pageTitle = computed(
  () => props.pageTitle ?? route.meta.title ?? ''
);
</script>

<template>
  <UiApp
    :pageUrl="route.fullPath"
    :pageTitle="pageTitle"
    :sideBarItems="sideBarItems"
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
