<template>
    <div
        v-if="items && items.length"
        class="w-64 shrink-0 border-r border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 overflow-hidden h-screen"
    >
        <div class="py-6 px-4 space-y-2">
            <component
                v-for="item in items"
                :key="item.href"
                :is="linkComponent"
                :href="item.href"
                class="block rounded px-3 py-2 text-sm font-medium"
                :class="[
                    pageUrl === item.href
                        ? 'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-white'
                        : 'text-slate-600 hover:bg-surface-100 dark:text-slate-300 dark:hover:bg-surface-700'
                ]"
            >
                {{ item.label }}
            </component>
        </div>
    </div>
</template>

<script setup>
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
</script>
