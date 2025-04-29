<template>
    <IconHelpCircle
        v-tooltip.top="{
            value: text,
            pt: {
                root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                text: 'text-sm p-2 bg-surface-900 text-white dark:bg-surface-700 rounded whitespace-pre-line'
            }
        }"
        class="fill-surface-400 stroke-white hover:fill-surface-700 cursor-help inline dark:!fill-surface-300 dark:hover:!fill-surface-400 dark:stroke-surface-900"
        :class="iconClass"
    />
</template>

<script setup>
import { IconHelpCircle } from '@tabler/icons-vue';
const { text, iconClass } = defineProps({
    text: {
        type: [String, null],
        default: null
    },
    iconClass: {
        type: String,
        default: 'size-6'
    }
});
</script>
