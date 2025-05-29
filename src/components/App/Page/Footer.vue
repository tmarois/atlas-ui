<template>
    <div
        class="fixed bottom-0 z-10 border-t border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-700 shadow-[0_-2px_4px_1px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_6px_rgba(0,0,0,0.3)]"
        :style="{
            left: `${leftOffset}px`,
            width: `calc(100% - ${leftOffset}px)`
        }"
    >
        <div class="mx-auto px-4 py-1.5 flex justify-between items-center" :class="widthClass">
            <div class="grow">
                <slot />
            </div>
            <div v-if="hasAction">
                <slot name="action" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSlots } from 'vue';
import { hasSlotContent } from '@atlas/utils';

const props = defineProps({
    leftOffset: {
        type: Number,
        default: 0
    },
    widthClass: {
        type: String,
        default: 'max-w-screen-2xl',
    }
});
const slots = useSlots();

const hasAction = computed(() => hasSlotContent(slots.action));
</script>
