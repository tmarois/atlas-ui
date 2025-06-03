<template>
    <div class="relative inline-block">
        <slot name="trigger" :toggle="toggle">
            <Button label="Columns" size="small" text @click="toggle" />
        </slot>
        <Popover ref="popover" @hide="emit('close')">
            <div class="flex flex-col w-[25rem]">
                <div class="p-4">
                    <div class="text-md font-semibold flex items-center gap-x-1">
                        Customize columns
                        <InfoTooltip text="Customize your columns to display the information that matters most in your table view. You can also export only the selected columns for a more streamlined report." />
                    </div>
                </div>
                <div class="p-4 pt-0 border-b border-gray-200 text-sm font-normal shadow-sm">
                    <InputText
                        v-model="searchColumns"
                        size="small"
                        clearable
                        placeholder="Search columns"
                    />
                </div>
                <div class="h-[300px] overflow-hidden overflow-y-auto">
                    <div class="text-xs py-1 px-2 bg-gray-200 text-gray-700">Visible</div>
                    <draggable
                        v-model="filteredSelectedColumns"
                        item-key="key"
                        group="columns"
                        class="p-2"
                        ghost-class="ghost-card"
                        :animation="200"
                        :move="checkLocked"
                    >
                        <template #item="{ element: column }">
                            <div
                                class="flex items-center w-full hover:bg-gray-100 p-1 cursor-pointer text-sm"
                                :class="{ 'cursor-not-allowed opacity-50': column.locked }"
                                @click="!column.locked && toggleColumn(column.key)"
                            >
                                <div class="grow flex items-center space-x-2">
                                    <div class="flex items-center">
                                        <Checkbox
                                            v-model="activeColumns[column.key]"
                                            binary
                                            size="small"
                                            :disabled="column.locked"
                                        />
                                    </div>
                                    <div>{{ column.label }}</div>
                                </div>
                                <div v-if="column.group" class="text-gray-400 text-xs">{{ column.group }}</div>
                            </div>
                        </template>
                    </draggable>
                    <div class="text-xs py-1 px-2 bg-gray-200 text-gray-700">Not visible</div>
                    <div class="flex flex-col w-full p-2">
                        <template v-for="(group, groupName) in filteredUnselectedColumnGroups" :key="groupName">
                            <div v-if="groupName" class="text-xs py-1 px-2 bg-gray-200 text-gray-700">{{ groupName }}</div>
                            <div
                                v-for="column in group"
                                :key="column.key"
                                class="flex items-center w-full hover:bg-gray-100 p-1 cursor-pointer text-sm"
                                :class="{ 'cursor-not-allowed opacity-50': column.locked }"
                                @click="!column.locked && toggleColumn(column.key)"
                            >
                                <div class="grow flex items-center space-x-2">
                                    <div class="flex items-center">
                                        <Checkbox
                                            v-model="activeColumns[column.key]"
                                            binary
                                            size="small"
                                            :disabled="column.locked"
                                        />
                                    </div>
                                    <div class="hover:underline">{{ column.label }}</div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="flex items-center justify-start p-4 border-t border-gray-200">
                    <div class="grow flex items-center space-x-2">
                        <Button
                            label="Save"
                            size="small"
                            raised
                            :loading="props.loading"
                            :disabled="props.loading"
                            @click="submitColumns"
                        />
                        <Button
                            text
                            type="button"
                            label="Cancel"
                            size="small"
                            :disabled="props.loading"
                            @click="closeWindow"
                        />
                    </div>
                    <div>
                        <Button
                            label="Reset to default"
                            size="small"
                            raised
                            outlined
                            :disabled="props.loading"
                            @click="resetToDefault"
                        />
                    </div>
                </div>
            </div>
        </Popover>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { VueDraggableNext as draggable } from 'vuedraggable';
import Popover from '@atlas/components/Popover.vue';
import Button from '@atlas/components/Button.vue';
import InputText from '@atlas/components/InputText.vue';
import Checkbox from '@atlas/components/Checkbox.vue';
import InfoTooltip from '@atlas/components/TooltipInfo.vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    selected: {
        type: Array,
        required: true,
    },
    defaultColumns: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['update', 'close']);

const popover = ref();
const searchColumns = ref('');
const activeColumns = ref({});
const selectedColumns = ref([]);
const filteredSelectedColumns = ref([]);

const toKeys = (list) => list.map(col => typeof col === 'string' ? col : col.key);

const toggle = (event) => {
    popover.value.toggle(event);
};

const initializeColumns = (columnsList) => {
    activeColumns.value = props.columns.reduce((acc, column) => {
        acc[column.key] = columnsList.includes(column.key);
        return acc;
    }, {});

    selectedColumns.value = columnsList
        .map(key => props.columns.find(column => column.key === key))
        .filter(Boolean);

    updateFilteredSelectedColumns();
};

const updateFilteredSelectedColumns = () => {
    if (searchColumns.value.trim() === '') {
        filteredSelectedColumns.value = [...selectedColumns.value];
    } else {
        filteredSelectedColumns.value = selectedColumns.value.filter(column =>
            column.label.toLowerCase().includes(searchColumns.value.toLowerCase())
        );
    }
};

watch(searchColumns, updateFilteredSelectedColumns);

watch(filteredSelectedColumns, (newOrder) => {
    if (searchColumns.value.trim() === '') {
        selectedColumns.value = [...newOrder];
    }
}, { deep: true });

const filteredUnselectedColumnGroups = computed(() => {
    const columns = props.columns.filter(column => !activeColumns.value[column.key] && column.label.toLowerCase().includes(searchColumns.value.toLowerCase()));
    return columns.reduce((acc, column) => {
        const group = column.group || '';
        (acc[group] ||= []).push(column);
        return acc;
    }, {});
});

const toggleColumn = (key) => {
    const column = props.columns.find(col => col.key === key);
    if (!column || column.locked) return;

    activeColumns.value[key] = !activeColumns.value[key];

    if (activeColumns.value[key]) {
        if (!selectedColumns.value.some(col => col.key === key)) {
            selectedColumns.value.push(column);
        }
    } else {
        selectedColumns.value = selectedColumns.value.filter(col => col.key !== key);
    }

    updateFilteredSelectedColumns();
};

const submitColumns = () => {
    const updatedSelectedColumns = selectedColumns.value.map(column => column.key);
    emit('update', updatedSelectedColumns);
    popover.value.hide();
};

const closeWindow = () => {
    popover.value.hide();
    emit('close');
};

const resetToDefault = () => initializeColumns(toKeys(props.defaultColumns));

const checkLocked = ({ draggedContext, relatedContext }) => {
    return !draggedContext.element?.locked && !relatedContext.element?.locked;
};

onMounted(() => {
    const initialColumns = props.selected.length ? props.selected : toKeys(props.defaultColumns);
    initializeColumns(initialColumns);
});
</script>

<style scoped>
.ghost-card {
    @apply opacity-0;
}
</style>
