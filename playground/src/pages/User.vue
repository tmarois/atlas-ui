<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-4">User {{ route.params.id }}</h2>
    <p>This is a placeholder user detail page.</p>
  </section>
</template>
