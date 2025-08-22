<template>
    <div :class="mergedPt.root.class">
        <component
            v-if="choiceComponent"
            :is="choiceComponent"
            v-model="model"
            v-bind="choiceAttrs"
            :pt="mergedPt.input"
        />
        <label
            v-if="label"
            :for="choiceAttrs.inputId"
            :class="mergedPt.label.class"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { ptMerge } from '../utils';

interface LabelChoicePassThroughOptions {
    root?: any;
    input?: any;
    label?: any;
}

interface Props {
    label?: string;
    pt?: LabelChoicePassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    label: ''
});

const model = defineModel<any>();
const attrs = useAttrs();
const slots = useSlots();

const choiceComponent = computed(() => slots.default?.()[0]?.type);

const isChecked = computed(() => {
    if ((attrs as any)?.value !== undefined) {
        return model.value === (attrs as any).value;
    }
    return !!model.value;
});

const theme = computed<LabelChoicePassThroughOptions>(() => ({
    root: 'w-full flex items-center space-x-2',
    input: {},
    label: `block text-sm transition-colors ${
        (attrs as any)?.disabled ? 'cursor-default pointer-events-none' : 'cursor-pointer'
    } ${
        isChecked.value
            ? ((attrs as any)?.disabled
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-black dark:text-white hover:text-primary-700 dark:hover:text-white')
            : ((attrs as any)?.disabled
                ? 'text-gray-400 dark:text-gray-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-white')
    }`
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));

const choiceAttrs = computed(() => {
    const { pt, ...rest } = attrs as any;
    return rest;
});
</script>
