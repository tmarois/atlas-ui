<template>
    <div class="flex items-center justify-center flex-wrap gap-1">
        <component
            v-for="link in links"
            :key="link.label"
            :is="linkComponent"
            :href="link.url ?? ''"
            v-html="link.label"
            preserve-scroll
            class="flex items-center justify-center px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{
                'bg-gray-200 dark:bg-gray-600 dark:text-white text-gray-900 font-semibold': link.active,
                '!text-gray-300': !link.url
            }"
        />
    </div>
</template>

<script setup>
defineProps({
    links: {
        type: Array,
        required: true
    },
    linkComponent: {
        type: [String, Object],
        default: 'a'
    }
});
</script>
