<template>
    <div class="w-full flex items-center space-x-2">
        <RadioButton v-model="model" v-bind="attrs" />
        <label
            v-if="label"
            :for="attrs?.inputId"
            :class="[
                'block text-sm transition-colors',
                attrs?.disabled ? 'cursor-default pointer-events-none' : 'cursor-pointer',
                model === attrs.value
                    ? (attrs?.disabled ? 'text-gray-500 dark:text-gray-400' : 'text-black dark:text-white hover:text-primary-700 dark:hover:text-white')
                    : (attrs?.disabled ? 'text-gray-400 dark:text-gray-400' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white')
            ]"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import RadioButton from '../../Volt/RadioButton.vue';
import { useAttrs } from 'vue';

const model = defineModel<any>();

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
});

const attrs = useAttrs();
</script>
