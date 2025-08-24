<template>
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
</template>

<script setup>
import { ref } from 'vue';
import Card from '@atlas/ui/components/Card.vue';
import Editor from '@atlas/ui/components/Editor/Index.vue';
import Content from '@atlas/ui/components/Editor/EditorContent.vue';
import Textarea from '@atlas/ui/components/Textarea.vue';

const editContent = ref('');
</script>
