<template>
    <IconHelpCircle
        v-tooltip.bottom="{
            value: text,
            pt: {
                root: 'absolute shadow-md p-fadein py-0 -mt-1 px-0 max-w-[260px] !z-[99999]',
                text: 'text-sm p-2 bg-surface-900 text-white dark:bg-surface-700 rounded whitespace-pre-line'
            }
        }"
        class="!size-5 fill-surface-400 stroke-white hover:fill-surface-700 cursor-help inline dark:!fill-surface-300 dark:hover:!fill-surface-400 dark:stroke-surface-900"
    />
</template>

<script setup>
import { IconHelpCircle } from '@tabler/icons-vue';
const { text } = defineProps({
    text: {
        type: [String, null],
        default: null
    }
});
</script>
