<template>
    <div
        class="relative flex justify-center"
        @mouseenter="onTriggerEnter"
        @mouseleave="onTriggerLeave"
    >
        <template v-if="$slots.trigger">
            <slot name="trigger" :toggleMenu="toggleMenu" :triggerRef="setTriggerRef" />
        </template>
        <template v-else>
            <Button
                v-if="!onHover"
                ref="trigger"
                :icon="icon"
                text
                size="small"
                pt:root:class="!p-0 !w-[20px]"
                @click="toggleMenu"
            />
            <Button
                v-else
                ref="trigger"
                text
                pt:root:class="!p-0 !w-[20px]"
                @click="toggleMenu"
            >
                <IconChevronDown
                    class="transition-transform duration-200"
                    :class="isMenuOpen ? 'rotate-180' : ''"
                />
            </Button>
        </template>
        <Menu
            ref="menu"
            :model="items"
            :popup="true"
            @show="onMenuShow"
            @hide="onMenuHide"
            @mouseenter="onMenuEnter"
            @mouseleave="onMenuLeave"
        >
            <template #item="{ item, props }">
                <div
                    v-bind="props.action"
                    @click="actionClick(item)"
                    :class="[
                        'flex items-center px-3 py-2 text-sm',
                        item.disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-800',
                        'text-surface-900 dark:text-surface-0 rounded-md'
                    ]"
                >
                    <span v-if="item.icon" :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import Button from '@atlas/components/Button.vue';
import Menu from '@atlas/components/Menu.vue';
import { IconChevronDown } from '@tabler/icons-vue';

const emit = defineEmits(['action']);

const props = defineProps({
    items: Array,
    icon: { type: String, default: 'pi pi-ellipsis-v' },
    ptData: { type: Object, default: () => ({}) },
    onHover: { type: Boolean, default: false }
});

const trigger = ref(null);
const menu = ref(null);
const isMenuOpen = ref(false);
let closeTimeout = ref(null);

const setTriggerRef = (el) => {
    trigger.value = el;
};

const getTriggerEl = () => trigger.value?.$el || trigger.value?.$refs?.button || trigger.value;

const onTriggerEnter = async () => {
    if (!props.onHover || isMenuOpen.value) return;
    clearTimeout(closeTimeout.value);
    await nextTick();
    const el = getTriggerEl();
    if (el) menu.value.show({ currentTarget: el });
};

const onTriggerLeave = () => {
    if (!props.onHover) return;
    closeTimeout.value = setTimeout(() => {
        if (isMenuOpen.value) menu.value.hide();
    }, 100);
};

const toggleMenu = () => {
    const el = getTriggerEl();
    if (el) menu.value.toggle({ currentTarget: el });
};

const onMenuShow = () => (isMenuOpen.value = true);
const onMenuHide = () => (isMenuOpen.value = false);
const onMenuEnter = () => clearTimeout(closeTimeout.value);
const onMenuLeave = () => {
    if (!props.onHover) return;
    closeTimeout.value = setTimeout(() => {
        if (isMenuOpen.value) menu.value.hide();
    }, 100);
};

const actionClick = (item) => {
    if (item?.disabled) return;
    item?.click ? item.click() : emit('action', item.action, props.ptData);
};
</script>
