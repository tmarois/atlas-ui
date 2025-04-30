<template>
    <div
        class="p-4 flex border items-center space-x-4 rounded"
        :class="{
            'bg-surface-50 border-surface-200 dark:bg-surface-700 dark:border-surface-600 dark:text-surface-100': !warning,
            'bg-yellow-100 border-yellow-300 dark:bg-yellow-700 dark:border-yellow-600 dark:text-surface-100': warning
        }"
    >
        <div>
            <slot name="icon">
                <IconExclamationCircleFilled v-if="warning" class="size-8 text-yellow-600 dark:text-yellow-400" />
                <IconInfoCircleFilled v-else class="size-8 text-surface-600 dark:text-surface-400" />
            </slot>
        </div>
        <div class="flex-1 w-full text-sm">
            <slot />
        </div>
        <div v-if="$slots.actions" class="flex items-center space-x-2">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup>
import {
    IconInfoCircleFilled,
    IconExclamationCircleFilled
} from '@tabler/icons-vue';

const { warning } = defineProps({
    warning: {
        type: Boolean,
        default: false,
    }
});
</script>
