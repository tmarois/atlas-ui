<template>
    <div class="bg-primary-500 text-white px-6 rounded-full shadow">
        <div class="grow flex items-center">
            <div class="text-sm font-semibold px-3 py-2" :class="{ 'pr-6': menuItems?.length }">
                Selected: <span class="font-bold">{{ formatNumber(selectCount) }}</span>
            </div>
            <div v-if="menuItems?.length" class="flex relative justify-center items-center mx-2 py-3 min-h-full before:block before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:min-h-full before:border-solid before:border-l before:border-surface-400" />
            <div
                v-for="(menuItem, index) in menuItems"
                :key="index"
                v-tooltip.bottom="{
                    value: menuItem?.tooltip ?? null,
                    pt: {
                        root: 'absolute shadow-md p-fadein py-0 px-0 max-w-[260px] mt-1',
                        text: 'text-sm p-2 border border-surface-700 bg-surface-900 text-white dark:bg-surface-700 dark:border-surface-800 rounded whitespace-pre-line'
                    }
                }"
                class="pl-3"
            >
                <div v-if="menuItem.children && menuItem.children.length" class="relative">
                    <div
                        class="flex items-center space-x-0.5 font-semibold hover:cursor-pointer hover:text-white text-sm hover:bg-primary-600/50 hover:rounded-none px-3 py-2"
                        @click.stop="toggle"
                    >
                        <div class="flex items-center space-x-0.5 font-semibold hover:cursor-pointer">
                            <div>{{ menuItem.label }}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M7 9a1 1 0 0 0-.707 1.707l5 5a1 1 0 0 0 1.414 0l5-5A1 1 0 0 0 17 9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <Menu
                        v-if="menuItem?.children && menuItem.children.length"
                        ref="menu"
                        :model="menuItem?.children"
                        size="small"
                        popup
                    >
                        <template #item="{ item, props }">
                            <div
                                class="flex align-items-center"
                                v-bind="props.action"
                                @click="actionClick(item)"
                            >
                                <span v-if="item?.icon" :class="item.icon" />
                                <span
                                    class="text-sm"
                                    :class="{
                                        'text-gray-400': item?.disabled,
                                        'ml-4': item?.icon
                                    }"
                                >{{ item.label }}</span>
                            </div>
                        </template>
                    </Menu>
                </div>
                <div
                    v-else
                    class="flex items-center space-x-0.5 font-semibold hover:cursor-pointer hover:text-white text-sm hover:bg-primary-600/50 hover:rounded-none px-3 py-2"
                    :class="{ 'text-white/50 pointer-events-none': menuItem?.disabled }"
                    @click="() => actionClick(menuItem)"
                >
                    <span class="text-sm">{{ menuItem.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatNumber } from '@atlas/utils';

const emit = defineEmits(['action']);

const { selected, selectCount, menuItems } = defineProps({
    selectCount: {
        type: Number,
        default: null,
    },
    menuItems: {
        type: Array,
        default: () => []
    },
});

const menu = ref();

const actionClick = (item) => {
    if (!item?.disabled) {
        emit('action', item?.action);
    }
};

const toggle = (event) => {
    if (menu.value) {
        menu.value[0].toggle(event);
    }
};
</script>
