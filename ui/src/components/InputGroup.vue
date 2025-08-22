<template>
    <InputGroup
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <slot />
    </InputGroup>
</template>

<script setup lang="ts">
import InputGroup, { type InputGroupPassThroughOptions, type InputGroupProps } from 'primevue/inputgroup';
import { ref, useAttrs, computed } from 'vue';
import { ptViewMerge, ptMerge } from '../utils';

interface Props extends /* @vue-ignore */ InputGroupProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<InputGroupPassThroughOptions>({
    root: `flex rounded-md border border-surface-300 dark:border-surface-700
        shadow-sm overflow-hidden
        focus-within:border-primary
        dark:focus-within:border-primary
        p-invalid:border-red-500 dark:p-invalid:border-red-500
        transition-colors duration-200`,
    addon: `flex items-center px-3 text-sm text-surface-600 dark:text-surface-300
        bg-surface-100 dark:bg-surface-800
        border-r last:border-r-0
        border-surface-300 dark:border-surface-700`,
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
