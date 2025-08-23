<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const item = computed(() => ({
  id: route.params.id,
  name: `User ${route.params.id}`,
  email: `user${route.params.id}@example.com`,
}));
</script>

<template>
  <div class="h-[1000px]">
    <div>This is my page content</div>
    <div>{{ item }}</div>
  </div>
</template>
