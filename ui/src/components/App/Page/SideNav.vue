<template>
    <div
        v-if="items && items.length"
        class="w-64 shrink-0 border-r border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 overflow-hidden"
    >
        <ScrollFrame>
            <div class="py-2 px-2 space-y-2">
                <template v-for="item in items" :key="item.label">
                    <div v-if="item.children && item.children.length" class="space-y-2">
                        <div class="pt-2">
                            <span class="px-4 text-sm text-gray-600/70 dark:text-surface-500 font-bold uppercase">{{ item.label }}</span>
                        </div>
                        <ul class="space-y-1">
                            <li v-for="child in item.children" :key="child.href">
                                <component
                                    :is="linkComponent"
                                    :href="child.href"
                                    class="block rounded px-4 py-2 text-sm font-medium"
                                    :class="[
                                        isActive(child)
                                            ? 'bg-surface-100 dark:bg-surface-700 text-primary-800 dark:text-white font-semibold'
                                            : 'text-slate-900 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-surface-700'
                                    ]"
                                >
                                    {{ child.label }}
                                </component>
                            </li>
                        </ul>
                    </div>
                    <component
                        v-else
                        :is="linkComponent"
                        :href="item.href"
                        class="block rounded px-4 py-2 text-sm font-medium"
                        :class="[
                            isActive(item)
                                ? 'bg-surface-100 dark:bg-surface-700 text-primary-800 dark:text-white font-semibold'
                                : 'text-slate-900 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-surface-700'
                        ]"
                    >
                        {{ item.label }}
                    </component>
                </template>
            </div>
        </ScrollFrame>
    </div>
</template>

<script setup lang="ts">
import ScrollFrame from '../../ScrollFrame.vue';
import { isPageActive } from '../../../utils';

interface NavItem {
    label: string;
    href: string;
    parent?: string;
    children?: NavItem[];
}

interface Props {
    items?: NavItem[];
    linkComponent?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    linkComponent: 'a',
});

const { items, linkComponent } = props;

const isActive = (item: NavItem) =>
    item.parent ? isPageActive(item.parent) : isPageActive(item.href, undefined, true);
</script>
