<template>
    <span :title="text" :class="mergedPt.root.class">
        <IconInfoCircle :class="mergedPt.icon.class" />
    </span>
</template>

<script setup lang="ts">
import { IconInfoCircle } from '@tabler/icons-vue';
import { ref, computed } from 'vue';
import { ptMerge } from '../utils';

interface TooltipIconPassThroughOptions {
    root?: any;
    icon?: any;
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
</script>
