<template>
    <div class="flex items-center justify-between p-2 py-1" :class="rootClass">
        <div class="flex items-center space-x-1">
            <component
                v-for="tool in resolvedTools"
                :is="toolComponents[tool]"
                :key="tool"
                :editor="editor"
            />
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
    editor: Object,
    options: {
        type: Array,
        default: () => ['bold', 'italic', 'strike', 'bullet', 'ordered', 'link', 'clear']
    },
    rootClass: {
        type: String,
        default: ''
    }
});

const toolComponents = {
    bold: BoldTool,
    italic: ItalicTool,
    strike: StrikeTool,
    bullet: BulletListTool,
    ordered: OrderedListTool,
    link: LinkTool,
    clear: ClearFormattingTool
};

const resolvedTools = computed(() => props.options.filter(tool => toolComponents[tool]));

</script>
