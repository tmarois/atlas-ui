<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <ProgressBar :value="50" />
      </template>
    </Card>
  </section>
</template>

<script setup>
import Card from '@atlas/ui/components/Card.vue';
import ProgressBar from '@atlas/ui/components/ProgressBar.vue';
</script>

