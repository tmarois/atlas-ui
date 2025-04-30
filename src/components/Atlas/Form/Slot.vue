<template>
    <div class="w-full">
        <label
            v-if="label"
            :for="name"
            class="flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-2"
        >
            <span>{{ label }}</span>
            <span v-if="required" class="text-red-500">*</span>
            <HelpTooltip v-if="tooltip" :text="tooltip" class="ml-2" />
        </label>
        <div class="w-full">
            <slot />
            <div v-if="error" class="text-sm text-red-500">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup>

import HelpTooltip from '../Help/Tooltip.vue';

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    tooltip: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    }
});
</script>
