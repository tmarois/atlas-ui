<template>
  <section class="space-y-4">
    <Card>
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
          <div>Editor</div>
        </div>
      </template>
      <template #content>
        <div class="border border-surface-300 dark:border-surface-700 rounded-md">
          <Editor v-model="editContent" />
        </div>
      </template>
    </Card>
    <Card>
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
          <div>View content</div>
        </div>
      </template>
      <template #content>
        <Content :content="editContent" />
      </template>
    </Card>
    <Card>
      <template #header>
        <div class="font-semibold text-gray-900 dark:text-gray-100 text-md flex items-center space-x-2">
          <div>View content (as HTML)</div>
        </div>
      </template>
      <template #content>
        <Textarea v-model="editContent" readonly fluid rows="10" />
      </template>
    </Card>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Card from '@atlas/ui/components/Card.vue';
import Editor from '@atlas/ui/components/Editor/Index.vue';
import Content from '@atlas/ui/components/Editor/EditorContent.vue';
import Textarea from '@atlas/ui/components/Textarea.vue';

const editContent = ref('');
</script>
