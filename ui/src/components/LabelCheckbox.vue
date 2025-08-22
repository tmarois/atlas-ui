<template>
    <div :class="mergedPt.root.class">
        <Checkbox v-model="model" v-bind="checkboxAttrs" :pt="mergedPt.checkbox" />
        <label
            v-if="label"
            :for="checkboxAttrs.inputId"
            :class="mergedPt.label.class"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import Checkbox from './Checkbox.vue';
import { useAttrs, computed } from 'vue';
import { ptMerge } from '../utils';

interface LabelCheckboxPassThroughOptions {
    root?: any;
    checkbox?: any;
    label?: any;
}

interface Props {
    label?: string;
    pt?: LabelCheckboxPassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    label: ''
});

const model = defineModel<any>();
const attrs = useAttrs();

const theme = computed<LabelCheckboxPassThroughOptions>(() => ({
    root: 'w-full flex items-center space-x-2',
    checkbox: {},
    label: `block text-sm transition-colors ${
        attrs?.disabled ? 'cursor-default pointer-events-none' : 'cursor-pointer'
    } ${
        model.value
            ? (attrs?.disabled
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-black dark:text-white hover:text-primary-700 dark:hover:text-white')
            : (attrs?.disabled
                ? 'text-gray-400 dark:text-gray-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white')
    }`
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const checkboxAttrs = computed(() => {
    const { pt, ...rest } = attrs as any;
    return rest;
});
</script>
