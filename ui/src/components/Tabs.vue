<template>
    <Tabs
        unstyled
        v-bind="bindProps"
        :pt="mergedPt"
        :ptOptions="{ mergeProps: ptViewMerge }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Tabs>
</template>

<script setup lang="ts">
import Tabs, { type TabsPassThroughOptions, type TabsProps } from 'primevue/tabs';
import { ref, useAttrs, computed } from 'vue';
import { ptMerge, ptViewMerge } from '../utils';

interface Props extends /* @vue-ignore */ TabsProps {}
const props = defineProps<Props>();
const attrs = useAttrs();

const theme = ref<TabsPassThroughOptions>({
    root: `flex flex-col`
});

const mergedPt = computed(() => ptMerge(theme.value, props.pt));
const passThroughProps = computed(() => {
    const { pt, ...rest } = props as any;
    return rest;
});
const bindProps = computed(() => ({ ...attrs, ...passThroughProps.value }));
</script>
