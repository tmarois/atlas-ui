<template>
    <AccordionHeader
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <template #toggleicon="{ active }">
            <ChevronDownIcon v-if="active" />
            <ChevronUpIcon v-else />
        </template>
        <slot></slot>
    </AccordionHeader>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@primevue/icons/chevrondown';
import ChevronUpIcon from '@primevue/icons/chevronup';
import AccordionHeader, { type AccordionHeaderPassThroughOptions, type AccordionHeaderProps } from 'primevue/accordionheader';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ AccordionHeaderProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<AccordionHeaderPassThroughOptions>({
    root: `cursor-pointer disabled:pointer-events-none disabled:opacity-60 flex items-center justify-between p-[1.125rem] px-6 py-4 font-semibold
        text-surface-500 dark:text-surface-400
        hover:text-surface-700 dark:hover:text-surface-0
        hover:bg-surface-100 dark:hover:bg-surface-700
        p-active:text-surface-800 dark:p-active:text-surface-0
        transition-colors duration-200
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-primary`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
