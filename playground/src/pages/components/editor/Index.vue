<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from '@ui/components/Card.vue';
import Editor from '@ui/components/Editor/Index.vue';
import Content from '@ui/components/Editor/EditorContent.vue';
import Textarea from '@ui/components/Textarea.vue';
import RouterLink from '../../../components/RouterLink.vue';

const route = useRoute();
const editContent = ref('');

const pageTabs = [
  { title: 'Overview', href: '/components/editor' },
  { title: 'Variants', href: '/components/editor/variant' },
  { title: 'Text', href: '/components/editor/text' },
];
</script>

<template>
  <section class="p-4 space-y-4">
    <div class="flex space-x-4 border-b pb-2 mb-4">
      <RouterLink
        v-for="tab in pageTabs"
        :key="tab.href"
        :href="tab.href"
        class="px-2 py-1 text-sm"
        :class="route.path === tab.href ? 'border-b-2 border-primary-500' : 'text-surface-500'"
      >
        {{ tab.title }}
      </RouterLink>
    </div>
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
