<template>
    <div v-bind="bindProps" :class="mergedPt.root.class">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { ptMerge } from '../../utils';

interface TopbarPassThroughOptions {
    root?: any;
}

interface Props {
    pt?: TopbarPassThroughOptions;
}

const props = defineProps<Props>();
const attrs = useAttrs();

const theme = computed<TopbarPassThroughOptions>(() => ({
    root: 'h-[56px] bg-white border-b border-surface-300 dark:bg-surface-800 dark:border-surface-700 flex items-center w-full'
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));

const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});

const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
