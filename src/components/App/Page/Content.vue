<template>
    <ScrollFrame
        v-bind="{
            page: true,
            offset: offset,
            addOffset: footerHeight,
            ...$attrs
        }"
    >
        <div :class="containerClassInternal">
            <slot />
        </div>
    </ScrollFrame>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
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

const $attrs = useAttrs();

const containerClassInternal = computed(() => props.widthClass + ' ' + props.containerClass);
</script>
