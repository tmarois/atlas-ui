<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <Alert class="mb-4">Default alert</Alert>
        <Alert warning class="mb-4">Warning alert</Alert>
        <Alert hideIcon>Alert without icon</Alert>
      </template>
    </Card>

    <Card>
      <template #content>
        <Alert class="mb-4">
          <div class="space-y-1">
            <p class="font-medium">Information</p>
            <p>There is a new update available.</p>
          </div>
          <template #actions>
            <Button size="small" label="View details" />
          </template>
        </Alert>
        <Alert warning>
          <div class="space-y-1">
            <p class="font-medium">Payment needed</p>
            <p>Your account balance is low. Add funds to continue.</p>
          </div>
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

