<template>
  <RouterLink :to="props.href" v-bind="attrs"><slot /></RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { useAttrs } from 'vue';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const attrs = useAttrs();
</script>
