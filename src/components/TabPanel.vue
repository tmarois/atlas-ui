<template>
    <TabPanel
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <slot></slot>
    </TabPanel>
</template>

<script setup lang="ts">
import TabPanel, { type TabPanelPassThroughOptions, type TabPanelProps } from 'primevue/tabpanel';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ TabPanelProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<TabPanelPassThroughOptions>({
    root: ``
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
