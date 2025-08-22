<template>
    <div :class="mergedPt.root.class">
        <RadioButton v-model="model" v-bind="radioAttrs" :pt="mergedPt.radio" />
        <label
            v-if="label"
            :for="radioAttrs.inputId"
            :class="mergedPt.label.class"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import RadioButton from './RadioButton.vue';
import { useAttrs, computed } from 'vue';
import { ptMerge } from '../utils';

interface LabelRadioButtonPassThroughOptions {
    root?: any;
    radio?: any;
    label?: any;
}

interface Props {
    label?: string;
    pt?: LabelRadioButtonPassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    label: ''
});

const model = defineModel<any>();
const attrs = useAttrs();

const theme = computed<LabelRadioButtonPassThroughOptions>(() => ({
    root: 'w-full flex items-center space-x-2',
    radio: {},
    label: `block text-sm transition-colors ${
        attrs?.disabled ? 'cursor-default pointer-events-none' : 'cursor-pointer'
    } ${
        model.value === (attrs as any).value
            ? (attrs?.disabled
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-black dark:text-white hover:text-primary-700 dark:hover:text-white')
            : (attrs?.disabled
                ? 'text-gray-400 dark:text-gray-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white')
    }`
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const radioAttrs = computed(() => {
    const { pt, ...rest } = attrs as any;
    return rest;
});
</script>
