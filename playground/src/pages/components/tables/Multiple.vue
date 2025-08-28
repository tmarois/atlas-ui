<template>
  <section class="space-y-4">
    <!-- Table A -->
    <Card noPadding>
      <template #header>
        <div class="p-4 font-medium">Users (A)</div>
      </template>
      <template #content>
        <DataTable :value="usersA" :rows="10">
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="country" header="Country" sortable />
        </DataTable>
      </template>
    </Card>

    <!-- Table B -->
    <Card noPadding>
      <template #header>
        <div class="p-4 font-medium">Users (B)</div>
      </template>
      <template #content>
        <DataTable :value="usersB" :rows="10">
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" sortable />
        </DataTable>
      </template>
    </Card>

    <!-- Table C -->
    <Card noPadding>
      <template #header>
        <div class="p-4 font-medium">Users (C)</div>
      </template>
      <template #content>
        <DataTable :value="usersC" :rows="10">
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="status" header="Status" sortable />
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
const roles = ['Admin', 'Editor', 'Viewer'];
const statuses = ['Active', 'Invited', 'Suspended'];

const usersA = ref(
  Array.from({ length: 10 }, (_, i) => ({
    name: `User A${i + 1}`,
    email: `usera${i + 1}@example.com`,
    country: countries[i % countries.length],
  })),
);

const usersB = ref(
  Array.from({ length: 10 }, (_, i) => ({
    name: `User B${i + 1}`,
    email: `userb${i + 1}@example.com`,
    role: roles[i % roles.length],
  })),
);

const usersC = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User C${i + 1}`,
    status: statuses[i % statuses.length],
  })),
);
</script>

