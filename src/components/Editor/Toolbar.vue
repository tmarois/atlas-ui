<template>
    <div class="flex items-center justify-between p-2 py-1 border-b border-surface-300 dark:border-surface-700">
        <div class="flex items-center space-x-1">
            <BoldTool :editor="editor" />
            <ItalicTool :editor="editor" />
            <StrikeTool :editor="editor" />
            <BulletListTool :editor="editor" />
            <OrderedListTool :editor="editor" />
            <LinkTool :editor="editor" />
            <ClearFormattingTool :editor="editor" />
            <slot :editor="editor" />
        </div>
    </div>
</template>

<script setup>
import BoldTool from '@atlas/components/Editor/Tools/BoldTool.vue';
import ItalicTool from '@atlas/components/Editor/Tools/ItalicTool.vue';
import StrikeTool from '@atlas/components/Editor/Tools/StrikeTool.vue';
import BulletListTool from '@atlas/components/Editor/Tools/BulletListTool.vue';
import OrderedListTool from '@atlas/components/Editor/Tools/OrderedListTool.vue';
import LinkTool from '@atlas/components/Editor/Tools/LinkTool.vue';
import ClearFormattingTool from '@atlas/components/Editor/Tools/ClearFormattingTool.vue';

const props = defineProps({
    editor: Object
});
</script>
