<template>
  <div class="profile-menu" />
</template>
<script setup>
// placeholder profile menu
const props = defineProps({
  user: { type: Object, default: () => ({}) },
  items: { type: Array, default: () => [] },
  avatarOnly: { type: Boolean, default: false },
  headerLink: { type: String, default: '/' },
  linkComponent: { type: String, default: 'a' }
});
</script>
