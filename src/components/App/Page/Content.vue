<template>
    <div class="w-full flex h-screen overflow-hidden">
        <div v-if="hasPageSide" class="flex-none border-r border-gray-300 h-full bg-white dark:bg-surface-800 dark:border-surface-700 min-w-64 shadow-sm">
            <ScrollFrame :addOffset="footerHeight">
                <slot name="side" />
            </ScrollFrame>
        </div>
        <div class="flex-grow">
            <ScrollFrame
                page
                :offset="offset"
                :addOffset="footerHeight"
                :containerClass="containerClass"
            >
                <slot />
            </ScrollFrame>
        </div>
    </div>
</template>

<script setup>
import ScrollFrame from '@atlas/components/ScrollFrame.vue';

const slots = useSlots();

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

const containerClass = computed(() => props.widthClass + ' ' + props.containerClass);

const hasPageSide = computed(() =>
    !!(Array.isArray(slots.side?.()) &&
        slots.side()[0]?.children &&
        slots.side()[0].children.length > 0)
);

</script>
