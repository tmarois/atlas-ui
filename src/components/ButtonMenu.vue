<template>
    <div class="flex justify-center">
        <Button
            :icon="icon"
            text
            size="small"
            pt:root:class="!p-0 !w-[20px]"
            @click="toggle"
        />
        <Menu
            id="overlay_menu"
            ref="menu"
            size="small"
            :model="items"
            popup
        >
            <template #item="{ item, props }">
                <div
                    class="flex align-items-center"
                    v-bind="props.action"
                    @click="actionClick(item)"
                >
                    <span v-if="item.icon" :class="item.icon" />
                    <span class="ml-4 text-sm">{{ item.label }}</span>
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup>
const emit = defineEmits(['action']);
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    icon: {
        type: String,
        default: 'pi pi-ellipsis-v'
    },
    ptData: {
        type: Object,
        default: () => {}
    }
});

const menu = ref();

const toggle = (event) => {
    menu.value.toggle(event);
};

const actionClick = (item) => {
    if (!item?.disabled) {
        if (item?.click) {
            item.click();
            return;
        }
        emit('action', item.action, props.ptData)
    }
};
</script>
