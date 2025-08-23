<script setup>
import ComponentsLayout from "../../../layouts/ComponentsLayout.vue";
import { ref } from 'vue';
import Card from '@ui/components/Card.vue';
import Editor from '@ui/components/Editor/Index.vue';
import Content from '@ui/components/Editor/EditorContent.vue';
import Textarea from '@ui/components/Textarea.vue';

const editContent = ref('');
</script>

<template>
  <ComponentsLayout>
  <section class="space-y-4">
    <Card pt:content:class="p-0">
      <template #content>
        <Editor v-model="editContent" textOnly placeholder="Start typing for text output..." />
      </template>
    </Card>
    <Card v-if="editContent">
      <template #content>
        <Content :content="editContent" />
      </template>
    </Card>
    <Card v-if="editContent">
      <template #content>
        <Textarea v-model="editContent" readonly fluid rows="10" />
      </template>
    </Card>
  </section>
  </ComponentsLayout>
</template>
