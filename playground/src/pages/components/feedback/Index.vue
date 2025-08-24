<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <Alert class="mb-4">Default alert</Alert>
        <Alert warning class="mb-4">Warning alert</Alert>
        <Alert hideIcon>Alert without icon</Alert>
      </template>
    </Card>
  </section>
</template>

<script setup>
import Card from '@atlas/ui/components/Card.vue';
import Alert from '@atlas/ui/components/Alert.vue';
</script>

