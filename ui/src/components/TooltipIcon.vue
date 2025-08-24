<template>
    <span v-tooltip.top="tooltip" :class="mergedPt.root.class">
        <IconInfoSquareRoundedFilled :class="mergedPt.icon.class" />
    </span>
</template>

<script setup lang="ts">
import { IconInfoSquareRoundedFilled } from '@tabler/icons-vue';
import { computed } from 'vue';
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
    text?: string | null;
    iconClass?: string;
    pt?: TooltipIconPassThroughOptions;
}

const props = withDefaults(defineProps<Props>(), {
    text: null,
    iconClass: 'size-5'
});

const theme = computed<TooltipIconPassThroughOptions>(() => ({
    root: 'cursor-help inline text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-300',
    icon: props.iconClass
}));

const mergedPt = computed(() => ptMerge(theme.value, props.pt));

const tooltip = computed(() => ({
    value: props.text,
    pt: props.pt?.tooltip
}));
</script>
