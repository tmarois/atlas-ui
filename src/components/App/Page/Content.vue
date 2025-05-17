<template>
    <ScrollFrame page :offset="offset" :addOffset="footerHeight">
        <slot />
    </ScrollFrame>
</template>

<script setup>
import ScrollFrame from '@atlas/components/ScrollFrame.vue';
const props = defineProps({
    offset: {
        type: [Number, null],
        default: null,
    },
    footerHeight: {
        type: Number,
        default: 0,
    },
});
</script>
