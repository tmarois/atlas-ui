<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <Button label="Show Toast" @click="show" />
        <Toast />
      </template>
    </Card>
  </section>
</template>

<script setup>
import Card from '@atlas/ui/components/Card.vue';
import Button from '@atlas/ui/components/Button.vue';
import Toast from '@atlas/ui/components/Toast.vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};
</script>

