<template>
    <Accordion
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Accordion>
</template>

<script setup lang="ts">
import Accordion, { type AccordionPassThroughOptions, type AccordionProps } from 'primevue/accordion';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ AccordionProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<AccordionPassThroughOptions>({
    root: ``
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
