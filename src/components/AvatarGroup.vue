<template>
    <AvatarGroup
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </AvatarGroup>
</template>

<script setup lang="ts">
import AvatarGroup, { type AvatarGroupPassThroughOptions, type AvatarGroupProps } from 'primevue/avatargroup';
import { ref, useAttrs, computed } from 'vue';
import { ptViewMerge, ptMerge } from '../utils';

interface Props extends /* @vue-ignore */ AvatarGroupProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<AvatarGroupPassThroughOptions>({
    root: `flex items-center *:border-2 *:border-surface-200 dark:*:border-surface-700 *:-ms-3`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
