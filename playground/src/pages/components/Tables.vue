<template>
  <section class="space-y-4">
    <Card noPadding>
      <template #content>
        <Tabs value="general">
          <TabList>
            <Tab value="general">General</Tab>
            <Tab value="sorting">Sorting</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="general">
              <DataTable :value="users" paginator :rows="25">
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column field="country" header="Country" />
              </DataTable>
            </TabPanel>
            <TabPanel value="sorting">
              <DataTable :value="users" paginator :rows="25">
                <Column field="name" header="Name" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="country" header="Country" sortable />
              </DataTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '@atlas/ui/components/DataTable.vue';
import Column from 'primevue/column';
import Card from '@atlas/ui/components/Card.vue';
import Tabs from '@atlas/ui/components/Tabs.vue';
import TabList from '@atlas/ui/components/TabList.vue';
import Tab from '@atlas/ui/components/Tab.vue';
import TabPanels from '@atlas/ui/components/TabPanels.vue';
import TabPanel from '@atlas/ui/components/TabPanel.vue';

const countries = ['USA', 'Canada', 'UK', 'Australia', 'Brazil', 'Germany', 'France', 'Japan'];

const users = ref(
  Array.from({ length: 50 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    country: countries[i % countries.length],
  })),
);
</script>
