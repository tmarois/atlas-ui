<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <ProgressBar class="mb-4" :value="50" />
        <ProgressBar
          class="mb-4"
          :value="30"
          :pt="ptMerge({ value: { class: 'bg-green-500' } })"
        />
        <ProgressBar
          class="mb-4"
          :value="70"
          :pt="ptMerge({ value: { class: 'bg-orange-500' } })"
        />
        <ProgressBar
          :value="85"
          :pt="ptMerge({ value: { class: 'bg-purple-500' } })"
        />
      </template>
    </Card>

    <Card>
      <template #content>
        <ProgressBar :value="animatedValue" />
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '@atlas/ui/components/Card.vue';
import ProgressBar from '@atlas/ui/components/ProgressBar.vue';
import { ptMerge } from '@atlas/ui/utils';

const animatedValue = ref(0);

onMounted(() => {
  setInterval(() => {
    animatedValue.value = (animatedValue.value + 1) % 101;
  }, 100);
});
</script>

