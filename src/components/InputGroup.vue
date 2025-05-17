<template>
    <InputGroup
        unstyled
        :pt="theme"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <slot />
    </InputGroup>
</template>

<script setup lang="ts">
import InputGroup, { type InputGroupPassThroughOptions, type InputGroupProps } from 'primevue/inputgroup';
import { ref } from 'vue';
import { ptViewMerge } from '@atlas/utils';

interface Props extends /* @vue-ignore */ InputGroupProps {}
defineProps<Props>();

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
</script>
