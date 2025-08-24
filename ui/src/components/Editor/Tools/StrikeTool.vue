<template>
    <Button
        v-tooltip.top="tooltip"
        icon
        text
        size="small"
        class="!px-2"
        :class="{
            'hover:!bg-surface-200/50': true,
            '!bg-surface-300/50 text-black': editor?.isActive('strike')
        }"
        @click="editor?.chain().focus().toggleStrike().run()"
    >
        <div class="flex items-center text-black dark:text-white">
            <IconStrikethrough class="size-5" />
        </div>
    </Button>
</template>

<script setup>
import { IconStrikethrough } from '@tabler/icons-vue';
import Button from '../../Button.vue';

const props = defineProps({ editor: Object });

const tooltip = {
    value: 'Strikethrough'
};
</script>
