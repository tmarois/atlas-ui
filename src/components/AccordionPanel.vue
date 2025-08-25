<template>
    <AccordionPanel
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <slot></slot>
    </AccordionPanel>
</template>

<script setup lang="ts">
import AccordionPanel, { type AccordionPanelPassThroughOptions, type AccordionPanelProps } from 'primevue/accordionpanel';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ AccordionPanelProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<AccordionPanelPassThroughOptions>({
    root: `flex flex-col border-b border-surface-200 dark:border-surface-700`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
