<template>
    <ScrollFrame
        page
        :offset="offset"
        :addOffset="footerHeight"
        :containerClass="[widthClass, containerClass]"
    >
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
    widthClass: {
        type: String,
        default: 'max-w-screen-2xl',
    },
    containerClass: {
        type: String,
        default: 'mx-auto p-4',
    }
});
</script>
