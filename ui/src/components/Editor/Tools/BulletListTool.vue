<template>
    <Button
        v-tooltip.top="tooltip"
        icon
        text
        size="small"
        class="!px-2"
        :class="{
            'hover:!bg-surface-200/50': true,
            '!bg-surface-300/50 text-black': editor?.isActive('bulletList')
        }"
        @click="editor?.chain().focus().toggleBulletList().run()"
    >
        <div class="flex items-center text-black dark:text-white">
            <IconList class="size-5" />
        </div>
    </Button>
</template>

<script setup>
import { IconList } from '@tabler/icons-vue';
import Button from '../../Button.vue';

const props = defineProps({ editor: Object });

const tooltip = {
    value: 'Bullet list'
};
</script>
