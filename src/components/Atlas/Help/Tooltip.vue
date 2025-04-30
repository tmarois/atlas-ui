<template>
    <IconInfoSquareRoundedFilled
        v-tooltip.top="{
            value: text,
            pt: {
                root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px]',
                text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
            }
        }"
        class="cursor-help inline text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300"
        :class="iconClass"
    />
</template>

<script setup>
import { IconInfoSquareRoundedFilled } from '@tabler/icons-vue';
const { text, iconClass } = defineProps({
    text: {
        type: [String, null],
        default: null
    },
    iconClass: {
        type: String,
        default: 'size-5'
    }
});
</script>
