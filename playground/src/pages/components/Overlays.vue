<script setup>
import { ref } from 'vue';
import Card from '@ui/components/Card.vue';
import Button from '@ui/components/Button.vue';
import Drawer from '@ui/components/Drawer.vue';
import Dialog from '@ui/components/Dialog.vue';

const drawerVisible = ref(false);
const dialogVisible = ref(false);
</script>

<template>
  <section class="p-4 space-y-4">
    <Card pt.content="p-0">
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
          Drawer
        </div>
      </template>
      <template #content>
        <div class="p-4">
          <Button label="Open Drawer" @click="drawerVisible = true" />
        </div>
        <Drawer v-model:visible="drawerVisible" header="Drawer">
          <p class="m-0 p-4">Drawer Content</p>
        </Drawer>
      </template>
    </Card>

    <Card pt.content="p-0">
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center">
          Modal
        </div>
      </template>
      <template #content>
        <div class="p-4">
          <Button label="Open Modal" @click="dialogVisible = true" />
        </div>
        <Dialog v-model:visible="dialogVisible" header="Modal">
          <p class="m-0 p-4">Modal Content</p>
          <template #footer>
            <Button label="Close" @click="dialogVisible = false" />
          </template>
        </Dialog>
      </template>
    </Card>
  </section>
</template>
