<template>
    <Button
        v-tooltip.top="tooltip"
        icon
        text
        size="small"
        class="!px-2 hover:!bg-surface-200/50"
        @click="editor?.chain().focus().unsetAllMarks().clearNodes().run()"
    >
        <div class="flex items-center text-black dark:text-white">
            <IconClearFormatting class="size-5" />
        </div>
    </Button>
</template>

<script setup>
import { IconClearFormatting } from '@tabler/icons-vue';
import Button from '@atlas/components/Button.vue';

const props = defineProps({ editor: Object });

const tooltip = {
    value: 'Clear formatting',
    pt: {
        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
    }
};
</script>
