<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <Alert class="mb-4">Default alert</Alert>
        <Alert warning class="mb-4">Warning alert</Alert>
        <Alert hideIcon class="mb-4">Alert without icon</Alert>

        <Alert class="mb-4">
          Default alert
          <template #actions>
            <Button size="small" label="Add funds" />
          </template>
        </Alert>
        <Alert warning class="mb-4">
          Warning alert
          <template #actions>
            <Button size="small" label="Add funds" />
          </template>
        </Alert>
        <Alert hideIcon>
          Alert without icon
          <template #actions>
            <Button size="small" label="Add funds" />
          </template>
        </Alert>
      </template>
    </Card>
  </section>
</template>

<script setup>
import Card from '@atlas/ui/components/Card.vue';
import Alert from '@atlas/ui/components/Alert.vue';
import Button from '@atlas/ui/components/Button.vue';
</script>

