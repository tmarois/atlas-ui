<template>
    <div class="w-full">
        <label v-if="label" :for="name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1">{{ label }}<span v-if="required" class="text-red-500">*</span></label>
        <div class="w-full">
            <slot />
            <div v-if="error" class="text-sm text-red-500">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
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
