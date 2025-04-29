<template>
    <IconHelpCircle
        v-tooltip.bottom="{
            value: text,
            pt: {
                root: 'absolute shadow-md p-fadein py-0 -mt-1 px-0 max-w-[260px] !z-[99999]',
                text: 'text-sm p-2 bg-gray-900 text-white rounded whitespace-pre-line'
            }
        }"
        class="!size-5 fill-gray-400 stroke-white hover:fill-gray-700 cursor-help inline"
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
