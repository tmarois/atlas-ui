<script setup>
import Button from '@ui/components/Button.vue';
</script>

<template>
  <section class="p-4 space-y-4">
    <h2 class="text-xl font-semibold">Buttons</h2>
    <div class="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button severity="secondary">Secondary</Button>
      <Button severity="success">Success</Button>
      <Button severity="info">Info</Button>
      <Button severity="warning">Warning</Button>
      <Button severity="danger">Danger</Button>
      <Button severity="help">Help</Button>
      <Button outlined>Outlined</Button>
      <Button text>Text</Button>
      <Button raised>Raised</Button>
      <Button rounded>Rounded</Button>
      <Button :loading="true" label="loading" />
      <Button disabled>Disabled</Button>
    </div>
  </section>
</template>
