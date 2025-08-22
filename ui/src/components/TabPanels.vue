<template>
    <TabPanels
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <slot></slot>
    </TabPanels>
</template>

<script setup lang="ts">
import TabPanels, { type TabPanelsPassThroughOptions, type TabPanelsProps } from 'primevue/tabpanels';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ TabPanelsProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<TabPanelsPassThroughOptions>({
    root: `text-surface-700 dark:text-surface-0
        pt-[0.875rem] pb-[1.125rem] px-6 outline-none text-base`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
