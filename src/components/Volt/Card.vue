<template>
    <Card
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card, { type CardPassThroughOptions, type CardProps } from 'primevue/card';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ CardProps {}
defineProps<Props>();

const theme = ref<CardPassThroughOptions>({
    root: `flex flex-col rounded-lg
        bg-surface-0 dark:bg-surface-900
        text-surface-700 dark:text-surface-0
        border border-surface-300 dark:border-surface-700
        w-full shadow/5`,
    header: `p-6 py-4 border-b border-surface-300 dark:border-surface-700`,
    body: `p-6 flex flex-col space-y-4`,
    caption: `flex flex-col gap-2`,
    title: `font-semibold text-lg`,
    subtitle: `text-surface-500 dark:text-surface-400`,
    content: ``,
    footer: ``
});
</script>
