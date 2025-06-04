<template>
    <div class="relative inline-block">
        <slot name="trigger" :toggle="toggle" />
        <Popover ref="popover" pt:content="p-0" @hide="emit('close');initStart()" @show="initStart()">
            <div class="flex flex-col w-[360px]">
                <div class="p-4 py-3">
                    <div class="text-md font-semibold flex items-center gap-x-1 text-gray-900">
                        Customize columns
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
                    <div class="text-xs py-1 px-3 bg-gray-200 text-gray-700">Visible</div>
                    <draggable
                        v-model="filteredSelectedColumns"
                        item-key="key"
                        group="columns"
                        class="p-2 px-3"
                        ghost-class="ghost-card"
                        :animation="200"
                        :move="checkLocked"
                    >
                        <template #item="{ element: column }">
                            <div
                                v-if="!column?.hidden"
                                class="flex items-center w-full hover:bg-gray-100 rounded p-1 cursor-pointer text-sm"
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
                                    <div class="hover:underline">{{ column.header }}</div>
                                </div>
                                <div v-if="column.group" class="text-gray-400 text-xs">{{ column.group }}</div>
                            </div>
                        </template>
                    </draggable>
                    <div class="text-xs py-1 px-3 bg-gray-200 text-gray-700">Not visible</div>
                    <div class="flex flex-col w-full p-2 px-3 space-y-2">
                        <template v-for="(group, groupName) in filteredUnselectedColumnGroups" :key="groupName">
                            <div v-if="groupName" class="text-xs py-1 px-2 bg-gray-200 text-gray-700 rounded">{{ groupName }}</div>
                            <div class="flex flex-col w-full">
                                <div
                                    v-for="column in group"
                                    :key="column.key"
                                    class="flex items-center w-full hover:bg-gray-100 p-1 cursor-pointer text-sm rounded"
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
                                        <div class="hover:underline">{{ column.header }}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="flex items-center justify-start border-t border-gray-200 p-3 shadow">
                    <div class="grow flex items-center space-x-2">
                        <Button
                            label="Save"
                            size="small"
                            raised
                            @click="submitColumns"
                        />
                        <Button
                            text
                            type="button"
                            label="Cancel"
                            size="small"
                            @click="closeWindow"
                        />
                    </div>
                    <div>
                        <Button
                            label="Reset to default"
                            size="small"
                            text
                            :disabled="isDefault"
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
import draggable from 'vuedraggable';
import Popover from '@atlas/components/Popover.vue';
import Button from '@atlas/components/Button.vue';
import InputText from '@atlas/components/InputText.vue';
import Checkbox from '@atlas/components/Checkbox.vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    activeColumnList: {
        type: Array,
        required: true,
    },
    defaultColumnList: {
        type: Array,
        required: true,
    }
});

const emit = defineEmits(['update', 'close']);

const popover = ref(null);
const searchColumns = ref('');
const activeColumns = ref({});
const selectedColumns = ref([]);
const filteredSelectedColumns = ref([]);

const toggle = (event) => {
    popover.value.toggle(event);
};

const filteredUnselectedColumnGroups = computed(() => {
    const columns = props.columns.filter(column => !activeColumns.value[column.key] && column.header.toLowerCase().includes(searchColumns.value.toLowerCase()));
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
    emit('update', selectedColumns.value.map(column => column.key));
    popover.value.hide();
};

const closeWindow = () => {
    popover.value.hide();
};

const checkLocked = ({ draggedContext, relatedContext }) => {
    return !draggedContext.element?.locked && !relatedContext.element?.locked;
};

const updateFilteredSelectedColumns = () => {
    filteredSelectedColumns.value = selectedColumns.value.filter(column =>
        (searchColumns.value && column.header.toLowerCase().includes(searchColumns.value.toLowerCase())) || (!searchColumns.value)
    );
};

const initializeColumns = (columnsList) => {
    activeColumns.value = props.columns.reduce((acc, column) => {
        acc[column.key] = columnsList.includes(column.key);
        return acc;
    }, {});

    selectedColumns.value = columnsList.map(key => props.columns.find(column => column.key === key));

    updateFilteredSelectedColumns();
};

const resetToDefault = () => initializeColumns(props.defaultColumnList);

const initStart = () => initializeColumns(props.activeColumnList.length ? props.activeColumnList : props.defaultColumnList);

const isDefault = computed(() => {
    const visibleDefaultKeys = props.defaultColumnList.filter(key =>
        props.columns.some(col => col.key === key)
    );

    const currentKeys = selectedColumns.value.map(col => col.key);
    if (currentKeys.length !== visibleDefaultKeys.length) return false;
    return currentKeys.every((key, index) => key === visibleDefaultKeys[index]);
});

watch(searchColumns, updateFilteredSelectedColumns);

watch(filteredSelectedColumns, (newOrder) => {
    if (searchColumns.value.trim() === '') {
        selectedColumns.value = [...newOrder];
    }
}, { deep: true });

onMounted(() => {
    initStart();
});
</script>

<style scoped>
.ghost-card {
    opacity: 0;
}
</style>
