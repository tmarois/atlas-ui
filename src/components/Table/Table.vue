<template>
    <DataTable
        lazy
        v-bind="{
            value: items,
            selection: selection,
            dataKey: selection ? dataKey : undefined,
            rowHover: true,
            showGridlines: true,
            size,
            tableStyle,
            ...$attrs
        }"
        @sort="handleSort"
        @update:selection="emit('update:selection', $event)"
    >
        <Column
            v-if="selection"
            selectionMode="multiple"
            headerStyle="width: 3rem"
        />
        <template v-for="column in columns" :key="column.field">
            <Column
                :field="column.field"
                :header="column.header"
                :style="column.style"
                :class="column.class"
                :body-class="column.bodyClass"
                :sortable="column.sortable ?? false"
                :frozen="column.frozen ?? false"
                v-bind="column.props"
            >
                <template v-if="$slots[column.field]" #body="slotProps">
                    <slot :name="column.field" v-bind="slotProps" />
                </template>
                <template #sorticon="{ sorted, sortOrder }">
                    <span
                        class="inline-block transition-transform"
                        :class="{
                            'pi pi-sort': !sorted,
                            'pi pi-sort-up': sortOrder === 1,
                            'pi pi-sort-down': sortOrder === -1
                        }"
                    />
                </template>
            </Column>
        </template>
        <template #empty>
            <slot name="empty">
                <div class="text-center p-4">{{  emptyLabel  }}</div>
            </slot>
        </template>
    </DataTable>
</template>

<script setup>
import { useAttrs } from 'vue';
import DataTable from '@atlas/components/DataTable.vue';
import Column from 'primevue/column';

const emit = defineEmits(['sort', 'update:selection']);

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    size: {
        type: String,
        default: 'small',
    },
    tableStyle: {
        type: String,
        default: 'min-width: 50rem',
    },
    selection: {
        type: Array,
        default: undefined,
    },
    dataKey: {
        type: String,
        default: 'id',
    },
    emptyLabel : {
        type: String,
        default: 'No results'
    }
});

const $attrs = useAttrs();

const handleSort = (event) => {
    emit('sort', {
        field: event.sortField,
        order: event.sortOrder,
    });
};
</script>
