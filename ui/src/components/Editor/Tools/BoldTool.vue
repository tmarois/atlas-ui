<template>
    <Button
        v-tooltip.top="tooltip"
        icon
        text
        size="small"
        class="!px-2"
        :class="{
            'hover:!bg-surface-200/50': true,
            '!bg-surface-300/50 text-black': editor?.isActive('bold')
        }"
        @click="editor?.chain().focus().toggleBold().run()"
    >
        <div class="flex items-center text-black dark:text-white">
            <IconBold class="size-5" />
        </div>
    </Button>
</template>

<script setup>
import { IconBold } from '@tabler/icons-vue';
import Button from '../../Button.vue';

const props = defineProps({
    editor: Object
});

const tooltip = {
    value: 'Bold'
};
</script>
