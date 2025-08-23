<script setup>
import { ref } from 'vue';
import DataTable from '@ui/components/DataTable.vue';
import Column from 'primevue/column';
import Card from '@ui/components/Card.vue';
import ComponentsLayout from '../../layouts/ComponentsLayout.vue';

const users = ref([
  { name: 'Alice', email: 'alice@example.com', country: 'USA' },
  { name: 'Bob', email: 'bob@example.com', country: 'Canada' },
  { name: 'Charlie', email: 'charlie@example.com', country: 'UK' },
  { name: 'Dana', email: 'dana@example.com', country: 'Australia' },
  { name: 'Eve', email: 'eve@example.com', country: 'Brazil' },
  { name: 'Frank', email: 'frank@example.com', country: 'Germany' },
  { name: 'Grace', email: 'grace@example.com', country: 'France' },
  { name: 'Hank', email: 'hank@example.com', country: 'Japan' },
]);
</script>

<template>
  <ComponentsLayout>
    <section class="space-y-4">
      <Card noPadding>
        <template #content>
          <DataTable :value="users" paginator :rows="5">
            <Column field="name" header="Name" />
            <Column field="email" header="Email" />
            <Column field="country" header="Country" />
          </DataTable>
        </template>
      </Card>
    </section>
  </ComponentsLayout>
</template>
