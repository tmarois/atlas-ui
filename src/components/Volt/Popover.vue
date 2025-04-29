<template>
    <Popover
        ref="el"
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge
        }"
    >
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Popover>
</template>

<script setup lang="ts">
import Popover, { type PopoverPassThroughOptions, type PopoverProps } from 'primevue/popover';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ PopoverProps {}
defineProps<Props>();

const theme = ref<PopoverPassThroughOptions>({
    root: `mt-[5px] p-flipped:-mt-[5px] p-flipped:mb-[5px]
        bg-surface-0 dark:bg-surface-900 text-surface-800 dark:text-surface-0 text-sm
        dark:border dark:border-surface-700
        rounded shadow-floating`,
    content: `p-3`,
    transition: {
        enterFromClass: 'opacity-0 scale-y-75',
        enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
});

const el = ref();
defineExpose({
    toggle: (event, target) => el.value.toggle(event, target),
    show: (event, target) => el.value.show(event, target),
    hide: () => el.value.toggle()
});
</script>

<style>
.shadow-floating {
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.24), 0 8px 10px 1px rgb(0 0 0 / 5%),
        0 3px 14px 2px rgb(0 0 0 / 6%), 0 5px 5px -3px rgba(0, 0, 0, 0.1);
}
</style>
