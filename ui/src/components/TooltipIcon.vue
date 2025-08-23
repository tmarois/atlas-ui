<template>
    <span v-tooltip.top="tooltip" :class="mergedPt.root.class">
        <IconInfoCircle :class="mergedPt.icon.class" />
    </span>
</template>

<script setup lang="ts">
import { IconInfoCircle } from '@tabler/icons-vue';
import { ref, computed } from 'vue';
import { ptMerge } from '../utils';

interface TooltipDirectivePassThroughOptions {
    root?: any;
    text?: any;
}

interface TooltipIconPassThroughOptions {
    root?: any;
    icon?: any;
    tooltip?: TooltipDirectivePassThroughOptions;
}

interface Props {
    text: string;
    pt?: TooltipIconPassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    text: ''
});

const theme = ref<TooltipIconPassThroughOptions>({
    root: 'inline-flex items-center',
    icon: 'w-4 h-4 text-surface-400 dark:text-surface-500'
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));

const tooltipTheme = ref<TooltipDirectivePassThroughOptions>({
    root: 'absolute z-[9999] shadow-md p-fadein py-0 px-0 max-w-[260px]',
    text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
});

const tooltip = computed(() => ({
    value: props.text,
    pt: ptMerge(tooltipTheme.value, props.pt?.tooltip)
}));
</script>
