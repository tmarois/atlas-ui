<script setup>
import { ref } from 'vue';
import Card from '@ui/components/Card.vue';
import Button from '@ui/components/Button.vue';
import Editor from '@ui/components/Editor/Index.vue';
import Content from '@ui/components/Editor/EditorContent.vue';
import Textarea from '@ui/components/Textarea.vue';

const editContent = ref('');
</script>

<template>
  <section class="p-4 space-y-4">
    <Card pt:content:class="p-0">
      <template #content>
        <Editor v-model="editContent" placeholder="Start typing..." />
      </template>
    </Card>
    <Card pt:content:class="p-0">
      <template #content>
        <div class="bg-yellow-100/60 w-full flex flex-col">
          <div>
            <Editor v-model="editContent" toolbarClass="" />
          </div>
          <div class="flex items-center space-x-2 px-4 pb-4">
            <Button label="Save" raised size="small" />
            <Button text label="Cancel" size="small" @click="editContent = ''" />
          </div>
        </div>
      </template>
    </Card>
    <Card pt:content:class="p-0">
      <template #content>
        <Editor v-model="editContent" :toolbarOptions="['bold', 'italic', 'strike']" placeholder="Limited options" />
      </template>
    </Card>
    <Card pt:content:class="p-0">
      <template #content>
        <Editor v-model="editContent" :toolbar="false" placeholder="No toolbar editor" />
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
