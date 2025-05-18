<template>
    <DataTable
        lazy
        v-bind="{
            value: items,
            rowHover: true,
            size,
            tableStyle,
            ...$attrs
        }"
        @sort="handleSort"
    >
        <template v-for="column in columns" :key="column.field">
            <Column
                :field="column.field"
                :header="column.header"
                :style="column.style"
                :class="column.class"
                :body-class="column.bodyClass"
                :sortable="column.sortable ?? false"
                v-bind="column.props"
            >
                <template v-if="$slots[column.field]" #body="slotProps">
                    <slot :name="column.field" v-bind="slotProps" />
                </template>
            </Column>
        </template>
    </DataTable>
</template>

<script setup>
import { useAttrs } from 'vue';
import DataTable from '@atlas/components/DataTable.vue';
import Column from 'primevue/column';

const emit = defineEmits(['sort']);

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
});

const $attrs = useAttrs();

const handleSort = (event) => {
    emit('sort', {
        field: event.sortField,
        order: event.sortOrder,
    });
};
</script>
