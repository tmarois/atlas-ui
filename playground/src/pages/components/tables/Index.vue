<template>
  <section class="space-y-4">
    <Card noPadding>
      <template #content>
        <DataTable :value="users" paginator :rows="25">
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="country" header="Country" />
        </DataTable>
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '@atlas/ui/components/DataTable.vue';
import Column from 'primevue/column';
import Card from '@atlas/ui/components/Card.vue';

const countries = ['USA', 'Canada', 'UK', 'Australia', 'Brazil', 'Germany', 'France', 'Japan'];

const users = ref(
  Array.from({ length: 50 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    country: countries[i % countries.length],
  })),
);
</script>
