<template>
    <Avatar
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Avatar>
</template>

<script setup lang="ts">
import Avatar, { type AvatarPassThroughOptions, type AvatarProps } from 'primevue/avatar';
import { ref, useAttrs, computed } from 'vue';
import { ptViewMerge, ptMerge } from '../utils';

interface Props extends /* @vue-ignore */ AvatarProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<AvatarPassThroughOptions>({
    root: `inline-flex items-center justify-center
        w-8 h-8 text-base rounded-md
        bg-surface-200 dark:bg-surface-700
        has-[img]:bg-transparent
        p-circle:rounded-full
        p-large:w-12 p-large:h-12 p-large:text-2xl
        p-xlarge:w-16 p-xlarge:h-16 p-xlarge:text-[2rem]`,
    label: ``,
    icon: `text-base p-large:text-2xl p-xlarge:text-[2rem]`,
    image: `p-circle:rounded-full w-full h-full`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
