<template>
    <div :class="mergedPt.root.class">
        <label
            v-if="label"
            :for="labelFor"
            :class="mergedPt.label.class"
        >
            <span :class="mergedPt.labelText.class">{{ label }}</span>
            <span v-if="required" :class="mergedPt.required.class">*</span>
            <TooltipIcon v-if="tooltip" :text="tooltip" :class="mergedPt.tooltip.class" />
        </label>
        <div :class="mergedPt.field.class" ref="fieldRef">
            <slot />
            <div v-if="error" :class="mergedPt.error.class">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TooltipIcon from './TooltipIcon.vue';
import { computed, onMounted, ref } from 'vue';
import { ptMerge } from '../utils';

interface LabelFieldPassThroughOptions {
    root?: any;
    label?: any;
    labelText?: any;
    required?: any;
    tooltip?: any;
    field?: any;
    error?: any;
}

interface Props {
    label?: string;
    tooltip?: string;
    name?: string;
    required?: boolean;
    error?: string;
    pt?: LabelFieldPassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    tooltip: '',
    name: '',
    required: false,
    error: ''
});

const theme = computed<LabelFieldPassThroughOptions>(() => ({
    root: 'w-full',
    label: 'flex items-center text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-2',
    labelText: '',
    required: 'text-red-500',
    tooltip: 'ml-2',
    field: 'w-full',
    error: 'text-sm text-red-500'
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));

const fieldRef = ref<HTMLElement | null>(null);
const labelFor = ref(props.name);

onMounted(() => {
    if (!fieldRef.value) {
        return;
    }

    const input = fieldRef.value.querySelector<HTMLElement>(
        'input,select,textarea,button,[tabindex]'
    );

    if (!input) {
        return;
    }

    if (!input.id && props.name) {
        input.id = props.name;
    }

    labelFor.value = input.id;
});
</script>
