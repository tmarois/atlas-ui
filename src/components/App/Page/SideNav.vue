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

<script setup>
import ScrollFrame from '@atlas/components/ScrollFrame.vue';

const props = defineProps({
    pageUrl: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        default: () => [],
    },
    linkComponent: {
        type: [String, Object],
        default: 'a',
    },
});

const isActive = (item) => {
    try {
        const currentPath = new URL(props.pageUrl, window?.location?.origin).pathname;
        const hrefPath = new URL(item.href, window?.location?.origin).pathname;
        const parentPath = item?.parent
            ? new URL(item.parent, window?.location?.origin).pathname
            : null;

        return currentPath === hrefPath || (parentPath && currentPath.startsWith(parentPath));
    } catch {
        return false;
    }
};
</script>
